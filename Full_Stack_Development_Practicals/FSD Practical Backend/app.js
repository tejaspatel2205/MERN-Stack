const express = require('express')

const app = express()
const port = 3000

app.use('/', (req, res)=>{
    res.send('Hello This is Tejas Patel')
})

app.listen(port, () => {
    console.log(`App Running on Port ${port}`)
})