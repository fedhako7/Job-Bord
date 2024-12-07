const route = require('express').Router()
const {register, login, checkUser} = require('../../controller/authController/authController')
const authenticateToken = require('../../middleWare/MiddleWare')


route.post('/register', register)
route.post('/login', login)
route.get('/check', authenticateToken, checkUser)


module.exports = route