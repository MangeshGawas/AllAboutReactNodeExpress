const express = require('express')
const mongoose = requ6ire('mongoose')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

//db connection
mongoose.connect('',{
    useNewUrlParser: true,
   useUnifiedTopology: true,
})

const todoSchema = new mongoose.Schema({
    title:String,
    completed:Boolean
})

const Todo = mongoose.model('Todo',todoSchema)


