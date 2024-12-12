const fs = require("fs");
console.log("1");
console.log("3");
const read1 = fs.readFile('./add.txt',"utf-8",(err,res)=>{
    if(err){
        console.log(err)
    }else{
        console.log(res);
        
    }
});

console.log("2");


// fs.writeFileSync('./text.txt',"Hello fs sync");

// fs.writeFile('./text.txt',"Hello Async", (err)=>{});

// const result = fs.readFileSync("./contact.txt","utf-8");

// const result1 = fs.readFile('./contact.txt',"utf-8",(err,result)=>{
//     if (err){
//         console.log("Error",  err);
//     }else{
//             console.log(result);
            
//         }
        
//     }
// )
// console.log(result1);

// fs.appendFileSync('./text.txt','hey there\n');
