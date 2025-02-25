import express from "express";
import { isRecruiter } from "../middleware/isRecruiter.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js";
import upload from "../middleware/multer.js";


const router=express.Router();



router.post("/register",isRecruiter,registerCompany);
router.get("/get",isRecruiter,getCompany);
router.get("/get/:id",isRecruiter,getCompanyById);
router.put("/update/:id",isRecruiter,upload.single("logo"),updateCompany)






export default router;