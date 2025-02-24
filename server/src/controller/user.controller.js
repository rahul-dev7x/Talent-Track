import { connection } from "../database/connectDb.js";
import cloudinary from "../utills/cloudinary.js";
import dataUri from "../utills/dataUri.js";
import bcrypt from "bcryptjs"




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