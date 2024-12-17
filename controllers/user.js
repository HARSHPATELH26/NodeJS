const User = require('../models/user');

handleGetAllUsers = async (req, res) => {
    const allDbUsers = await User.find({});
    res.json(allDbUsers)
}
handleGetUserByID = async(req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
}
handleUpdateUserByID = async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastname:"Kumar" })
    return res.json({status : "success"});
}
handleDeleteUserByID = async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "success", message: "User deleted successfully" });
}
handleCreateNewUSer =async(req,res)=>{
    //todo - Create new user
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: 'All fileds are required' })
    }
    const result = await User.create({
        firstname: body.first_name,
        lastname: body.last_name,
        email: body.email,
        gender: body.gender,
        jobtitle: body.job_title,
    });
    console.log("result", result);

    return res.status(201).json({ msg: 'success', id : result._id })

}

module.exports = {
    handleGetAllUsers,
    handleGetUserByID,
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateNewUSer,
}