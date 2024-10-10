const {Schema,model}=require("mongoose")

const project=new Schema({
    image:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
     
  
    
})


const Project=new model("Project",project);

module.exports=Project