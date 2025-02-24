import { connection } from "../database/connectDb.js"




export const createJobRequirements=()=>{
    const query=`CREATE TABLE IF NOT EXISTS requirement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    requirements VARCHAR(255) NOT NULL,
    FOREIGN KEY (job_id) REFERENCES job(id)    
    )`
    connection.query(query,(err)=>{
        if(err)
        {
            console.log("Requirements Table Not Created."+err)
        }
        else{
            console.log("Requirements Table Created.")
        }
    })
}