const route = require('express').Router()
const {postJob, getAllJobs, myPosts, applyJob, singleJob, jobSearch} = require('../../controller/jobController/JobController')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() +'--' + file.originalname);
  },
});

const upload = multer({storage: storage})

route.post('/', postJob)
route.get('/', getAllJobs)
route.get('/myposts', myPosts)
route.get('/single', singleJob)
route.get('/search', jobSearch)
route.post('/apply', upload.single('resume'), applyJob)

module.exports = route