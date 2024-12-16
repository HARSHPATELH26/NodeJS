//-------------------------------------------------
//second -2 
// const http = require("http");
// const express = require('express');

// // const fs= require("fs");
// const app = express();
// const PORT = 8001;

// app.get('/',(req,res)=>{
//     return res.send("Home Page");
// });

// app.get('/about',(req,res)=>{
//     return res.send("About Page" + " Hey " + req.query.name + ' You are at ' + req.query.age + ' years old');
// })   

// app.listen(PORT,()=>{
//          console.log(`Server is connected on PORT no : ${PORT}`)})
//-------------------------------------------------

//first - 1
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
    
//-------------------------------------------------
//third - 3
const express = require('express');
const users = require('./MOCK_DATA.json')
const app = express();
const PORT = 8001;

//route with HTML result
app.get('/users',(req,res)=>{
    const html = `
        <ul>    
            ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}    
        </ul>
    `;
    res.send(html);
})
//routes 
//REST API
app.get('/api/users',(req,res)=>{
    return res.json(users);
})

app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id === id);
    return res.json(user);
})



app.listen(PORT,()=>{
    console.log(`Server is connected on PORT no : ${PORT}`)})