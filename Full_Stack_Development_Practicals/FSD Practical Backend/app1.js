const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res)=> {
    res.send("Hello Tejas")
})

app.get('/home', (req, res) => {
    res.sendFile(__dirname+'/home.html')
})

app.get('/contact', (req,res) => {
    res.sendFile(__dirname+'/contact.html')
})

app.get('/about', (req,res) => {
    res.sendFile(__dirname+'/about.html')
})

app.listen(port, ()=> {
    console.log("App1 Running on Port 3000")
})