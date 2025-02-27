import { connection } from "../database/connectDb.js";
import cloudinary from "../utills/cloudinary.js";
import dataUri from "../utills/dataUri.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        const recruiter_id = req.recruiterId;
        if (!companyName) {
            return res.status(400).json({ message: "Provide Company Name.", success: false, error: true });
        }

        const [existingCompany] = await connection.promise().query(
            "SELECT * FROM company WHERE name=? AND created_by=?", 
            [companyName, recruiter_id]
        );
        
        if (existingCompany.length > 0) {
            return res.status(200).json({ message: "This Company Is Already Registered.", success: false, error: true });
        }

        const [insertResult] = await connection.promise().query(
            "INSERT INTO company (name, created_by) VALUES (?, ?)",
            [companyName, recruiter_id]
        );
        
        const [companyDetails] = await connection.promise().query(
            "SELECT * FROM company WHERE id=? AND created_by=?", 
            [insertResult.insertId, recruiter_id]
        );
        
        return res.status(201).json({ message: "Company Registered Successfully.", success: true, error: false, data: companyDetails[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while Registering Company.", success: false, error: true });
    }
};

export const getCompany = async (req, res) => {
    try {
        const recruiter_id = req.recruiterId;
        if (!recruiter_id) {
            return res.status(401).json({ message: "User Unauthenticated.", success: false, error: true });
        }

        const [companies] = await connection.promise().query(
            "SELECT * FROM company WHERE created_by=?", 
            [recruiter_id]
        );
        
        if (companies.length === 0) {
            return res.status(400).json({ message: "No Companies Available.", success: false, error: true });
        }
        //console.log(compnaies)
        return res.status(200).json({ message: "All Companies Found Successfully.", success: true, error: false, data: companies });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while trying to get companies.", success: false, error: true });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const recruiter_id = req.recruiterId;
        if (!id) {
            return res.status(400).json({ message: "Please Provide Company Id.", success: false, error: true });
        }

        const [company] = await connection.promise().query(
            "SELECT * FROM company WHERE id=? AND created_by=?", 
            [id, recruiter_id]
        );
        
        if (company.length === 0) {
            return res.status(400).json({ message: "No Company Found.", success: false, error: true });
        }
        
        return res.status(200).json({ message: "Company Details Found Successfully.", success: true, error: false, data: company});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while trying to get company information.", success: false, error: true });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const company_id = req.params.id;
        const recruiter_id = req.recruiterId;
        const logo = req.file;
        let updateFields = [];
        let updateValues = [];

        if (name) updateFields.push("name=?"), updateValues.push(name);
        if (description) updateFields.push("description=?"), updateValues.push(description);
        if (website) updateFields.push("website=?"), updateValues.push(website);
        if (location) updateFields.push("location=?"), updateValues.push(location);
        
        if (logo) {
            const fileUri = dataUri(logo);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            if (cloudResponse) {
                updateFields.push("logo=?");
                updateValues.push(cloudResponse.secure_url);
            }
        }
        
        updateValues.push(company_id, recruiter_id);
        
        const [existingCompany] = await connection.promise().query(
            "SELECT * FROM company WHERE id=? AND created_by=?", 
            [company_id, recruiter_id]
        );
        
        if (existingCompany.length === 0) {
            return res.status(400).json({ message: "No Company Found.", success: false, error: true });
        }
        
        if (updateFields.length === 0) {
            return res.status(400).json({ message: "There is nothing to update.", success: false, error: true });
        }
        
        await connection.promise().query(
            `UPDATE company SET ${updateFields.join(", ")} WHERE id=? AND created_by=?`, 
            updateValues
        );
        
        return res.status(200).json({ message: "Company Updated Successfully.", success: true, error: false });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while trying to update company details.", success: false, error: true });
    }
};
