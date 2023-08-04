const express = require("express");
const { signup } = require("../controller/auth.controller");
const authRoute = express.Router()



authRoute.post('/signup', signup);






module.exports = authRoute;