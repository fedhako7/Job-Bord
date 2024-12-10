const route = require('express').Router()
const {postJob, getAllJobs, myPosts, applyJob, singleJob, jobSearch} = require('../../controller/jobController/JobController')


route.post('/', postJob)
route.get('/', getAllJobs)
route.get('/myposts', myPosts)
route.get('/single', singleJob)
route.get('/search', jobSearch)
route.post('/apply', applyJob)

module.exports = route