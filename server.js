const express = require('express')
const app = express()
const PORT = 3000

app.get('/',(req,res)=>{
// res.send("Hello World")
res.send({
    id:1,
    name:"Dhoni"
})
})
app.get('/messages',(req,res)=>{
res.send('<!DOCTYPE html><h1>Hello World</h2></html>')
})
app.post('/messages',(req,res)=>{
console.log("Updating message")
})
    
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})