import mysql from "mysql2";
import dotenv from "dotenv";



dotenv.config({})

export const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME

})

export const connectDb = async () => {
    try {
        await connection.connect();
        console.log(`Database Connected and running on Port:${process.env.DB_PORT}`)

    }
    catch (error) {
        console.log("Database Not Connected" + error)
    }
}