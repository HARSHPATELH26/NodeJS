const http = require("http");
const express = require('express');

// const fs= require("fs");
const app = express();
const PORT = 8001;

app.get('/',(req,res)=>{
    return res.send("Home Page");
});

app.get('/about',(req,res)=>{
    return res.send("About Page" + " Hey " + req.query.name + ' You are at ' + req.query.age + ' years old');
})   

app.listen(PORT,()=>{
         console.log(`Server is connected on PORT no : ${PORT}`)})

// const myServer = http.createServer(app);
// const myServer = http.createServer((req,res)=>{
//     if(req.url=== '/favicon.ico')return res.end();
//     const log = `${Date.now()} ${req.method} ${req.url}: new req recieved \n`;
//     fs.appendFile("log.txt",log,(err,data)=>{
//         res.end("Hello from Server")
//     })
    
// },)

// myServer.listen(PORT,()=>{
//     console.log(`Server is connected on PORT no : ${PORT}`)});
    
