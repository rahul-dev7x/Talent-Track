import { connection } from "../database/connectDb.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, salary, experience_level, job_type, location, position, company_id } = req.body;
        const recruiter_id = req.recruiterId;
        
        if (!title || !description || !salary || !experience_level || !job_type || !location || !position || !company_id) {
            return res.status(400).json({ message: "Provide all required fields.", success: false, error: true });
        }
        
        const postJobQuery = `INSERT INTO job (title, description, salary, experience_level, job_type, location, position, company_id, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        await connection.promise().query(postJobQuery, [title, description, salary, experience_level, job_type, location, position, company_id, recruiter_id]);
        
        return res.status(201).json({ message: "Job created successfully.", success: true, error: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while posting job.", success: false, error: true });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword ? `%${req.query.keyword}%` : "%";
        const jobQuery = `SELECT job.*, company.name AS Company_Name, company.logo AS Company_Logo FROM job JOIN company ON job.company_id = company.id WHERE job.title LIKE ? OR job.description LIKE ?`;
        
        const [result] = await connection.promise().query(jobQuery, [keyword, keyword]);
        
        if (result.length === 0) {
            return res.status(200).json({ message: "No jobs found.", success: false, error: true });
        }
        return res.status(200).json({ message: "Jobs retrieved successfully.", success: true, error: false, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving jobs.", success: false, error: true });
    }
};

export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Please provide job ID.", success: false, error: true });
        }
        
        const jobQuery = `SELECT job.*, company.name AS Company_Name, company.logo AS Company_Logo FROM job JOIN company ON job.company_id = company.id WHERE job.id = ?`;
        const [result] = await connection.promise().query(jobQuery, [id]);
        
        if (result.length === 0) {
            return res.status(404).json({ message: "Job not found.", success: false, error: true });
        }
        return res.status(200).json({ message: "Job details found successfully.", success: true, error: false, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving job details.", success: false, error: true });
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const recruiter_id = req.recruiterId;
        if (!recruiter_id) {
            return res.status(401).json({ message: "User not authenticated.", success: false, error: true });
        }
        
        const getAdminJobsQuery = `SELECT job.*, company.name AS Company_Name, company.logo AS Company_Logo FROM job JOIN company ON company.id = job.company_id WHERE job.created_by = ?`;
        const [result] = await connection.promise().query(getAdminJobsQuery, [recruiter_id]);
        
        return res.status(200).json({ message: "Jobs retrieved successfully.", success: true, error: false, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving admin jobs.", success: false, error: true });
    }
};
