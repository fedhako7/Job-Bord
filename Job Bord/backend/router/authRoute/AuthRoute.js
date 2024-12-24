const route = require('express').Router()
const { verify } = require('jsonwebtoken')
const {register, login, checkUser, changePassword, verifyEmail} = require('../../controller/authController/authController')
const authenticateToken = require('../../middleWare/MiddleWare')


route.post('/register', register)
route.get('/verify', verifyEmail)
route.post('/login', login)
route.get('/check', authenticateToken, checkUser)
route.put('/change', authenticateToken, changePassword)


module.exports = route