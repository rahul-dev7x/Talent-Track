import { connection } from "../database/connectDb.js";
import cloudinary from "../utills/cloudinary.js";
import dataUri from "../utills/dataUri.js";





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


export const getCompany = (req, res) => {
    try {
        const recruiter_id = req.recruiterId;
        if (!recruiter_id) {
            return res.status(401).json({ message: "User Unauthenticated.", success: false, error: true })
        }
        const getCompanies = `SELECT * FROM company WHERE created_by=?`;
        connection.query(getCompanies, [recruiter_id], (err, result) => {
            if (err) {
                return res.status(400).json({ message: "Database error.", success: false, error: true })
            }
            if (result.length === 0) {
                return res.status(400).json({ message: "No Companies Available.", success: false, error: true })
            }
            return res.status(200).json({ message: "All Jobs Created By Recruiter Found Success.", success: false, error: true, data: result })
        })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error while trying to get companies.", success: false, error: true })
    }
}




export const getCompanyById = (req, res) => {
    try {
        const { id } = req.params;
        const recruiter_id = req.recruiterId;
        if (!id) {
            return res.status(400).json({ message: "Please Provide Company Id.", success: false, error: true })
        }
        const getCompanyByIdQuery = `SELECT * FROM company WHERE id=? AND created_by=?`;
        connection.query(getCompanyByIdQuery, [id, recruiter_id], (err, result) => {
            if (err) {
                return res.status(400).json({ message: "Database error.", success: false, error: true })
            }
            if (result.length === 0) {
                return res.status(400).json({ message: "No Jobs Found.", success: false, error: true })
            }
            return res.status(200).json({ message: "Job Details Found Success.", success: true, error: false, data: result })
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while trying to get company Information.", success: false, error: true })
    }
}




export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const company_id = req.params.id;
        const recruiter_id = req.recruiterId;
        const logo = req.file;
        let updateFields = [];
        let updateValues = [];

        if (name) {
            updateFields.push("name=?");
            updateValues.push(name);
        }
        if (description) {
            updateFields.push("description=?");
            updateValues.push(description);
        }
        if (website) {
            updateFields.push("website=?");
            updateValues.push(website);
        }
        if (location) {
            updateFields.push("location=?");
            updateValues.push(location)
        }
        if (logo) {
            const fileUri = dataUri(logo);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            if (cloudResponse) {
                updateFields.push("logo=?");
                updateValues.push(cloudResponse.secure_url);
            }
        }
        updateValues.push(company_id);
        updateValues.push(recruiter_id);
        // if (updateFields.length === 0) {
        //     return res.status(400).json({ message: "There is nothing to update.", success: false, error: true })
        // }
        const isJobAvailable = `SELECT * FROM company WHERE id=? AND created_by=?`;
        connection.query(isJobAvailable, [company_id, recruiter_id], (err, result) => {
            if (err) {
                return res.status(400).json({ message: "Database error.", success: false, error: true })
            }
            if (result.length === 0) {
                return res.status(400).json({ message: "No Job Found.", success: false, error: true })
            }
            if (updateFields.length === 0) {
                return res.status(400).json({ message: "There is nothing to update.", success: false, error: true })
            }
            const updateQuery = `UPDATE company SET ${updateFields.join(", ")} WHERE id=? AND created_by=?`;
            connection.query(updateQuery, updateValues, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({ message: "Database error.", success: false, error: true })
                }
                //console.log("update_results", result);
                return res.status(200).json({message:"Company Updated Successfully.",success:true,error:false})
            })
        })


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while trying to update company details.", success: false, error: true })
    }
}