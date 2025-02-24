import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDb } from "./database/connectDb.js";
import { createUserTable } from "./schema/user.schema.js";
import { createCompanyTable } from "./schema/company.schema.js";
import { createSkillsTable } from "./schema/skills.schema.js";
import { createJobRequirements } from "./schema/jobrequirements.schema.js";
import { createJobSchema } from "./schema/job.schema.js";
import { createApllicationTable } from "./schema/application.schema.js";

const app=express();
dotenv.config({});
const PORT=process.env.PORT || 9000;
const corsOptions={
    origin:process.env.FRONTEND_URL,
    methods:["GET","PUT","POST","UPDATE"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:true
}
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use(cookieParser());



app.get("/",(_,res)=>{
    return res.send("Yayy! Backend is Running.")
})

app.listen(PORT,()=>{
    console.log(`Backend Server is running on Port:${PORT}`);
    connectDb();
    createUserTable();
    createCompanyTable();
    createSkillsTable();
    createJobSchema();
    createJobRequirements();
    createApllicationTable();
})







