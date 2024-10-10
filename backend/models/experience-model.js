const {Schema,model}=require("mongoose")

const experience=new Schema({
    date:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:false,
    },
     
  
     
}, { timestamps: true });


const Experience=new model("Experience",experience);

module.exports=Experience