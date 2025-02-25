import express from "express";
import { isRecruiter } from "../middleware/isRecruiter.js";
import { getCompany, getCompanyById, registerCompany } from "../controller/company.controller.js";


const router=express.Router();



router.post("/register",isRecruiter,registerCompany);
router.get("/get",isRecruiter,getCompany);
router.get("/get/:id",isRecruiter,getCompanyById);






export default router;