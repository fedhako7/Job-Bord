const mysql2 = require('mysql2')

// const db = mysql2.createPool({
//     database: process.env.DATABASE_PRODUCTION,
//     user: process.env.USER_PRODUCTION,
//     password: process.env.PASSWORD_PRODUCTION,
//     host: process.env.HOST_PRODUCTION,
//     connectionLimit: 10,

// })

const db = mysql2.createPool({
    database: process.env.DATABASE_LOCAL,
    user: process.env.USER_LOCAL,
    password: process.env.PASSWORD_LOCAL,
    host: process.env.HOST_LOCAL,
    connectionLimit: 10,

})

module.exports = db.promise()
