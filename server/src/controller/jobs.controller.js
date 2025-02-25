import { query } from "express";
import { connection } from "../database/connectDb.js";







export const postJob = (req, res) => {
    try {
        const { title, description, salary, experience_level, job_type, location, position, company_id } = req.body;

        const recruiter_id = req.recruiterId;
        if (!title || !description || !salary || !experience_level || !job_type || !location || !position || !company_id) {
            return res.status(400).json({ message: "Provide All the required fields.", success: false, error: true })
        }

        const postJobQuery = `INSERT INTO job (title,description,salary,experience_level,job_type,location,position,company_id,created_by) VALUES (?,?,?,?,?,?,?,?,?)`;
        connection.query(postJobQuery, [title, description, salary, experience_level, job_type, location, position, company_id, recruiter_id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Database error.", success: false, error: true })
            }
            return res.status(201).json({ message: "Job Created Successfuly.", success: true, error: false })
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "There is an error while trying to post a job.", success: false, error: true })
    }
}



export const getAllJobs = (req, res) => {
    try {
        const keyword = req.query.keyword ? `%${req.query.keyword}%` : "%";;
        const jobQuery = `SELECT job.*,company.name AS Company_Name,company.logo AS Company_Logo from job join company on job.company_id=company.id WHERE job.title LIKE ? OR job.description LIKE ?`;
        connection.query(jobQuery, [keyword, keyword], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Database error.", success: false, error: true })
            }
            if (result.length === 0) {
                return res.status(200).json({ message: "No Jobs Found.", success: false, error: true })
            }
            return res.status(200).json({ message: "All Jobs Found Successfully.", success: true, error: false, data: result })
            //console.log(result);
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while trying to get all jobs.", success: false, error: true })
    }
}




export const getJobById = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Please Provide Job Id.", success: false, error: true });
        }

        const isJobAvailable = `SELECT * FROM job WHERE id=?`;
        connection.query(isJobAvailable, [id], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ message: "Database error.", success: false, error: true })
            }
            if (result.length === 0) {
                return res.status(400).json({ message: "No Job Available.", success: false, error: true })
            }
            const getJobQuery = `SELECT job.*,company.name AS Company_Name,company.logo AS Company_Logo from job JOIN company on job.company_id=company.id WHERE job.id=?`;
            connection.query(getJobQuery, [id], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({ message: "Database error.", success: false, error: true })
                }
                if (result.length === 0) {
                    return res.status(400).json({ message: "No Job Description Available.", success: false, error: true })
                }
                return res.status(200).json({ message: "Job Details Fund Successfully.", success: true, error: false, data: result })
            })
        })


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "There is an error while trying to get Job By Id.", success: false, error: true })
    }
}





export const getAdminJobs = (req, res) => {
    try {
        const recruiter_id = req.recruiterId;
        if (!recruiter_id) {
            return res.status(400).json({ message: "User Not Authenticated.", success: false, error: true })
        }
        //console.log(recruiter_id)
        const getAdminJobsQuery = `SELECT job.*,company.name AS Company_Name,company.logo AS Company_Logo FROM job JOIN company ON company.id=job.company_id WHERE job.created_by=?`;
        connection.query(getAdminJobsQuery, [recruiter_id], (err, result) => {
            if (err) {
                return res.status(400).json({ message: "Database Error.", success: false, error: true })
            }
            if (result.length === 0) {
                return res.status(200).json({ message: "No Jobs Found.", success: true, error: false, data: [] })
            }
            //console.log("result",result)
            return res.status(200).json({ message: "All Jobs Found Successfully.", success: true, error: false, data: result })
        })

    }
    catch (error) {

    }
}