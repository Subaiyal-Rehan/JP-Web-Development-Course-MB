const express = require("express")
const FoodControllers = require("../Controllers/FoodController")
const route = express.Router()

route.get('/', FoodControllers.Get)

route.get('/:id', FoodControllers.SpecificGet)

route.post('/', FoodControllers.Post)

route.put('/:id', FoodControllers.Put)

route.delete('/:id', FoodControllers.Delete)

module.exports = route