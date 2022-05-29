const asyncHandler = require('express-async-handler');




// @description register a new user
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res, next) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please Include all fields")
    }
    res.send("register route")
})


// @description login a new user
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async(req, res, next) => {
    res.send("login route")
})

module.exports = {
    registerUser,
    loginUser,
}