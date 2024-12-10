const express = require("express")
require("dotenv").config()
const App = express()
const UserRoutes = require("./Routes/UserRoutes")
const AuthRoutes = require("./Routes/AuthRoutes")
const FoodRoutes = require("./Routes/FoodRoutes")
const mongoose = require("mongoose");
const cors = require("cors")

App.use(cors())
App.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(() => {
    App.listen(process.env.PORT, () => {
        console.log(`Database is connected successfully and server is running on: http://localhost:${process.env.PORT}`)
    })
}).catch((err) => {
    console.log("Error while running the server", err)
})

App.get("/", (req, res) => {
    res.send("Welcome to the Final Hackathon Backend of Module B.")
})

App.use("/users", UserRoutes)
App.use("/users", AuthRoutes)
App.use("/foods", FoodRoutes)