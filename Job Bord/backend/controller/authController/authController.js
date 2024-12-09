const db = require('../../database/database')
const statCodes = require('http-status-codes')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { fname, lname, email, role, password } = req.body

    if (!fname || !lname || !email || !role || !password) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Fill all requered fields" })
    }
    if (password.length < 6) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Password must not be less than 6 characters" })
    }

    try {
        const [user] = await db.query("SELECT user_id FROM users WHERE email=?", [email])
        if (user.length > 0) {
            return res.status(statCodes.BAD_REQUEST).json({ msg: "Email registed already" })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const result = await db.query("INSERT INTO users (fname, lname, email, role, password) VALUES (?,?,?,?,?)", [fname, lname, email, role, hash])
        res.status(statCodes.OK).json({msg: "Registered successfully"})

    } catch (error) {
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, please try again." })
        console.log(error)
    }
}

const login = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password){
        return res.status(statCodes.BAD_REQUEST).json({msg: "Fill all requered fields."})
    }

    try {
        const [user] = await db.query("SELECT user_id, fname, password, role FROM users WHERE email=?", [email])
        if (user.length !== 1){
            return res.status(statCodes.UNAUTHORIZED).json({msg: "Wrong password/ email."})
        }
        const isMatch = await bcrypt.compare(password, user[0].password)
        if (!isMatch){
            return res.status(statCodes.UNAUTHORIZED).json({msg: "Wrong password/ email"})
        }

        const fname = user[0].fname
        const user_id = user[0].user_id
        const role = user[0].role
        const token = jwt.sign({fname, user_id}, process.env.JWT_SECRET, {expiresIn: '1d'}) 
        res.status(statCodes.OK).json({msg: "Logged in", token, user_id, role, fname})

    } catch (error) {
        console.log(error)
        return res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong, please try again."})
    }
}


const checkUser = async (req, res) => {
    const { user_id } = req.query
    const user = req.user
    if (!user_id){
        return res.status(statCodes.BAD_REQUEST).json({msg: "User Id not provided."})
    }

    try {
        const [ roleData ] = await db.query("SELECT role FROM users WHERE user_id=?", [user_id])
        const role = roleData[0].role
        if (role !== "Employer" && role !== "Job Seeker"){
            return res.status(statCodes.UNAUTHORIZED).json({msg: " Invalid role."})
        }
        res.status(statCodes.OK).json({msg: "User checked.", role, user})

    } catch (error) {
        console.log(error)
        return res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong, please try again."})
    }



}

module.exports = { register, login, checkUser }
