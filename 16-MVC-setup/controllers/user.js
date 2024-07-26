const User = require('../models/user')
async function handleGetAllUsers(req, res) {
    const allDbUser = await User.find({})
    return res.json(allDbUser);
}
async function handlegetUserById(req, res) {
    const user = await findById(req.params.id)
    if (!user) {
        return res.status(404).json({ Error: "User not found" });
    }
    else {
        return res.json(user)
    }
}
async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" })
    return res.json({ status: "Success" });
}
async function handledeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Success" });
}

async function handlecreateNewUser(req, res) {
    const body = req.body
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "aLl filed are required" })
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })
    return res.status(200).json({ msg: "Success", id: result._id })
}

module.exports = {
    handleGetAllUsers,
    handlegetUserById,
    handleUpdateUserById,
    handledeleteUserById,
    handlecreateNewUser
}