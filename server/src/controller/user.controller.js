import { connection } from "../database/connectDb.js";
import cloudinary from "../utills/cloudinary.js";
import dataUri from "../utills/dataUri.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



export const register = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        if (!fullName || !email || !password || !role) {
            return res.status(400).json({ message: "Please Provide All the required Fields.", success: false, error: true })
        }
        const profile_img = req.file;
        //console.log("profile_img",profile_img)
        const fileUri = dataUri(profile_img);
        //console.log("file_url",fileUri);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            folder: "profile_images"
        });
        //console.log(cloudResponse);
        const isRegistered = `SELECT * FROM user WHERE email=?`;

        connection.query(isRegistered, [email], async (err, result) => {
            if (err) {
                return res.status(400).json({ message: "Database error.", success: false, error: true })
            }
            //console.log(result);
            if (result.length > 0) {
                return res.status(400).json({ message: `You are already registered with ${email} this email id.`, success: false, error: true })
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const profile_img_link = cloudResponse.secure_url;
            const createUser = `INSERT INTO user (fullName,email,password,role,profile_photo) VALUES (?,?,?,?,?)`;
            connection.query(createUser, [fullName, email, hashedPassword, role, profile_img_link], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({ message: "Database error.", success: false, error: true })
                }
                //console.log(result)
                return res.status(201).json({ message: `${fullName} Register Success.`, success: true, error: false })
            })
        })


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "There is Something Error While Register.", success: false, error: true })
    }
}




export const login = async (req, res) => {
    try {
        const { email, password,role } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please Provide All The Credentials.", success: false, error: true })
        }

        const isRegistered = `SELECT * FROM user WHERE email=?`
        connection.query(isRegistered, [email], async (err, result) => {
            if (err) {
                return res.status(400).json({ message: "Database error.", success: false, error: true })
            }
            //console.log("login_result",result)
            if (result.length === 0) {
                return res.status(400).json({ message: "You are not registered.", success: false, error: true })
            }
            let userData = result[0]
            const isCorrectPassword = await bcrypt.compare(password, userData.password);
            //console.log(isCorrectPassword);
            if (!isCorrectPassword) {
                return res.status(400).json({ message: "Wrong Password.", success: false, error: true })
            }
            if (role != userData.role) {
                return res.status(400).json({ message: "Account Does Not Exist With Current Role.", success: false, error: true })
            }
            //console.log(userData)
            const {password:_,...userDataWoPassword}=userData;
            //console.log(userDataWoPassword)
            const token=await jwt.sign(userDataWoPassword,process.env.JWT_SECRET_KEY,{expiresIn:"10d"});
            res.cookie(userDataWoPassword.role==="student"?"userToken":"recruiterToken",token,{
                httpOnly:true,
                sameSite:"strict",
                secure:process.env.NODE_ENV==="Production",
                maxAge:10*24*60*60*1000
            });
            return res.status(200).json({message:`${userData.fullName} Logged In Successfully`,success:true,error:false,data:userDataWoPassword})
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error WHile trying to Login.", success: false, error: true })
    }
}


export const logout=(req,res)=>{
    try{
        res.clearCookie("userToken",{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==="Production"
        });
        res.clearCookie("recruiterToken",{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==="Production"
        })
        return res.status(200).json({message:"User Logged Out Success!",success:true,error:false})

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"Error While Trying To Logout.",success:false,error:true})
    }
}



// export const updateProfile=async(req,res)=>{
//     try{
//         const {fullName,email,phoneNumber,bio,skills}=req.body;
//         if(!fullName || !email || !phoneNumber || !bio || !skills)
//         {
//             return res.status(400).json({message:"There is nothing to update.",success:false,error:true})
//         }


//     }
//     catch(error)
//     {
//         console.log(error);
//         return res.status(500).json({message:"Error while trying to Update User Details.",success:false,error:true})
//     }
// }