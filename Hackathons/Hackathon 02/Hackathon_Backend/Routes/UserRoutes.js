const express = require("express")
const UserController = require("../Controllers/UserController")
const route = express.Router()

route.get('/', UserController.Get)

route.get('/:id', UserController.SpecificGet)

route.post('/', UserController.Post)

route.put('/:id', UserController.Put)

route.delete('/:id', UserController.Delete)

module.exports = route