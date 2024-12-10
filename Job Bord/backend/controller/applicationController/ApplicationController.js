const statCodes = require("http-status-codes")
const db = require("../../database/database")


const myApplications = async (req, res) => {
    const { seeker_id } = req.query
    if (!seeker_id){
        return res.status(statCodes.BAD_REQUEST).json({msg: "Seeker Id requered."})
    }

    try {
        const [appData] = await db.query(`
            SELECT applications.*, jobs.*, users.* 
            FROM applications 
            JOIN jobs ON jobs.job_id = applications.job_id 
            JOIN users ON users.user_id = jobs.employer_id 
            WHERE applications.seeker_id = ?`, [seeker_id]);
          
        if ( !appData || appData?.length === 0) {
            return res.status(statCodes.NOT_FOUND).json({msg: "No applications found for this user."})
        }
        res.status(statCodes.OK).json({msg: "User applications data fetched successfully", appData})
        
    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong, while fetching user applications data."})
    }
}


const myApplicants = async (req, res) => {
    const { job_id } = req.query
    if ( !job_id ){
        return res.status(statCodes.BAD_REQUEST).json({msg: "Job Id requered."})
    }

    try {
        const [app_data] = await db.query(`
            SELECT 
              applications.*, 
              seeker.*, 
              employer.company AS company
            FROM 
              applications
            JOIN 
              users AS seeker ON seeker.user_id = applications.seeker_id
            JOIN 
              jobs ON jobs.job_id = applications.job_id
            JOIN 
              users AS employer ON employer.user_id = jobs.employer_id
            WHERE 
              applications.job_id = ?
          `, [job_id]);
          
          
        if ( !app_data || app_data?.length === 0) {
            return res.status(statCodes.NOT_FOUND).json({msg: "No applicants found for this question."})
        }
        res.status(statCodes.OK).json({msg: "User applications data fetched successfully", app_data})
        
    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong, while fetching user applications data."})
    }
}


const changeStatus = async (req, res) => {
    const { status, app_id } = req.body
    if ( !app_id ){
        return res.status(statCodes.BAD_REQUEST).json({msg: "Application Id not provided."})
    }else if ( !status ){
        return res.status(statCodes.BAD_REQUEST).json({msg: "Application status not provided."})
    }

    try {
        await db.query(`UPDATE applications SET status=? WHERE application_id=? `, [status, app_id]);
        res.status(statCodes.OK).json({msg: `Applications ${status}`})
        
    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong, while fetching user applications data."})
    }
}

module.exports = { myApplications, myApplicants, changeStatus }