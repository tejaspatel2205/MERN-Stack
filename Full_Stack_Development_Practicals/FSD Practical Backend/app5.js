const express = require('express')

const app = express()
const port = 3000

app.set('views',__dirname+'/views')
app.set('view engine','ejs')

app.get('/', (req,res)=> {
    res.send("Hi Tejas")
})

app.get('/homedashboard', (req,res)=> {
    res.render('homedashboard', {name: "Tejas"})
})

app.listen(port, ()=> {
    console.log(`App5 Running on Port ${port}`)
})