import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDb } from "./database/connectDb.js";
import { createUserTable } from "./schema/user.schema.js";
import { createCompanyTable } from "./schema/company.schema.js";
import { createJobRequirements } from "./schema/jobrequirements.schema.js";
import { createJobSchema } from "./schema/job.schema.js";
import { createApllicationTable } from "./schema/application.schema.js";
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/jobs.routes.js";
import applicationRoutes from "./routes/application.routes.js"

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


app.use("/api/v1/user",userRoutes);
app.use("/api/v1/company",companyRoutes);
app.use("/api/v1/job",jobRoutes);
app.use("/api/v1/application",applicationRoutes)



app.get("/",(_,res)=>{
    return res.send("Yayy! Backend is Running.")
})

app.listen(PORT,()=>{
    console.log(`Backend Server is running on Port:${PORT}`);
    connectDb();
    createUserTable();
    createCompanyTable();
    createJobSchema();
    createJobRequirements();
    createApllicationTable();
})







