const express = require('express')
const fs = require('fs')

const app = express()
const port = 3000

app.get('/', (req,res)=> {
    res.send("Hello Tejas")
})

app.get('/logs', (req, res) => {
    fs.readFile("errors.txt", "utf-8", function(err, data){
        if (err) {
            return res.status(500).send(`
                <h1>Error Log Viewer</h1>
                <p style="color:red;">Error: Could not read file.</p>
                <p>Reason: ${err.message}</p>
            `);
        }

        res.send(`
            <h1>Error Log Viewer</h1>
            <pre style="background:#ofo; color:#222; padding:15px; border-radius:8px;">${data}
            </pre>
        `);
    })
})

app.listen(port, ()=> {
    console.log(`App4 Running on Port ${port}`)
})