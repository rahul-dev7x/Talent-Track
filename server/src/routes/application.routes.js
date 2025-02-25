import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { applyJob } from "../controller/application.controller.js";




const router=express.Router();
router.get("/apply/:id",isAuthenticated,applyJob)





export default router;