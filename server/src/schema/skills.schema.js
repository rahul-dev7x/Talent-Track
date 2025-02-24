import { connection } from "../database/connectDb.js"




export const createSkillsTable=()=>{
    const query=`CREATE TABLE IF NOT EXISTS skill (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    skills VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
    )`
    connection.query(query,(err)=>{
        if(err)
        {
            console.log("Skill Table Not Created."+err)
        }
        else{
            console.log("Skill Table Created.")
        }
    })
}