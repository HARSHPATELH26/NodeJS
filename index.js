const express = require('express')
const app = express()
const port = 3010
const fs = require('fs');
const users = require('./MOCK_DATA.json');

//middleware : plugin
app.use(express.urlencoded({extended: false}));

// API
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});


//REST API
app.get('/api/users', (req, res) => res.json(users));

// user specific
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    if(!user) return res.status(404).json({error : "user not found"});
    return res.json(user);
});


//POST - database require
app.post('/api/users', (req,res)=>{
    //todo - Create new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg : 'All fileds are required'})
    }
    users.push({...body, id : users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err,data)=>{
    return res.status(201).json({status : "success", id:users.length});
    })
    // console.log("Body", body);
    
    // return res.json({status : "pending"});
})

//PATCH - database require
// app.patch('/api/users/:id', (req,res)=>{
//     //todo - edit the  user with id
//     return res.json({status : "pending"});
// })
// PATCH - Update user details
app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Update user details with the request body
    users[userIndex] = { ...users[userIndex], ...req.body };

    // Save updated users array back to MOCK_DATA.json
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Failed to update user" });
        }
        return res.json({ status: "success", user: users[userIndex] });
    });
});

//DELETE - database require
// app.delete('/api/users/:id', (req,res)=>{
//     //todo - delete the  user with id
//     return res.json({status : "pending"});
// })
// DELETE - Remove a user by ID
app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Remove the user from the array
    users.splice(userIndex, 1);

    // Save updated users array back to MOCK_DATA.json
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Failed to delete user" });
        }
        return res.json({ status: "success", message: "User deleted successfully" });
    });
});



app.listen(port, () => console.log(`User data app listening on port ${port}!`))




// app
// .route("api/users/:id")
// .get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user)=> user.id === id);
//     return res.json(user);
// })
// .patch((req,res)=>{
//     return res.json({status : "pending"})
// })
// .delete((req,res)=>{
//     return res.json({status : "pending"})
// })