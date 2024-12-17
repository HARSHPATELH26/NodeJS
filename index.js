const express = require('express');
const {connectMongoDb} = require('./connection')

const {logReqRes} = require('./middleware')
const userRouter = require('./routes/user');

const app = express()
const port = 3010;
//connection
connectMongoDb('mongodb://127.0.0.1:27017/userdata');


//middleware : plugin
app.use(express.urlencoded({extended: false}));
app.use(logReqRes('log.txt'));

//routes
app.use('/api/users', userRouter)

app.listen(port, () => console.log(`User data app listening on port ${port}!`))
