const express = require("express");
const verifyToken = require("../controller/verifyToken.js"); 
const verifyRoute = express.Router();

verifyRoute.post("/verify-token", verifyToken); 

module.exports = verifyRoute;
