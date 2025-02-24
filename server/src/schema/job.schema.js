import { connection } from "../database/connectDb.js"




export const createJobSchema=()=>{
    const query=`CREATE TABLE IF NOT EXISTS job (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    salary DECIMAL(10,2) NOT NULL,
    experience_level INT NOT NULL,
    job_type VARCHAR(255),
    location VARCHAR(255),
    position INT NOT NULL,
    company_id INT,
    created_by INT,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES user(id) ON DELETE CASCADE
    )`
    connection.query(query,(err)=>{
        if(err)
        {
            console.log("Job Table Not Created."+err)
        }
        else{
            console.log("Job Table Created.")
        }
    })
}