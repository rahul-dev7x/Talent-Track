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







export const getAppliedJobs=(req,res)=>{
    try{
        const user_id=req.userId;
        if(!user_id)
        {
            return res.status(400).json({message:"User Is not Authenticated.",success:false,error:true})
        }
        const getAppliedJobsQuery=`SELECT job.title,job.location,company.name,application.status,application.created_at FROM job JOIN application ON job.id=application.job JOIN company on company.id=job.company_id WHERE application.applicant=?`;
        connection.query(getAppliedJobsQuery,[user_id],(err,result)=>{
            if(err)
            {
                return res.status(400).json({message:"Database error.",success:false,error:true})
            }
            if(result.length===0)
            {
                return res.status(200).json({message:"You Didn't applied to any jobs now.",success:true,error:false,data:[]})
            }
            return res.status(200).json({message:"Applied Jobs Found Successfully.",success:true,error:false,data:result})
        })


    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"There is an error while trying to fetch applied jobs.",success:false,error:true})
    }
}


export const getApplicants=(req,res)=>{
    try{
        const {id}=req.params;
        if(!id)
        {
            return res.status(400).json({message:"Provide Job Id",success:false,error:true})
        }
        const isJobAvailable=`SELECT * FROM job WHERE id=?`;
        connection.query(isJobAvailable,[id],(err,result)=>{
            if(err)
            {
                return res.status(400).json({message:"Database error.",success:false,error:true})
            }
            if(result.length===0)
            {
                return res.status(400).json({message:"Job Not Available.",success:false,error:true})
            }
            const getApplicantsQuery=`SELECT user.fullName,user.email,user.profile_resume,user.resume_original_name FROM user JOIN application ON user.id=application.applicant JOIN job ON job.id=application.job WHERE application.job=?`;
            connection.query(getApplicantsQuery,[id],(err,result)=>{
                if(err)
                    {
                        return res.status(400).json({message:"Database error.",success:false,error:true})
                    }
                    if(result.length===0)
                        {
                            return res.status(400).json({message:"No Applicants Yet.",success:false,error:true})
                        }  
                        return res.status(200).json({message:"Applicants Found For This Job.",success:true,error:false,data:result})
            })

        })

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"Error while trying to get applicants for a job.",success:false,error:true})
    }
}