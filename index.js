const express = require('express')
const app = express()
const port = 3010
const fs = require('fs');
const mongoose = require('mongoose');
// const users = require('./MOCK_DATA.json');

//connection
mongoose.connect('mongodb://127.0.0.1:27017/userdata')
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log('Mongo Err',err))

//schema
const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
       
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    gender : {
        type : String,
        required : true,
    },
    jobtitle : {
        type : String,
        required : true,
    },
},
{timestamps:true}
)

//model
const User = mongoose.model("users", userSchema);
//middleware : plugin
app.use(express.urlencoded({extended: false}));

// API
app.get('/users', async(req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstname} - ${user.email}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});


//REST API
app.get('/api/users', async(req, res) => {
    const allDbUsers = await User.find({});
    res.json(allDbUsers)
} );

// user specific
app.get('/api/users/:id', async(req, res) => {
   
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error : "user not found"});
    return res.json(user);
});


//POST - database require
app.post('/api/users', async(req,res)=>{
    //todo - Create new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg : 'All fileds are required'})
    }
    const result = await User.create({
        firstname:body.first_name,
        lastname:body.last_name,
        email:body.email,
        gender:body.gender,
        jobtitle:body.job_title,
    });
    console.log("result", result);
    
    return res.status(201).json({msg : 'success'})
   
})


app.patch('/api/users/:id', async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastname:"Kumar" })
    return res.json({status : "success"});

});


// DELETE - Remove a user by ID
app.delete('/api/users/:id', async(req, res) => {
   
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "success", message: "User deleted successfully" });
 
});

app.listen(port, () => console.log(`User data app listening on port ${port}!`))
