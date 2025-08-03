const route = require('express').Router()
const {register, login, checkUser, changePassword, CheckPassSet} = require('../../controller/authController/authController')
const { googleAuthController, setRoleController, } = require('../../controller/googleAuthController/googleAuthController')
const authenticateToken = require('../../middleWare/MiddleWare')


route.post('/register', register)
route.post('/login', login)
route.post('/google', googleAuthController)
route.post('/set-role', setRoleController)
route.get('/check', authenticateToken, checkUser)
route.post('/change', authenticateToken, changePassword)
route.get('/check-pass-set', CheckPassSet)


module.exports = route