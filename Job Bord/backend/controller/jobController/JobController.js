


const postJob = async (req, res) => {
    res.send('post job')
    
}

const getJobs = async (req, res) => {
    res.send('get jobs')
    
}

const myPosts = async (req, res) => {
    res.send('my posts')
    
}

const applyJob = async (req, res) => {
    res.send('apply job')
    
}


module.exports = {postJob, getJobs, myPosts, applyJob}