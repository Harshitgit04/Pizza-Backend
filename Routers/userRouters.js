const express = require("express")
const createNewUser = require("../controllers/userControllers")

const userRoutes = express.Router()

userRoutes.post("/newuser",createNewUser)

module.exports = userRoutes

//localhost:5002 