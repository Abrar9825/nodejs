const fs = require('fs')

// Write File
// fs.writeFileSync('./open.txt',"Hey there")
// fs.writeFile('./open.txt', "Hey there", (err) => {})

//Read File
// result = fs.readFileSync("./open.txt", "utf-8")
// console.log(result);

// fs.readFile('./open.txt','utf-8',(err,data)=>{
//     if (err) {
//         console.log("Error occur");
//     }
//     else{
//         console.log(data);
//     }
// })

//append
// result = fs.appendFileSync("./open.txt", `${Date.now()} He there \n`)
// console.log(result);


// copy File
// fs.cpSync("./open.txt","copy.txt")

// delete file
// fs.unlinkSync('./copy.txt')

// get info of file
console.log(fs.statSync("./open.txt")); 




