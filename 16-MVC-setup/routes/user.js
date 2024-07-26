const express = require('express');
const router = express.Router();
const { handleGetAllUsers, handlegetUserById, handleUpdateUserById, handledeleteUserById, handlecreateNewUser } = require('../controllers/user');



router.route("/")
    .get(handleGetAllUsers)
    .post(handlecreateNewUser)

router
    .route("/:id")
    .get(handlegetUserById)
    .patch(handleUpdateUserById)
    .delete(handledeleteUserById);


module.exports = router