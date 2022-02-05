const { exec } = require('child_process')
const { inspect } = require('util')
const cmd = 'ps -eo pid,ppid,uid,pcpu,pmem,cmd --no-headers'
const getProcessTree = () => new Promise((resolve, reject) => { 
  exec(cmd, function(err, stdout, stderr) {
    if (err) {
      reject('Failed: '+err)
    } else {
      var processes = {}
      stdout.split('\n').forEach(function(line) {
        if (line.length < 6) return
        line = (' '+line).split(/\s+/g)
        line.shift()
        processes[parseInt(line[0])] =
            {
              id:            parseInt(line[0]),
              parent:        parseInt(line[1]),
              user:          line[2],
              cpu_percent:   parseFloat(line[3]),
              children_cpu:  undefined,
              mem_percent:   parseFloat(line[4]),
              children_mem:  undefined,
              command:       line.slice(5).join(' '),
              children:      [],
              [inspect.custom](depth, options) {
                const self = {}
                self.command = this.command
                if (this.children.length) self.children = this.children
                return inspect(self, false, depth - 1)
              }
            }
      })

      // Point the parent at the parent,  and add self as a child
      Object.values(processes).forEach(function(process) {
        if (processes[process.parent]) {
          process.parent = processes[process.parent]
          process.parent.children.push(process)
        }
      })

      // Now each process needs to get the sum percentages of its children
      function sum_children(process) {
        if (process.children_cpu == undefined) {
          let sum_cpu = 0, sum_mem = 0
          process.children.forEach(function(child) {
            sum_children(child)
            sum_cpu += child.children_cpu + child.cpu_percent
            sum_mem += child.children_mem + child.mem_percent
          })
          process.children_cpu = sum_cpu
          process.children_mem = sum_mem
        }
      }
      Object.values(processes).forEach(sum_children)

      resolve(Object.values(processes))
    }
  })
})

module.exports = {
  getProcessTree,
  cmd
}