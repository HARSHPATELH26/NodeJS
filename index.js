const http = require("http");
const PORT = 8001;
const fs= require("fs");
const myServer = http.createServer((req,res)=>{
    if(req.url=== '/favicon.ico')return res.end();
    const log = `${Date.now()} ${req.method} ${req.url}: new req recieved \n`;
    fs.appendFile("log.txt",log,(err,data)=>{
        res.end("Hello from Server")
    })
    
},)

myServer.listen(PORT,()=>{
    console.log(`Server is connected on PORT no : ${PORT}`)});
    
