import { connection } from "../database/connectDb.js"




export const createUserTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM("student","recruiter") NOT NULL DEFAULT "student",
    profile_bio TEXT,
    profile_resume VARCHAR(255),
    resume_original_name VARCHAR(255),
    profile_photo VARCHAR(255) DEFAULT '',
     company_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE 
   
    )
    `
    connection.query(query, (err) => {
        if (err) {
            console.log("User Table Not Created." + err)
        }
        else {
            console.log("User Table Created Successfully.")
        }
    })
}

