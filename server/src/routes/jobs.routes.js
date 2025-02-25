import express from "express";
import { isRecruiter } from "../middleware/isRecruiter.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controller/jobs.controller.js";




const router=express.Router();


router.post("/post",isRecruiter,postJob);
router.get("/getalljobs",getAllJobs);
router.get("/get/:id",getJobById);
router.get("/getadminjobs",isRecruiter,getAdminJobs)






export default router;