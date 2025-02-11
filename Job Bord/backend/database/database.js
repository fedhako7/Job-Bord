const mysql2 = require('mysql2')

const db = mysql2.createPool({
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    connectionLimit: 10,

})

module.exports = db.promise()
