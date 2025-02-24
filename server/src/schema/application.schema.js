import { connection } from "../database/connectDb.js"


export const createApllicationTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS application (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job INT NOT NULL,
    applicant INT NOT NULL,
    status ENUM("pending","accepted","rejected") DEFAULT "pending",
    FOREIGN KEY (job) REFERENCES job(id) ON DELETE CASCADE,
    FOREIGN KEY (applicant) REFERENCES user(id) ON DELETE CASCADE
    )`
    connection.query(query, (err) => {
        if (err) {
            console.log("Applications Table Not Created." + err)
        }
        else {
            console.log("Application Table Created.")
        }
    })
}