const route = require('express').Router()
const {myApplications, myApplicants, changeStatus} = require('../../controller/applicationController/ApplicationController')


route.get('/my', myApplications)
route.get('/myapplicants', myApplicants)
route.put('/status', changeStatus)


module.exports = route