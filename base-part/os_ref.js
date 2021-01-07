const os = require('os');

// Operation system
console.log(os.platform());

// Architecture x32-x64
console.log(os.arch());

// Info CPU
console.log(os.cpus());

// Free memory
console.log(os.freemem());

// Size memory
console.log(os.totalmem());

// Root dir
console.log(os.homedir());

//Up time information
console.log(os.uptime());
