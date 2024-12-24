const db = require('../../database/database')
const statCodes = require('http-status-codes')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

const register = async (req, res) => {
    const { fname, lname, email, role, password, company } = req.body;

    if (!fname || !lname || !email || !role || !password) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Fill all required fields" });
    }
    if (password.length < 8) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Password must not be less than 8 characters" });
    }

    try {
        const [user] = await db.query("SELECT user_id FROM users WHERE email=?", [email]);
        if (user.length > 0) {
            return res.status(statCodes.BAD_REQUEST).json({ msg: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const result = await db.query(
            "INSERT INTO users (fname, lname, email, role, password, company, verificationToken, isVerified) VALUES (?,?,?,?,?,?,?,?)",
            [fname, lname, email, role, hash, company, verificationToken, false]
        );

        const transporter = nodemailer.createTransport({
            host: "74.125.143.109",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const verificationLink = `${process.env.VERIFICATION_LINK}?token=${verificationToken}`;

        const mailOptions = {
            from: "Fedho_developer",
            to: email,
            subject: "Verify Your Email",
            html: `<p>Hi ${fname},</p>
                <p>Thank you for registering. Please click the link below to verify your email:</p>
                <a href="${verificationLink}">Verify Email</a>`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Error sending email:", err);
            } else {
                console.log("Email sent:", info.response);
            }
        });

        res.status(statCodes.OK).json({ msg: "Registered successfully. Please check your email to verify your account." });
    } catch (error) {
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, please try again." });
        console.error(error);
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(400).json({ msg: "Token is required" });
  
    try {
      const [user] = await db.query("SELECT * FROM users WHERE verificationToken = ?", [token]);
      if (user.length === 0) return res.status(400).json({ msg: "Invalid token" });
  
      await db.query("UPDATE users SET isVerified = ?, verificationToken = NULL WHERE user_id = ?", [true, user[0].user_id]);
      res.status(200).json({ msg: "Email verified successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong while verifying Email." });
    }
  };

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Fill all requered fields." })
    }

    try {
        const [user] = await db.query("SELECT user_id, fname, password, role FROM users WHERE email=?", [email])
        if (user.length !== 1) {
            return res.status(statCodes.UNAUTHORIZED).json({ msg: "Wrong password/ email." })
        }
        const isMatch = await bcrypt.compare(password, user[0].password)
        if (!isMatch) {
            return res.status(statCodes.UNAUTHORIZED).json({ msg: "Wrong password/ email" })
        }

        const fname = user[0].fname
        const user_id = user[0].user_id
        const role = user[0].role
        const token = jwt.sign({ fname, user_id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(statCodes.OK).json({ msg: "Logged in", token, user_id, role, fname })

    } catch (error) {
        console.log(error)
        return res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, please try again." })
    }
}


const checkUser = async (req, res) => {
    const { user_id } = req.query
    const user = req.user
    if (!user_id) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "User Id not provided." })
    }

    try {
        const [roleData] = await db.query("SELECT role FROM users WHERE user_id=?", [user_id])
        const role = roleData[0].role
        if (role !== "Employer" && role !== "Job Seeker") {
            return res.status(statCodes.UNAUTHORIZED).json({ msg: " Invalid role." })
        }
        res.status(statCodes.OK).json({ msg: "User checked.", role, user })

    } catch (error) {
        console.log(error)
        return res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, please try again." })
    }



}


const changePassword = async (req, res) => {
    const { old_pass, new_pass, user_id } = req.body

    if (!user_id) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Error: User Id not provided." })
    } else if (!old_pass) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Error: old password not provided." })
    } else if (!new_pass) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Error: new password not provided." })
    } else if (new_pass.length < 6) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "New password must not be less than 6 characters" })
    }

    try {
        const [user] = await db.query("SELECT user_id, fname, password, role FROM users WHERE user_id=?", [user_id])
        if (user.length !== 1) {
            return res.status(statCodes.NOT_FOUND).json({ msg: "User not found." })
        }
        const isMatch = await bcrypt.compare(old_pass, user[0].password)
        if (!isMatch) {
            return res.status(statCodes.UNAUTHORIZED).json({ msg: "Wrong old password." })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(new_pass, salt)

        await db.query("UPDATE users SET password = ? WHERE user_id = ?",
            [hash, user_id]
        );
        res.status(statCodes.OK).json({ msg: "Password changed successfully" });

    } catch (error) {
        console.log(error)
        return res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, please try again." })
    }
}

module.exports = { register, verifyEmail, login, checkUser, changePassword }
