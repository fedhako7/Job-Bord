const route = require('express').Router()
const {search, featured, handleMessage} = require('../../controller/guestController/GuestController')


route.get('/search', search)
route.get('/featured', featured)
route.post('/message', handleMessage)


module.exports = route