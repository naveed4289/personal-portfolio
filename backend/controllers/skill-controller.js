const Skill=require("../models/skill-model")
const SkillYear=require("../models/skillYear-model")
const Experience=require("../models/experience-model")
const Project=require("../models/project-model")

const addSkill=async(req,res)=>{
    try {
        console.log("Request Body:", req.body);
        console.log("File:", req.file);

        const skill = new Skill({
            name: req.body.name,
            percentage: req.body.percentage,
            icon: req.file.path, // Assuming you're storing the file path
        });

        await skill.save();
        res.status(201).json({ message: "Skill added successfully", skill });
    } catch (error) {
        console.error("AddSkill Error:", error);
        res.status(500).json({ error: "Failed to add skill" });
    }
}
const deleteSkill=async(req,res)=>{
    try {
        const id = req.params.id;
        const deleteSkill = await Skill.deleteOne({_id: id});
        if (deleteSkill.deletedCount === 0) {
            return res.status(404).json({ message: "Skill not found" });
        }
        return res.status(200).json({ message: "Skill deleted successfully" });
    } catch (error) {
        next(error);
    }
}
const getSkill=async(req,res)=>{
    try {
       
        const response=await Skill.find();
        if(!response){
            return res.status(404).json({message:"No Skill find"})
        }
        return res.status(200).json({response})

    } catch (error) {
        console.log(error)
    }
}
const updateSkill=async(req,res)=>{
    try {
        const id = req.params.id;
        const updateSkillData = req.body;
        
        // If a new image file is provided
        if (req.file) {
            updateSkillData.image = req.file.path;
        }

        const updatedSkill = await Skill.updateOne({ _id: id }, { $set: updateSkillData });

        if (updatedSkill.modifiedCount === 0) {
            return res.status(404).json({ message: "Skill not found or no changes made" });
        }

        return res.status(200).json({ updatedSkill });
    } catch (error) {
        next(error); 
    }
}
const addSkillYear = async (req, res) => {
    try {
        const response = req.body;

        // Ensure response has the necessary fields
        if (!response.yearsOfExperience || !response.completedProjects || !response.clientSatisfaction) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSkillYear = await SkillYear.create(response);
        console.log("Data saved in SkillYear", newSkillYear);
        
        return res.status(201).json({ message: "Skill year added successfully", newSkillYear });
    } catch (error) {
        console.error("Error in adding skill year:", error);
        return res.status(500).json({ message: "An error occurred while adding the skill year." });
    }
};


const getSkillYear = async (req, res) => {
    try {
        const response = await SkillYear.find();

        if (response.length === 0) {
            return res.status(404).json({ message: "No SkillYears found" });
        }

        return res.status(200).json({ response });
    } catch (error) {
        console.error("Error in retrieving skill years:", error);
        return res.status(500).json({ message: "An error occurred while retrieving the skill years." });
    }
};

const updateSkillYear = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const updatedSkillYear = await SkillYear.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

        if (!updatedSkillYear) {
            return res.status(404).json({ message: "Skill not found" });
        }

        return res.status(200).json({ message: "Skill updated successfully", updatedSkillYear });
    } catch (error) {
        console.error("Error in updating skill year:", error);
        return res.status(500).json({ message: "An error occurred while updating the skill year." });
    }
}
const addExperience = async (req, res) => {
    try {
        const response = req.body;

        // Ensure response has the necessary fields
        if (!response.date || !response.title || !response.company) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExperience = await Experience.create(response);
        console.log("Data saved in Experience", newExperience);
        
        return res.status(201).json({ message: "Experience  added successfully", newExperience });
    } catch (error) {
        console.error("Error in adding Experience:", error);
        return res.status(500).json({ message: "An error occurred while adding the Experience ." });
    }
};


const getExperience = async (req, res) => {
    try {
        // Fetch experiences and sort by createdAt in descending order
        const response = await Experience.find().sort({ createdAt: -1 });

        // Check if any experiences were found
        if (response.length === 0) {
            return res.status(404).json({ message: "No Experience found" });
        }

        // Return the sorted experiences
        return res.status(200).json({ response });
    } catch (error) {
        console.error("Error in retrieving Experience:", error);
        return res.status(500).json({ message: "An error occurred while retrieving the Experience." });
    }
};

const deleteExperience=async(req,res)=>{
    try {
        const id = req.params.id;
        const deleteExperience = await Experience.deleteOne({_id: id});
        if (deleteExperience.deletedCount === 0) {
            return res.status(404).json({ message: "Experience not found" });
        }
        return res.status(200).json({ message: "Experience deleted successfully" });
    } catch (error) {
        next(error);
    }
}
const updateExperience = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const updatedExperience = await Experience.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

        if (!updatedExperience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        return res.status(200).json({ message: "Experience updated successfully", updatedExperience });
    } catch (error) {
        console.error("Error in updating Experience:", error);
        return res.status(500).json({ message: "An error occurred while updating the Experience." });
    }
}


const addProject=async(req,res)=>{
    try {
        console.log("Request Body:", req.body);
        console.log("File:", req.file);

        const project = new Project({
            name: req.body.name,
            desc: req.body.desc,
            image: req.file.path, // Assuming you're storing the file path
        });

        await project.save();
        res.status(201).json({ message: "project added successfully", project });
    } catch (error) {
        console.error("Addproject Error:", error);
        res.status(500).json({ error: "Failed to add project" });
    }
}
const deleteProject=async(req,res)=>{
    try {
        const id = req.params.id;
        const deleteSkill = await Project.deleteOne({_id: id});
        if (deleteSkill.deletedCount === 0) {
            return res.status(404).json({ message: "project not found" });
        }
        return res.status(200).json({ message: "project deleted successfully" });
    } catch (error) {
        next(error);
    }
}
const getProject=async(req,res)=>{
    try {
       
        const response=await Project.find();
        if(!response){
            return res.status(404).json({message:"No project find"})
        }
        return res.status(200).json({response})

    } catch (error) {
        console.log(error)
    }
}
const updateProject=async(req,res)=>{
    try {
        const id = req.params.id;
        const updateSkillData = req.body;
        
        // If a new image file is provided
        if (req.file) {
            updateSkillData.image = req.file.path;
        }

        const updatedSkill = await Project.updateOne({ _id: id }, { $set: updateSkillData });

        if (updatedSkill.modifiedCount === 0) {
            return res.status(404).json({ message: "project not found or no changes made" });
        }

        return res.status(200).json({ updatedSkill });
    } catch (error) {
        next(error); 
    }
}
module.exports={addSkill,deleteSkill,getSkill,updateSkill,getSkillYear,updateSkillYear,addSkillYear,addExperience,updateExperience,getExperience,deleteExperience,updateProject,addProject,getProject,deleteProject}