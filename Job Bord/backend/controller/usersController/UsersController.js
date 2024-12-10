const statCodes = require("http-status-codes")
const db = require("../../database/database")


const profile = async (req, res) => {
    const user_id = parseInt(req.query.user_id)

    if (!user_id) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "User ID is required" });
    }

    try {
        const [ userData ] = await db.query("SELECT * FROM users WHERE user_id=?", [user_id])
        const user = userData[0]
        if (!user || user?.length === 0){
            return res.status(statCodes.NOT_FOUND).json({msg: "User not found"})
        }
        res.status(statCodes.OK).json({msg: "User data loaded successfully", user})
        
    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg: "Error loading user data, please try later."})
        
    }
}


const profileUpdate = async (req, res) => {
    const {user_id, role, fname: newFname, lname: newLname, email: newEmail } = req.body
    let { company: newCompany } = req.body
    if (!user_id || !newFname || !newLname || !newEmail){
        return res.status(statCodes.BAD_REQUEST).json({msg: "All fields are requered."})
    }else if (role !== "Employer"){
        newCompany = null
    }

    try {
        const [ userData ] = await db.query("SELECT * FROM users WHERE user_id=?", [user_id])
        const user = userData[0]
        if (!user && user?.length === 0){
            return res.status(statCodes.NOT_FOUND).json({msg: "User not found"})
        }
        const {fname, lname, email, company, created_at} = user
        if (newFname == fname && newLname == lname && newEmail == email && newCompany == company){
            return res.status(statCodes.BAD_REQUEST).json({msg: "No update, the same data"})
        }
        
        db.query("UPDATE users SET fname=?, lname=?, email=?, company=?, updated_at = NOW() WHERE user_id=?", [newFname, newLname, newEmail, newCompany, user_id])
        res.status(statCodes.CREATED).json({msg: "Profile updated successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong updating user data, please try later."})
    }
}

module.exports = {profile, profileUpdate}