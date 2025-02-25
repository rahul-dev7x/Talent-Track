import { connection } from "../database/connectDb.js";


export const applyJob = async (req, res) => {
    try {
        const { id } = req.params;
        const applicant_id = req.userId;

        if (!id) {
            return res.status(400).json({ message: "Please provide Job ID.", success: false, error: true });
        }


        const [jobResult] = await connection.promise().query("SELECT * FROM job WHERE id=?", [id]);

        if (jobResult.length === 0) {
            return res.status(400).json({ message: "Job not available.", success: false, error: true });
        }

        
        const [appliedResult] = await connection.promise().query("SELECT * FROM application WHERE job=? AND applicant=?", [id, applicant_id]);

        if (appliedResult.length > 0) {
            return res.status(400).json({ message: "You have already applied for this job.", success: false, error: true });
        }

        
        await connection.promise().query("INSERT INTO application (job, applicant, status) VALUES (?, ?, 'pending')", [id, applicant_id]);

        return res.status(201).json({ message: "Job applied successfully.", success: true, error: false });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while applying for the job.", success: false, error: true });
    }
};


export const getAppliedJobs = async (req, res) => {
    try {
        const user_id = req.userId;
        if (!user_id) {
            return res.status(401).json({ message: "User is not authenticated.", success: false, error: true });
        }

        const [jobs] = await connection.promise().query(
            `SELECT job.title, job.location, company.name AS company_name, 
            application.status, application.applied_at 
            FROM job 
            JOIN application ON job.id = application.job 
            JOIN company ON company.id = job.company_id 
            WHERE application.applicant = ?`, 
            [user_id]
        );

        if (jobs.length === 0) {
            return res.status(200).json({ message: "You haven't applied to any jobs yet.", success: true, error: false, data: [] });
        }

        return res.status(200).json({ message: "Applied jobs fetched successfully.", success: true, error: false, data: jobs });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while fetching applied jobs.", success: false, error: true });
    }
};


export const getApplicants = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Please provide Job ID.", success: false, error: true });
        }

        
        const [jobResult] = await connection.promise().query("SELECT * FROM job WHERE id=?", [id]);

        if (jobResult.length === 0) {
            return res.status(400).json({ message: "Job not available.", success: false, error: true });
        }

        
        const [applicants] = await connection.promise().query(
            `SELECT user.fullName, user.email, user.profile_resume, user.resume_original_name 
            FROM user 
            JOIN application ON user.id = application.applicant 
            WHERE application.job = ?`, 
            [id]
        );

        if (applicants.length === 0) {
            return res.status(200).json({ message: "No applicants yet.", success: true, error: false, data: [] });
        }

        return res.status(200).json({ message: "Applicants fetched successfully.", success: true, error: false, data: applicants });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while fetching applicants.", success: false, error: true });
    }
};
