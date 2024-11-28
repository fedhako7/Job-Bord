const route = require('express').Router()
const {postJob, getJobs, myPosts, applyJob} = require('../../controller/jobController/JobController')


route.post('/', postJob)
route.get('/', getJobs)
route.get('/myposts', myPosts)
route.post('/apply', applyJob)

module.exports = route