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
          return res.status(statCodes.NOT_FOUND).json({ msg: "No jobs found matching the title" });
      }

      res.status(statCodes.OK).json({ msg: "Jobs fetched successfully", search_jobs });
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

        res.status(statCodes.OK).json({ msg: "Jobs data fetched successfully", featured_jobs })

    } catch (error) {
        console.log(error)
        res.status(statCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, while fetching jobs." })
    }
}


module.exports = { search, featured }
