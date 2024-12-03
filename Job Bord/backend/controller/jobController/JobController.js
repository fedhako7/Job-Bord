const statCodes = require("http-status-codes")
const db = require("../../database/database")


const postJob = async (req, res) => {
    const {title, description, location, salary, employer_id: employee_id} = req.body
    if (!title || !description || !employee_id){
        return res.status(statCodes.BAD_REQUEST).json({msg: "Incompelete info, fill all requered info."})
    }

    try {
        await db.query(
            `INSERT INTO jobs (title, description, location, salary, employer_id) VALUES (?,?,?,?,?)`,
            [title, description, location, salary, employee_id]
        )
        res.status(statCodes.CREATED).json({msg: "New job created successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong while posting job, please ty later."})
        
    }

    
}


const getAllJobs = async (req, res) => {
    
    try {
        const [jobsData] = await db.query(
            `SELECT jobs.*, users.fname, users.lname 
            FROM jobs JOIN users ON users.user_id = jobs.employer_id;`
        );
        
        res.status(statCodes.OK).json({msg: "Jobs data fetched successfully", jobsData})
        
    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong, while fetching jobs data."})
    }
}


const myPosts = async (req, res) => {
    const {employee_id} = req.query
    const employeeId = parseInt(employee_id)

    if (employeeId !==0 && !employeeId){
        return res.status(statCodes.BAD_REQUEST).json({msg: "User_id is requered"})
    }

    try {
        const [ userJobs ] = await db.query("SELECT * FROM jobs WHERE employer_id=?", [employeeId])

        if (!userJobs){
            return res.status(statCodes.NOT_FOUND).json({msg: "No jobs posted by this user found."})
        }

        res.status(statCodes.OK).json({msg: "Jobs posted by user fetched succefully.", userJobs})

    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong, while fetching user posts."})
    }


}


const applyJob = async (req, res) => {
    const { job_id, seeker_id, resume, cover_letter } = req.body
    if (!job_id || !seeker_id){
        return res.status(statCodes.BAD_REQUEST).json({msg: "Incomplet data, fill all requered fields."})
    }

    try {
        await db.query(
            "INSERT INTO applications (job_id, seeker_id, resume, cover_letter) VALUES (?,?,?,?)",
            [job_id, seeker_id, resume, cover_letter]
        )

        res.status(statCodes.CREATED).json({msg: "Application sent successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong, while applying for job."})
    }
    
}


module.exports = {postJob, getAllJobs, myPosts, applyJob}