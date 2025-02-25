import express from "express";
import { isRecruiter } from "../middleware/isRecruiter.js";
import { registerCompany } from "../controller/company.controller.js";


const router=express.Router();



router.post("/register",isRecruiter,registerCompany)






export default router;