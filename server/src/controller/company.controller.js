import { connection } from "../database/connectDb.js";





export const registerCompany = async (req, res) => {
    try {

        const { companyName } = req.body;
        const recruiter_id = req.recruiterId;
        if (!companyName) {
            return res.status(400).json({ message: "Provide Company Name.", success: false, error: true })
        }
        const isRegistered = `SELECT * FROM company WHERE name=? AND created_by=?`
        connection.query(isRegistered, [companyName, recruiter_id], (err, result) => {
            if (err) {

                return res.status(400).json({ message: "Database error.", success: false, error: true })
            }
            if (result.length > 0) {
                return res.status(200).json({ message: "This Company Is Already Registered.", success: false, error: true })
            }
            const regCompany = `INSERT INTO company (name,created_by) VALUES (?,?)`;
            connection.query(regCompany, [companyName, recruiter_id], (err, result) => {
                if (err) {
                    return res.status(400).json({ message: "Database error.", success: false, error: true })
                }
                //console.log("reg_company",result);
                const getCompanyDetails = `SELECT * FROM company WHERE id=? AND created_by=?`
                connection.query(getCompanyDetails, [result.insertId, recruiter_id], (err, result) => {
                    if (err) {
                        return res.status(400).json({ message: "Database error.", success: false, error: true })
                    }
                    //console.log("company_details", result)
                    return res.status(201).json({ message: "Company Registered Successfully.", success: true, error: false, data: result[0] })
                })

            })
        })




    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while Registering Company.", success: false, error: true })
    }
}