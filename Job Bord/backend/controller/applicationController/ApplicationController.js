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

module.exports = { myApplications }