const statCodes = require("http-status-codes")
const db = require("../../database/database")
const nodemailer = require('nodemailer');


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
        const [user_jobs] = await db.query(
            `SELECT jobs.*, users.fname, users.lname 
            FROM jobs JOIN users ON users.user_id = jobs.employer_id;`
        );
        
        res.status(statCodes.OK).json({msg: "Jobs data fetched successfully", user_jobs})
        
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
        const [user_jobs] = await db.query(
            `SELECT jobs.*, users.fname, users.lname 
            FROM jobs JOIN users ON users.user_id = jobs.employer_id
            WHERE employer_id=?;`, [employeeId]
        );

        if (!user_jobs){
            return res.status(statCodes.NOT_FOUND).json({msg: "No jobs posted by this user found."})
        }

        res.status(statCodes.OK).json({msg: "Jobs posted by user fetched succefully.", user_jobs})

    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong, while fetching user posts."})
    }


}


const applyJob = async (req, res) => {
    const { job_id, title, seeker_id, resume, cover_letter } = req.body;
    if (!job_id || !seeker_id) {
        return res.status(statCodes.BAD_REQUEST).json({msg: "Incomplete data, fill all required fields."});
    }

    try {
        // Save application in the database
        await db.query(
            "INSERT INTO applications (job_id, seeker_id, resume, cover_letter) VALUES (?,?,?,?)",
            [job_id, seeker_id, resume, cover_letter]
        );
        const [seeker] = await db.query("SELECT email FROM users WHERE user_id = ?", [seeker_id]);
        const seekerEmail = seeker[0]?.email;

        if (!seekerEmail) {
            return res.status(statCodes.BAD_REQUEST).json({msg: "Seeker email not found."});
        }
        const transporter = nodemailer.createTransport({
            host: "74.125.143.109", 
            port: 587,             
            secure: false,
            auth: {
                user: "fedesayelmachew75@gmail.com",
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });


        const mailOptions = {
            from: "Fedho_developer", 
            to: seekerEmail,
            subject: "Job Application Confirmation",
            text: `Thank you for applying for the job (Title: ${title}). Your application has sent to employer.`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Error sending email:", err);
            } else {
                console.log("Email sent:", info.response);
            }
        });

        res.status(statCodes.CREATED).json({msg: "Application sent successfully and email notification sent."});
        
    } catch (error) {
        console.log(error);
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong while applying for the job."});
    }
};

module.exports = {postJob, getAllJobs, myPosts, applyJob}