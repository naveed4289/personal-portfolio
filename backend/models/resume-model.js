const {Schema,model}=require("mongoose")

const resume=new Schema({
  
   resume:{
    type:String,
    required:true,
   },
     
  
    
})


const Resume=new model("Resume",resume);

module.exports=Resume