const mongoose = require('mongoose');

//userSchema
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


module.exports= User;