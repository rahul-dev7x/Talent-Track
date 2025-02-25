import { connection } from "../database/connectDb.js";









export const applyJob = (req, res) => {
    try {
        const { id } = req.params;
        const applicant_id = req.userId;
        if (!id) {
            return res.status(400).json({ message: "Please Provide Job Id.", success: false, error: true })
        }
        const isJobAvailable = `SELECT * FROM job WHERE id=?`
        connection.query(isJobAvailable, [id], (err, result) => {
            if (err) {
                return res.status(400).json({ message: "Database error.", success: false, error: true })
            }
            if (result.length === 0) {
                return res.status(400).json({ message: "Job Not Available.", success: false, error: true })
            }
            const isAlreadyApplied = `SELECT * FROM application WHERE job=? AND applicant=?`;
            connection.query(isAlreadyApplied, [id, applicant_id], (req, result) => {
                if (err) {
                    return res.status(400).json({ message: "Database error.", success: false, error: true })
                }
                if (result.length > 0) {
                    return res.status(400).json({ message: "You have already applied for this job.", success: false, error: true })
                }
                const applyJobQuery = `INSERT INTO application (job,applicant,status) VALUES (?,?,"pending")`;
                connection.query(applyJobQuery, [id, applicant_id], (err, result) => {
                    if (err) {
                        return res.status(400).json({ message: "Database error.", success: false, error: true })
                    }
                    return res.status(201).json({ message: "Job Applied Successfully.", success: true, error: false })
                })
            })


        })

    }
    catch (error) {
        console.group(error);
        return res.status(500).json({ message: "Something is Error while trying to Apply For a Job.", success: false, error: true })
    }
}