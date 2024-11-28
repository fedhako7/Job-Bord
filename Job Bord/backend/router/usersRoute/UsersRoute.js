const route = require('express').Router()
const {profile, profileUpdate} = require('../../controller/usersController/UsersController')


//profile APIs
route.get('/profile', profile)
route.post('/profile/update', profileUpdate)


module.exports = route