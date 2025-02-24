import express from "express";
import { register } from "../controller/user.controller.js";
import upload from "../middleware/multer.js";



const router=express.Router();


router.post("/register",upload.single("profile_img"),register)





export default router;