const {Schema,model}=require("mongoose")

const userDetailSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true, 
    }, 
    phone:{
        type:String,
        required:true,
    },
    intro:{
        type:String,
        required:true,
    },
    overview:{
        type:String,
        required:true,
    },
   
    
})


const userDetail=new model("userDetail",userDetailSchema);

module.exports=userDetail