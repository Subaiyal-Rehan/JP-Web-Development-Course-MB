const express = require("express")
const AuthControllers = require("../Controllers/AuthControllers")

const route = express.Router()

route.post("/login", AuthControllers.Login)
route.post("/signup", AuthControllers.Signup)

module.exports = route