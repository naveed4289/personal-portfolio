const {Schema,model}=require("mongoose")

const skillYear=new Schema({
    yearsOfExperience:{
        type:String,
        required:true,
    },
    completedProjects:{
        type:String,
        required:true,
    },
    clientSatisfaction:{
        type:String,
        required:true,
    },
     
  
     
})


const SkillYear=new model("SkillYear",skillYear);

module.exports=SkillYear