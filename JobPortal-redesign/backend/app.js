const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser') 
require("dotenv").config()
var cors = require('cors')


//port 
const port = process.env.PORT || 9000

// connectDB
mongoose.connect('mongodb://127.0.0.1:27017/jobportal-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})