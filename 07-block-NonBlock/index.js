const fs = require('fs')
const os = require('os')

console.log(os.cpus().length);

// blocking
// console.log("1");
// res = fs.readFileSync("1.txt", 'utf-8')
// console.log(res);
// console.log("2");

// non-blocking
// console.log("1");
// fs.readFile("1.txt", "utf-8", (err, res) => {
//     console.log(res);
// })
// console.log("2");

// default Thread pool Size = 4
// Max? - 8core cpu - 8 