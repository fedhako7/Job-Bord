const route = require('express').Router()
const {myApplications, myApplicants, changeStatus, isApplied} = require('../../controller/applicationController/ApplicationController')


route.get('/my', myApplications)
route.get('/myapplicants', myApplicants)
route.get('/isapplied', isApplied)
route.put('/status', changeStatus)


module.exports = route