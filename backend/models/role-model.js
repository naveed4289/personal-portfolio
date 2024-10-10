const {Schema,model}=require("mongoose")

const userRole=new Schema({
    role:{
        type:String,
        required:true,
    },
     
  
    
})


const Role=new model("Role",userRole);

module.exports=Role