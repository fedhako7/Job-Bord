const db = require('../../database/database')
const statCodes = require('http-status-codes')


const search = async (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(statCodes.BAD_REQUEST).json({ msg: "Search keyword is required" });
    }

    try {
        const [search_jobs] = await db.query(
            "SELECT * FROM jobs WHERE title LIKE ? ORDER BY created_at DESC",
            [`%${title}%`]
        );

        if (search_jobs.length === 0) {
            return res.status(statCodes.NOT_FOUND).json({ msg: "[GuestFeature]: No jobs found matching the title" });
        }

        res.status(statCodes.OK).json({ msg: "[GuestFeature]: Jobs fetched successfully", search_jobs });
    } catch (error) {
        console.log(error);
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong while fetching jobs" });
    }
};


const featured = async (req, res) => {
    try {
        const [featured_jobs] = await db.query(
            `SELECT * from jobs
            ORDER BY jobs.created_at DESC
            LIMIT 3;`
        );

        res.status(statCodes.OK).json({ msg: "[GuestFeature]: Jobs data fetched successfully", featured_jobs })

    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "[GuestFeature]: Something went wrong, while fetching jobs." })
    }
}


const handleMessage = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(statCodes.BAD_REQUEST).json({
            msg: '[GuestMessageHandler]: Name, email, or message not provided.',
        });
    }

    // Get current date and time
    const sentAt = new Date();

    try {
        await db.query(
            'INSERT INTO messages (name, email, message, sent_at) VALUES (?, ?, ?, ?)',
            [name, email, message, sentAt] 
        );

        return res.status(statCodes.OK).json({
            msg: '[GuestMessageHandler]: Message Sent Successfully.',
        });
    } catch (error) {
        console.error('[GuestMessageHandler Error]:', error);
        return res.status(statCodes.INTERNAL_SERVER_ERROR).json({
            msg: '[GuestMessageHandler]: Something went wrong while sending message.',
        });
    }
};


module.exports = { search, featured, handleMessage }
