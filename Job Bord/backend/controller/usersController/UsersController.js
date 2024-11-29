const statCodes = require("http-status-codes")
const db = require("../../database/database")


const profile = async (req, res) => {
    const user_id = parseInt(req.query.user_id)

    if (!user_id) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "User ID is required" });
    }

    try {
        const [ userData ] = await db.query("SELECT user_id, fname, lname, email, role, created_at FROM users WHERE user_id=?", [user_id])
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
    const {user_id, fname: newFname, lname: newLname, email: newEmail, role: newRole} = req.body
    if (!user_id || !newFname || !newLname || !newEmail || !newRole){
        return res.status(statCodes.BAD_REQUEST).json({msg: "All fields are requered."})
    }

    try {
        const [ userData ] = await db.query("SELECT * FROM users WHERE user_id=?", [user_id])
        const user = userData[0]
        if (!user && user?.length === 0){
            return res.status(statCodes.NOT_FOUND).json({msg: "User not found"})
        }
        const {fname, lname, email, role, created_at} = user
        if (newFname == fname && newLname == lname && newEmail == email && newRole == role){
            return res.status(statCodes.BAD_REQUEST).json({msg: "No update, the same data"})
        }
        
        db.query("UPDATE users SET fname=?, lname=?, email=?, role=?, updated_at = NOW() WHERE user_id=?", [newFname, newLname, newEmail, newRole, user_id])
        res.status(statCodes.CREATED).json({msg: "Profile updated successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong updating user data, please try later."})
    }
}

module.exports = {profile, profileUpdate}