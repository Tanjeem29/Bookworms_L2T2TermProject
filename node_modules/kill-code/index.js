const yargs = require('yargs')
const termkit = require('terminal-kit')
const killWithStyle = require('kill-with-style')
const term = termkit.terminal

const { getProcessTree, cmd } = require('./process-tree')
const { getListeners } = require('./listeners')
const { inspect } = require('util')

const PATH = process.env.PATH.split(':').flatMap(p => [
  new RegExp(`^()${p}/`, 'g'),
  new RegExp(`( )${p}/`, 'g'),
  
])
function simplify(command) {
  for (let regexp of PATH) {
    command = command.replace(regexp, (_, x) => x)
  }
  return command
}
function summarize(command) {
  return Array.from(new Set(command.split(' '))).join(' ')
}

function walk(fork, proc) {
  if (proc.id == process.pid) fork.self = true
  fork.commands.push(...proc.children.map(x => x.command).filter(cmd => !cmd.includes('.vscode-server')).map(simplify).filter(x => x != 'bash'))
  for (let child of proc.children) {
    walk(fork, child)
  }
  return fork
}

async function main () {
  const argv = yargs
    .option('view-all', {
      alias: 'v',
      type: 'boolean',
      description: 'View all forks, even empty ones.'
    })
    .option('no-tty', {
      alias: 'T',
      type: 'boolean',
      description: 'Disable TTY.'
    })
    .option('kill', {
      alias: 'k',
      type: 'number',
      description: 'Fork IDs to kill.',
      array: true
    })
    .option('all', {
      alias: 'a',
      type: 'boolean',
      description: 'Select all forks (use -v -a to include all empty forks).'
    })
    .option('debug', {
      alias: 'd',
      type: 'boolean',
      description: 'Output debug info regarding killing process tree.'
    })
    .argv

  const [tree, listeners] = await Promise.all([getProcessTree(), getListeners()])

  // Find my own process ancestry
  const self = tree.find(x => x.id === process.pid)
  let p = self
  const ownPids = new Set()
  while (p) {
    ownPids.add(p.id)
    p = p.parent
  }

  const forkRegex = /\.vscode-server\/bin\/.*\/node .*bootstrap-fork/
  const forks = tree.filter(x => forkRegex.test(x.command)).map(fork => {
    fork.commands = []
    walk(fork, fork)
    fork.summary = `${fork.id}: (${fork.user}) ${fork.commands.join('; ')}`
    fork.commandSummary = fork.commands.join('; ')
    fork.listener = listeners[fork.id]
    fork.toString = () => `${fork.listener ? `${fork.listener.protocol} ${fork.listener.address}` : ''} ${fork.summary}`
    return fork
  })
  .filter(fork => argv.kill || argv.all || (fork.commands.length && !fork.self))
  .sort((a, b) => a.self ? 1 : b.self ? -1 : a.id - b.id)


  const walkNode = process => {
    if (!process) return []
    if (process.command.includes('node')) return [process, ...walkNode(process.parent)]
    return walkNode(process.parent)
  }
  const nodes = Object.values(listeners).filter(x => x.process.includes('node')).map(node => {
    node.process = tree.find(x => x.id == node.pid)
    node.nodes = walkNode(node.process).filter(x => !ownPids.has(x.id))
    node.toString = () => `${node.protocol} ${node.address} ${node.process.command}`
    return node
  })

  if (!argv['no-tty'] && !argv.kill) {
    const options = [...nodes, ...forks]
    if (options.length) {
      term.cyan.bold('Select a process to terminate:\n')
      const response = await term.singleColumnMenu(options, {exitOnUnexpectedKey: true}).promise
      if (response.submitted) {
        const option = options[response.selectedIndex]
        if (response.selectedText.includes(cmd)) {
          term.red.bold('Uh, it looks like that is this fork. Are you sure you want to kill me? ([Y]es / [N]o)\n')
        } else {
          if (option.commands) {
            term.yellow.bold('This will kill all these processes:\n')
            console.log(option.commands.map(c => c.padStart(4)).join('\n'))
            term.yellow.bold('Are you sure you want to proceed? ([Y]es / [N]o)\n')
          } else {
            term.yellow.bold('This will kill all these processes:\n')
            console.log(option.nodes.map(c => c.command.padStart(4)).join('\n'))
            term.yellow.bold('Are you sure you want to proceed? ([Y]es / [N]o)\n')
          }
        }
        const confirmed = await term.yesOrNo().promise
        term('\n')
        if (confirmed) {
          if (option.commands) await killFork(option, {debug: argv.debug})
          else await killNode(option, {debug: argv.debug})
          term('Done\n')
        }
      }
    } else {
      console.info('Nothing to do.')
    }
  } else {
    if (argv.kill) {
      if (argv.kill.length && argv.all) {
        console.error('Do not specify PIDs and --all at the same time.')
        process.exit(1)
      }
      const pidsToKill = argv.all
      ? new Set(forks.map(x => x.id))
      : new Set(argv.kill)

      if (!pidsToKill.size) console.info('Nothing to do')
      for (let fork of forks) {
        if (pidsToKill.has(fork.id)) {
          await killFork(fork, { debug: argv.debug })
        }
      }
    } else {
      for (let fork of forks) {
        console.log(fork.summary)
      }
      console.log()
      console.log('To kill a fork, run kill-code --kill <id>.')
    }
  }
  process.exit(0)
  
}

async function killFork(fork, opts) {
  await new Promise((resolve, reject) => {
    killWithStyle(fork.id, {
      signal: ['SIGINT', 'SIGKILL'],
      retryCount: 2,
      retryInterval: 10000,
      timeout: 21000,
      ...opts
    }, (err, val) => err ? reject(err) : resolve(val))
  })
}

async function killNode(node, opts) {
  await killFork(node.nodes[node.nodes.length - 1])
}

module.exports = { main }