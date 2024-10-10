const {Schema,model}=require("mongoose")

const userSkill=new Schema({
    icon:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    percentage:{
        type:String,
        required:true,
    },
     
  
    
})


const Skill=new model("Skill",userSkill);

module.exports=Skill