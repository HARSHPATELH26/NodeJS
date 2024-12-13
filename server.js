
const http = require("http");
const url = require ('url');
const fs = require("fs");

const myServer = http.createServer((req,res)=>{
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} New req received \n`
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    fs.appendFile("log.txt",log, (err,data)=>{
        switch(myUrl.pathname){
            // switch(req.url){
            case "/":
                res.end("HomePage");
                break;

            case "/about":
                const username = myUrl.query.fname;
                res.end(`Hi, ${username}`);
                break;

            case "/search":
                const search = myUrl.query.search_query;
                console.log(search);
                res.end(`Here are your results for search ${search}`);
                break;
            default:
                res.end("404 Not found")
        }
    })
})

myServer.listen(4000,()=>console.log("Server Started!"))
