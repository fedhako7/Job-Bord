const statCodes = require("http-status-codes")
const db = require("../../database/database")
const nodemailer = require('nodemailer');


const postJob = async (req, res) => {
    const { employer_id, title, description, location, deadline, salary, responsibilities, criteria } = req.body
    if (!title || !description || !employer_id || !location || !deadline) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Incompelete info, fill all requered info." })
    }

    try {
        await db.query(
            `INSERT INTO jobs (title, description, location, deadline, salary, responsibilities, criteria, employer_id) VALUES (?,?,?,?,?,?,?,?)`,
            [title, description, location, deadline, salary, responsibilities, criteria, employer_id]
        )
        res.status(statCodes.CREATED).json({ msg: "New job created successfully" })

    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong while posting job, please ty later." })

    }
}


const getAllJobs = async (req, res) => {

    try {
        const [user_jobs] = await db.query(
            `SELECT jobs.*, users.company, users.fname, users.lname 
            FROM jobs JOIN users ON users.user_id = jobs.employer_id
             ORDER BY jobs.created_at DESC;`
        );

        res.status(statCodes.OK).json({ msg: "Jobs data fetched successfully", user_jobs })

    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, while fetching jobs data." })
    }
}

const getRecentJobs = async (req, res) => {
    try {
        const [user_jobs] = await db.query(
            `SELECT jobs.*, users.company, users.fname, users.lname 
            FROM jobs JOIN users ON users.user_id = jobs.employer_id
            ORDER BY jobs.created_at DESC
            LIMIT 5;`
        );

        res.status(statCodes.OK).json({ msg: "Jobs data fetched successfully", user_jobs })

    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, while fetching jobs data." })
    }
}


const myPosts = async (req, res) => {
    const { employee_id } = req.query;
    const employeeId = parseInt(employee_id);

    if (employeeId !== 0 && !employeeId) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "User_id is required" });
    }

    try {
        const query = `
            SELECT jobs.*, users.company, users.fname, users.lname 
            FROM jobs 
            JOIN users ON users.user_id = jobs.employer_id
            WHERE employer_id=? 
            ORDER BY jobs.created_at DESC
        `;

        const [user_jobs] = await db.query(query, [employeeId]);

        if (!user_jobs || user_jobs.length === 0) {
            return res.status(statCodes.NOT_FOUND).json({ msg: "No jobs posted by this user found." });
        }

        res.status(statCodes.OK).json({ msg: "Jobs posted by user fetched successfully.", user_jobs });

    } catch (error) {
        console.error(error);
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong while fetching user posts." });
    }
};


const topMyPost = async (req, res) => { 
    const { employee_id } = req.query;

    if (employee_id !== 0 && !employee_id) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "User_id is required" });
    }

    try {
        const query = `
            SELECT jobs.*, users.company, users.fname, users.lname 
            FROM jobs 
            JOIN users ON users.user_id = jobs.employer_id
            WHERE employer_id=? 
            ORDER BY jobs.applicants DESC, jobs.created_at DESC
            LIMIT 5
        `;

        const [user_jobs] = await db.query(query, [employee_id]);

        if (!user_jobs || user_jobs.length === 0) {
            return res.status(statCodes.NOT_FOUND).json({ msg: "No jobs posted by this user found." });
        }

        res.status(statCodes.OK).json({ msg: "Jobs posted by user fetched successfully.", user_jobs });

    } catch (error) {
        console.error(error);
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong while fetching user posts." });
    }
};


const searchMyPost = async (req, res) => {
    const { title, employer_id } = req.query;

    if (!title) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Job title is required" });
    } else if (!employer_id) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Employer Id is required" });
    }

    try {
        const [search_jobs] = await db.query(
            "SELECT * FROM jobs WHERE title LIKE ? AND employer_id=? ORDER BY created_at DESC",
            [`%${title}%`, employer_id]
        );

        if (search_jobs.length === 0) {
            return res.status(statCodes.NOT_FOUND).json({ msg: "No jobs found matching the title" });
        }

        res.status(statCodes.OK).json({ msg: "Jobs fetched successfully", search_jobs });
    } catch (error) {
        console.log(error);
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong while fetching jobs" });
    }
};


const singleJob = async (req, res) => {
    const { job_id } = req.query

    if (job_id !== 0 && !job_id) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Job Id is requered" })
    }

    try {
        const [job] = await db.query(`SELECT jobs.*, users.company, users.fname, users.lname  FROM jobs JOIN users ON users.user_id = jobs.employer_id WHERE job_id=?;`, [job_id]);

        if (!job) {
            return res.status(statCodes.NOT_FOUND).json({ msg: "No job found." })
        }

        res.status(statCodes.OK).json({ msg: "Job detail fetched succefully.", job: job[0] })

    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, while fetching job data." })
    }


}


const jobSearch = async (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Job title is required" });
    }

    try {
        const [search_jobs] = await db.query(
            "SELECT * FROM jobs WHERE title LIKE ? ORDER BY created_at DESC",
            [`%${title}%`]
        );

        if (search_jobs.length === 0) {
            return res.status(statCodes.NOT_FOUND).json({ msg: "No jobs found matching the title" });
        }

        res.status(statCodes.OK).json({ msg: "Jobs fetched successfully", search_jobs });
    } catch (error) {
        console.log(error);
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong while fetching jobs" });
    }
};


const applyJob = async (req, res) => {
    const { job_id, title, seeker_id, cover_letter, } = req.body;
    const resume = req?.file?.path || 'No resume uploaded.';
    if (req.file) {
        console.log('Uploaded Resume Path:', resume);
    } else {
        console.log(resume)
    }

    if (!job_id) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Incomplete data, jobId not provided." });
    } else if (!seeker_id) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Incomplete data, seekerId not provided." });
    } else if (!cover_letter) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Incomplete data, cover_letter not provided." });
    }

    try {
        const [prev_app] = await db.query(
            "SELECT application_id FROM applications WHERE job_id=? AND seeker_id=?",
            [job_id, seeker_id]
        );

        if (prev_app.length > 0) {
            return res
                .status(statCodes.BAD_REQUEST)
                .json({ msg: "You have already applied to this job." });
        }

        await db.query(
            "INSERT INTO applications (job_id, seeker_id, resume, cover_letter) VALUES (?,?,?,?)",
            [job_id, seeker_id, resume, cover_letter]
        )

        await db.query(
            "UPDATE jobs SET applicants = applicants + 1 WHERE job_id = ?",
            [job_id]
        )

        const [seeker] = await db.query("SELECT email FROM users WHERE user_id = ?", [seeker_id]);
        const seekerEmail = seeker[0]?.email;

        if (!seekerEmail) {
            return res.status(statCodes.BAD_REQUEST).json({ msg: "Seeker email not found." });
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
            text: `"Thanks for applying for the job (Title: ${title})! Just a heads-up, this is a simulated application process for learning purposes only. The job posting and application are part of a project designed for learning and practice—no real employers are involved."`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Error sending email:", err);
            } else {
                console.log("Email sent:", info.response);
            }
        });

















        res.status(statCodes.CREATED).json({ msg: "Application sent successfully and email notification sent." });

    } catch (error) {
        console.log(error);
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong while applying for the job." });
    }
};

module.exports = { postJob, getAllJobs, myPosts, applyJob, singleJob, jobSearch, searchMyPost, topMyPost, getRecentJobs }