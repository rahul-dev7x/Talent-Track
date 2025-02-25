import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { applyJob, getAppliedJobs } from "../controller/application.controller.js";




const router=express.Router();
router.get("/apply/:id",isAuthenticated,applyJob);
router.get("/get",isAuthenticated,getAppliedJobs)





export default router;