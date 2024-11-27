require('dotenv').config()
const express = require("express")
const db = require('./database/database')
const app = express()
const port = 5500


app.get('/', (req, res) => {
    res.send("Test")
});

async function start() {

    try {
        const result = await db.execute('select "Test"')
        app.listen(port)
        console.log("Database connected successfully")
        console.log(`Server is running on port http://localhost:${port}`);
        
    } catch (error) {
        console.log(error)
        
    }
}

start()




