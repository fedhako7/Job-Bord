require('dotenv').config()
const express = require("express")
const db = require('./database/database')

const authRoute = require('./router/authRoute/AuthRoute')
const usersRoute = require('./router/usersRoute/UsersRoute')
const jobsRoute = require('./router/jobsRoute/JobsRoute')
const applicationsRoute = require('./router/applicationsRoute/ApplicationsRoute')

const app = express()
const port = 5500

app.use(express.json())
app.use('/auth', authRoute)
app.use('/users', usersRoute)
app.use('/jobs', jobsRoute)
app.use('/applications', applicationsRoute)

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




