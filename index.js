const express = require('express');
const users = require('./MOCK_DATA.json')
const fs = require('fs');
const { Server } = require('http');
const app = express();
const PORT = 8001;

//middllware
app.use(express.urlencoded({extended:false}));


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


app.post('/api/users',(req,res)=>{
    const body = req.body;
    console.log("Body : " , body);
    users.push({...body,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json("Status Success");
    })
    
    // return res.json("Status pending/Success")
})

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




app.listen(PORT,()=>{
    console.log(`Server is connected on PORT no : ${PORT}`)})


