import { connection } from "../database/connectDb.js";







export const postJob=(req,res)=>{
    try{
        const{title,description,salary,experience_level,job_type,location,position,company_id}=req.body;
        const recruiter_id=req.recruiter_id;
        if(!title || !description || !salary || !experience_level || !job_type || !location || !position || !company_id)
        {
            return res.status(400).json({message:"Provide All the required fields.",success:false,error:true})
        }

        const postJobQuery=`INSERT INTO job (title,description,salary,experience_level,job_type,location,position,company_id) VALUES (?,?,?,?,?,?,?,?)`;
        connection.query(postJobQuery,[title,description,salary,experience_level,job_type,location,position,company_id],(err,result)=>{
            if(err)
            {
                console.log(err);
                return res.status(400).json({message:"Database error.",success:false,error:true})
            }
            return res.status(201).json({message:"Job Created Successfuly.",success:true,error:false})
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({message:"There is an error while trying to post a job.",success:false,error:true})
    }
}



export const getAllJobs=(req,res)=>{
    try{
        const keyword=req.query.keyword ? `%${req.query.keyword}%` : "%";;
        const jobQuery=`SELECT job.*,company.name AS Company_Name,company.logo AS Company_Logo from job join company on job.company_id=company.id WHERE job.title LIKE ? OR job.description LIKE ?`;
        connection.query(jobQuery,[keyword,keyword],(err,result)=>{
            if(err)
            {
                console.log(err);
                return res.status(400).json({message:"Database error.",success:false,error:true})
            }
            if(result.length===0)
            {
                return res.status(200).json({message:"No Jobs Found.",success:false,error:true})
            }
            return res.status(200).json({message:"All Jobs Found Successfully.",success:true,error:false,data:result})
            //console.log(result);
        })

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"Error while trying to get all jobs.",success:false,error:true})
    }
}