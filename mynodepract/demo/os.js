const os = require('os')

console.log('OS: ', os.platform())
// OS:  linux

console.log('arcitacture of process: ', os.arch())
// arcitacture of process:  x64

console.log('info about process: ', os.cpus())
// info about process:  [
//     {
//         model: 'AMD A6-3400M APU with Radeon(tm) HD Graphics',
//         speed: 1166,
//         times: { user: 2531780, nice: 43320, sys: 602790, idle: 5922810, irq: 0 }
//     },
//     {
//         model: 'AMD A6-3400M APU with Radeon(tm) HD Graphics',
//         speed: 1036,
//         times: { user: 2492370, nice: 40720, sys: 595740, idle: 5950250, irq: 0 }
//     },
//     {
//         model: 'AMD A6-3400M APU with Radeon(tm) HD Graphics',
//         speed: 1044,
//         times: { user: 2512240, nice: 40200, sys: 580610, idle: 5925830, irq: 0 }
//     },
//     {
//         model: 'AMD A6-3400M APU with Radeon(tm) HD Graphics',
//         speed: 1043,
//         times: { user: 2530120, nice: 42130, sys: 588080, idle: 5911820, irq: 0 }
//     }
// ]

console.log('free storage: ', os.freemem())
// free storage:  119271424
console.log('all mem: ', os.totalmem())
// all mem:  3574665216

console.log('home directory: ', os.homedir())
//home directory:  /home/alex

console.log('time of ON the system: ', os.uptime())
// time of ON the system:  9478