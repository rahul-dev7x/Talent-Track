import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"

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



app.get("/",(_,res)=>{
    return res.send("Yayy! Backend is Running.")
})

app.listen(PORT,()=>{
    console.log(`Backend Server is running on Port:${PORT}`)
})







