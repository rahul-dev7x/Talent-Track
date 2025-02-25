import jwt from "jsonwebtoken";




export const isRecruiter=async(req,res,next)=>{
    try{
        const token=req.cookies.recruiterToken;
        if(!token)
        {
            return res.status(401).json({message:"Unauthorized User.",success:false,error:true})
        }
        const decodeToken=await jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decodeToken)
        {
            return res.status(400).json({message:"Invalid Token.",success:false,error:true})
        }
        //console.log("decode_recruiter_token",decodeToken);
        if(decodeToken.role!=="recruiter")
        {
            return res.status(400).json({message:"You Are Not An Recruiter.You Don't have authorized to register company.",success:false,error:true})
        }
        req.recruiterId=decodeToken.id;
        next();

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"User Unauthorized.",success:false,error:true})
    }
}