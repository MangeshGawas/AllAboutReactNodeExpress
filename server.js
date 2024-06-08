const express = require('express')
const app = express()
const PORT = 3000


const friends = [{
    id:0,
    name:"Dhoni"
},
{
    id:1,
    name:"Virat"
},
{
    id:2,
    name:"Rohit"
},
{
    id:3,
    name:"Bumrah"
}
]

app.get('/',(req,res)=>{
// res.send("Hello World")
res.send("First Page")
})

app.get('/friends',(req,res)=>{
// res.send("Hello World")
res.json(friends)
})

app.get('/friends/:friendId',(req,res)=>{
    const friendId = Number(req.params.friendId)
    const friend = friends[friendId]
    if(friend){
        res.json(friend)
    }
    else{
        res.status(404).json({
            error:"Friend doesnot exit"
        })
    }
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