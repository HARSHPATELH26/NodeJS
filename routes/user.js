const express = require('express')

const { 
    handleGetAllUsers,
    handleGetUserByID,
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateNewUSer} = require('../controllers/user');

const router = express.Router();

//REST API
router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUSer);

// user specific
router.route("/:id")
    .get(handleGetUserByID)
    .patch(handleUpdateUserByID)
    .delete (handleDeleteUserByID);

module.exports = router;


