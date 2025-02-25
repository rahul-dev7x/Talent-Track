import express from "express";
import { login, logout, register, updateProfile } from "../controller/user.controller.js";
import upload from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";



const router=express.Router();


router.post("/register",upload.single("profile_img"),register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/profile/update",upload.single("resume"),isAuthenticated,updateProfile)





export default router;