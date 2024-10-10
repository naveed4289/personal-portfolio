const adminMiddleware=async(req,res,next)=>{
    const adminRole=await req.user.isAdmin;
    if(!adminRole){
        return res.status(200).json({message:"Access Denied"})
    }
    next();
}
module.exports=adminMiddleware; 