import { connection } from "../database/connectDb.js";
import cloudinary from "../utills/cloudinary.js";
import dataUri from "../utills/dataUri.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        if (!fullName || !email || !password || !role) {
            return res.status(400).json({ message: "Please Provide All the required Fields.", success: false, error: true });
        }
        const profile_img = req.file;
        let profile_img_link=null;
        if(profile_img)
        {
            const fileUri = dataUri(profile_img);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, { folder: "profile_images" });
            profile_img_link = cloudResponse.secure_url;
        }
        

        const [existingUser] = await connection.promise().query("SELECT * FROM user WHERE email=?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: `You are already registered with ${email} this email id.`, success: false, error: true });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await connection.promise().query("INSERT INTO user (fullName,email,password,role,profile_photo) VALUES (?,?,?,?,?)",
            [fullName, email, hashedPassword, role,profile_img_link]);

        return res.status(201).json({ message: `${fullName} Register Success.`, success: true, error: false });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "There is Something Error While Register.", success: false, error: true });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Please Provide All The Credentials.", success: false, error: true });
        }

        const [user] = await connection.promise().query("SELECT * FROM user WHERE email=?", [email]);
        if (user.length === 0) {
            return res.status(400).json({ message: "You are not registered.", success: false, error: true });
        }

        let userData = user[0];
        const isCorrectPassword = await bcrypt.compare(password, userData.password);
        if (!isCorrectPassword) {
            return res.status(400).json({ message: "Wrong Password.", success: false, error: true });
        }
        if (role !== userData.role) {
            return res.status(400).json({ message: "Account Does Not Exist With Current Role.", success: false, error: true });
        }

        const { password: _, ...userDataWoPassword } = userData;
        const token = jwt.sign(userDataWoPassword, process.env.JWT_SECRET_KEY, { expiresIn: "10d" });
        res.cookie(userDataWoPassword.role === "student" ? "userToken" : "recruiterToken", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV==="production",
            maxAge: 10 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: `${userData.fullName} Logged In Successfully`, success: true, error: false, data: userDataWoPassword,token:token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error While trying to Login.", success: false, error: true });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("userToken", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "Production" });
        res.clearCookie("recruiterToken", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "Production" });
        return res.status(200).json({ message: "User Logged Out Success!", success: true, error: false });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error While Trying To Logout.", success: false, error: true });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio } = req.body;
        const user_id = req.userId;
        const resume = req.file;
        //         console.log("resume",resume)
        //         const fileBuffer = resume.buffer.toString("base64");
        // const fileUri = `data:${resume.mimetype};base64,${fileBuffer}`;
        // console.log(fileUri)

        let updateFields = [];
        let updateValues = [];

        if (fullName) { updateFields.push("fullName=?"); updateValues.push(fullName); }
        if (email) { updateFields.push("email=?"); updateValues.push(email); }
        if (phoneNumber) { updateFields.push("phone_number=?"); updateValues.push(phoneNumber); }
        if (bio) { updateFields.push("profile_bio=?"); updateValues.push(bio); }
        if (resume) {
            const fileUri = dataUri(resume);
            const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content, { folder: "resume" });
            updateFields.push("profile_resume=?", "resume_original_name=?");
            updateValues.push(cloudinaryResponse.secure_url, resume.originalname);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: "Nothing To Update.", success: false, error: true });
        }

        const [existingEmail] = await connection.promise().query("SELECT * FROM user WHERE email=? AND id!=?", [email, user_id]);
        if (existingEmail.length > 0) {
            return res.status(400).json({ message: "This email id is already registered with another account.", success: false, error: true });
        }

        updateValues.push(user_id);
        await connection.promise().query(`UPDATE user SET ${updateFields.join(", ")} WHERE id=?`, updateValues);

        const [updatedUser] = await connection.promise().query("SELECT * FROM user WHERE id=?", [user_id]);
        if (updatedUser.length === 0) {
            return res.status(400).json({ message: "User Not Found.", success: false, error: true });
        }

        const userData = updatedUser.map(({ password, ...restData }) => restData);
        return res.status(200).json({ message: "User Data Updated Successfully.", success: true, error: false, data: userData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while trying to Update User Details.", success: false, error: true });
    }
};
