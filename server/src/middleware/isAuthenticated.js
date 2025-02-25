import jwt from "jsonwebtoken"


export const isAuthenticated=async(req,res,next)=>{
    try{
        const token=req.cookies.userToken;
        if(!token)
        {
            return res.status(401).json({message:"You are not authenticated.",success:false,error:true})
        }
        const decode=await jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decode)
        {
            return res.status(400).json({message:"Invalid Token!",success:false,error:true})
        }
        //console.log("jwt_decode",decode);
        req.userId=decode.id;
        next();

    }
    catch(error)
    {

    }
}