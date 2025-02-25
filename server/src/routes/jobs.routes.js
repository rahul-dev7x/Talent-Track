import express from "express";
import { isRecruiter } from "../middleware/isRecruiter.js";
import { getAllJobs, postJob } from "../controller/jobs.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";



const router=express.Router();


router.post("/post",isRecruiter,postJob);
router.get("/getalljobs",isAuthenticated,getAllJobs)






export default router;