const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());
const dotenv = require('dotenv');
dotenv.config(path = "./env");
const connectDB = require('./server/database/database.connection');


const PORT = process.env.PORT || 5000 ;

connectDB();

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})

app.use('/auth', require('./server/routes/authRoute'))