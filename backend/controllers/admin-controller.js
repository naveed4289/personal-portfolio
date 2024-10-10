const userDetail=require("../models/admin-model")
const Role =require("../models/role-model")
const File=require("../models/file-model")
const Resume=require("../models/resume-model")

//for userDetail
const UserForm=async(req,res)=>{
    try {
        const response=req.body;
        await userDetail.create(response);
        console.log("data saved in userForm")
    } catch (error) {
        console.error("Error in user form processing:", error);
    }
}
const deleteUserFormById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteProduct = await userDetail.deleteOne({_id: id});
        if (deleteProduct.deletedCount === 0) {
            return res.status(404).json({ message: "form not found" });
        }
        return res.status(200).json({ message: "form deleted successfully" });
    } catch (error) {
        next(error);
    }
}
const getUserForm=async(req,res)=>{
    try {
       
        const response=await userDetail.find();
        if(!response){
            return res.status(404).json({message:"No user find"})
        }
        return res.status(200).json({response})

    } catch (error) {
        console.log(error)
    }
}
const getUserFormById=async(req,res,next)=>{
    try {
        const id = req.params.id;
        const data=await userDetail.findOne({_id:id})
        return res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}
const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        
        const updatedUser = await userDetail.findByIdAndUpdate(id, { $set: updatedData}, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        next(error);
    }
};
//for role

const addRole = async (req, res) => {
    try {
        const { role } = req.body;

        // Check if role is provided and not empty
        if (!role || role.trim() === "") {
            return res.status(400).json({ message: "Role is required." });
        }

        await Role.create({ role });
        console.log("data saved in Role");
        res.status(201).json({ message: "Role added successfully!" });
    } catch (error) {
        console.error("Error in user Role processing:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
const deleteRole = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteProduct = await Role.deleteOne({_id: id});
        if (deleteProduct.deletedCount === 0) {
            return res.status(404).json({ message: "Role not found" });
        }
        return res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        next(error);
    }
}
const getRole=async(req,res)=>{
    try {
       
        const response=await Role.find();
        if(!response){
            return res.status(404).json({message:"No Role find"})
        }
        return res.status(200).json({response})

    } catch (error) {
        console.log(error)
    }
}

const AddImage = async (req, res, next) => {
    try {
        console.log("Request Body:", req.body);
        console.log("File:", req.file);

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = new File({
            image: req.file.path,
        });

        await file.save();
        res.status(201).json({ message: "File added successfully", file });
    } catch (error) {
        console.error("AddImage Error:", error);
        res.status(500).json({ error: "Failed to add image" });
    }
};

const getAllImage=async(req,res)=>{
    try {
       
        const response=await File.find();
        if(!response){
            return res.status(404).json({message:"No File find"})
        }
        return res.status(200).json({response})

    } catch (error) {
        console.log(error)
    }
}
const getImageById=async(req,res,next)=>{
    try {
        const id = req.params.id;
        const data=await File.findOne({_id:id})
        return res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
} 
const UpdateImageById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateProductData = req.body;
        
        // If a new image file is provided
        if (req.file) {
            updateProductData.image = req.file.path;
        }

        const updatedData = await File.updateOne({ _id: id }, { $set: updateProductData });

        if (updatedData.modifiedCount === 0) {
            return res.status(404).json({ message: "Product not found or no changes made" });
        }

        return res.status(200).json({ updatedData });
    } catch (error) {
        next(error);
    }
};

const AddResume = async (req, res, next) => {
    try {
        console.log("Request Body:", req.body); // This will show the non-file fields
        console.log("File:", req.file); // Make sure to access req.file, not req.resume

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const resume = new Resume({
            resume: req.file.path, // Correctly reference req.file
        });

        await resume.save();
        res.status(201).json({ message: "File added successfully", resume });
    } catch (error) {
        console.error("AddResume Error:", error);
        res.status(500).json({ error: "Failed to add resume" });
    }
};


const getAllResume=async(req,res)=>{
    try {
       
        const response=await Resume.find();
        if(!response){
            return res.status(404).json({message:"No File find"})
        }
        return res.status(200).json({response})

    } catch (error) {
        console.log(error)
    }
}
// const getResumeById=async(req,res,next)=>{
//     try {
//         const id = req.params.id;
//         const data=await Resume.findOne({_id:id})
//         return res.status(200).json({ data });
//     } catch (error) {
//         next(error);
//     }
// } 

// const getResumeById = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const resume = await Resume.findById(id); // Use findById for better readability

//         if (!resume || !resume.resume) {
//             return res.status(404).json({ message: "Resume not found" });
//         }

//         const resumePath = resume.resume;

//         // Extract the file extension from the file path
//         const fileExtension = resumePath.split('.').pop();
//         const fileName = `resume.${fileExtension}`; // Set the filename for download

//         // Send the file for download
//         res.download(resumePath, fileName);
//     } catch (error) {
//         console.error("Error in getResumeById:", error); // Log the error for debugging
//         next(error); // Pass the error to the error handling middleware
//     }
// };

const getResumeById = async (req, res, next) => {
    try {
        console.log("Request Parameters:", req.params); // Log request parameters

        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "No resume ID provided" });
        }

        const resume = await Resume.findById(id);

        if (!resume || !resume.resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        const resumePath = resume.resume;
        const fileExtension = resumePath.split('.').pop();
        const fileName = `resume.${fileExtension}`;

        res.download(resumePath, fileName);
    } catch (error) {
        console.error("Error in getResumeById:", error);
        next(error);
    }
};


const UpdateResumeById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateProductData = {};

        // If a new resume file is provided
        if (req.file) {
            updateProductData.resume = req.file.path; // Correctly reference req.file
        }

        const updatedData = await Resume.updateOne({ _id: id }, { $set: updateProductData });

        if (updatedData.modifiedCount === 0) {
            return res.status(404).json({ message: "Resume not found or no changes made" });
        }

        return res.status(200).json({ updatedData });
    } catch (error) {
        next(error);
    }
};





module.exports={UserForm,getUserForm,getUserFormById,updateUserById,deleteUserFormById,addRole,getRole,deleteRole,AddImage,getImageById,UpdateImageById,getAllImage,UpdateResumeById,getResumeById,getAllResume,AddResume}