const statCodes = require("http-status-codes")
const db = require("../../database/database")


const myApplications = async (req, res) => {
    const { seeker_id } = req.query
    if (!seeker_id){
        return res.status(statCodes.BAD_REQUEST).json({msg: "Seeker Id requered."})
    }

    try {
        const [ seeker_applications ] = await db.query("SELECT * FROM applications WHERE seeker_id=?", [seeker_id])
        if ( !seeker_applications || seeker_applications?.length === 0) {
            return res.status(statCodes.NOT_FOUND).json({msg: "No applications found for this user."})
        }
        res.status(statCodes.OK).json({msg: "User applications data fetched successfully", seeker_applications})
        
    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong, while fetching user applications data."})
    }
}

module.exports = { myApplications }