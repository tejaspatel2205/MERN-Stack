const express = require('express')

const app = express()
const port = 3000

app.get('/', (req,res) => {
    res.send("Hello Tejas")
})

app.get('/homesite', (req,res) => {
    res.sendFile(__dirname+'/homesite.html')
})

app.listen(port, ()=> {
    console.log(`App3 Running on Port ${port}`)
})