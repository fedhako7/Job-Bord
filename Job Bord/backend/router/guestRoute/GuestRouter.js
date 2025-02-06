const route = require('express').Router()
const {search, featured} = require('../../controller/guestController/GuestController')


route.get('/search', search)
route.get('/featured', featured)


module.exports = route