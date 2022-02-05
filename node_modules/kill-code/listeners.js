const { exec } = require('child_process')
const { inspect } = require('util')
const cmd = 'lsof -iTCP -sTCP:LISTEN -P -n'
const getListeners = () => new Promise((resolve, reject) => { 
  exec(cmd, function(err, stdout, stderr) {
    if (err) {
      reject('Failed: '+err)
    } else {
      const processes = {}

      const lines = stdout.split('\n').filter(x => x.includes('(LISTEN)')).map(line => (' '+line).split(/\s+/g))
      for (let line of lines) {
        const pid = line[2]
        const process = line[1]
        const protocol = line[line.length - 3]
        const address = line[line.length - 2]
        processes[pid] = {pid, process, protocol, address}
      }

      resolve(processes)
    }
  })
})


module.exports = {getListeners}