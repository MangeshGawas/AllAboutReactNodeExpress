const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
var cors = require('cors')
const bodyParser = require('body-parser') 
require("dotenv").config()
const cookieParser = require('cookie-parser')
const errorHandler = require("./middleware/error");


// import routes
const authRoutes = require('./routes/authRoutes');

// error middleware
app.use(errorHandler);

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


  //Middleware
  app.use(morgan('dev'))
  app.use(bodyParser.json({limit:"5mb"}))
  app.use(bodyParser.urlencoded({
    limit:"5mb",
    extended:true
  }))
  app.use(cookieParser())
  app.use(cors())


//ROUTES MIDDLEWARE
// app.get('/', (req, res) => {
//     res.send("Hello from Node Js");
// })
app.use('/api', authRoutes);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})