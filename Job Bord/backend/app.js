require('dotenv').config()
const cors = require('cors')
const express = require("express")
const db = require('./database/database')

const authRoute = require('./router/authRoute/AuthRoute')
const usersRoute = require('./router/usersRoute/UsersRoute')
const jobsRoute = require('./router/jobsRoute/JobsRoute')
const applicationsRoute = require('./router/applicationsRoute/ApplicationsRoute')
const authenticateToken = require('./middleWare/MiddleWare')

const app = express()
const port = 5500

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'));

app.use('/auth',  authRoute)
app.use('/users', authenticateToken,  usersRoute)
app.use('/jobs',  authenticateToken, jobsRoute)
app.use('/applications',  authenticateToken, applicationsRoute)

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




