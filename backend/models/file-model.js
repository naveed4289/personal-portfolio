const {Schema,model}=require("mongoose")

const file=new Schema({
    image:{
        type:String,
        required:true,
    }, 
  
     
  
    
})


const File=new model("File",file);

module.exports=File