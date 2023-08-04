const express = require("express");
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config((path = "./env"));
const connectDB = require("./server/database/database.connection");
const authRoute = require("./server/routes/authRoute");
const verifyRoute = require("./server/routes/verifyRoute");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});

app.use("/auth");

app.use("/verify", verifyRoute);
