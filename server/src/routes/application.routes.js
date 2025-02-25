import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs } from "../controller/application.controller.js";




const router=express.Router();
router.get("/apply/:id",isAuthenticated,applyJob);
router.get("/get",isAuthenticated,getAppliedJobs);
router.get("/:id/applicants",isAuthenticated,getApplicants)





export default router;