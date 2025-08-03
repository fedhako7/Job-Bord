const route = require('express').Router()
const {postJob, getAllJobs, myPosts, applyJob, singleJob, jobSearch, searchMyPost, topMyPost, getRecentJobs} = require('../../controller/jobController/JobController')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  }
});

const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only PDF and DOC files are allowed'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 } 
});


route.post('/', postJob)
route.get('/', getAllJobs)
route.get('/recent', getRecentJobs)
route.get('/myposts', myPosts)
route.get('/myposts/top', topMyPost)
route.get('/myposts/search', searchMyPost)
route.get('/single', singleJob)
route.get('/search', jobSearch)
route.post('/apply', upload.single('resume'), applyJob)

module.exports = route