const route = require('express').Router()
const {myApplications} = require('../../controller/applicationController/ApplicationController')


route.get('/my', myApplications)


module.exports = route