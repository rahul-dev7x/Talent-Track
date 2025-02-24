import { connection } from "../database/connectDb.js"




export const createCompanyTable=()=>{
    const query=`CREATE TABLE IF NOT EXISTS company (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    logo VARCHAR(255),
    location VARCHAR(255),
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
    )`
    connection.query(query,(err)=>{
        if(err)
        {
            console.log("Company Table Not Created."+err)
        }
        else{
            console.log("Company Table Created.")
        }
    })
}