const route = require('express').Router()
const {myApplications, myApplicants} = require('../../controller/applicationController/ApplicationController')


route.get('/my', myApplications)
route.get('/myapplicants', myApplicants)


module.exports = route