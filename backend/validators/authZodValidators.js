const {z}=require("zod");

const signupSchema=z.object({
    username: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"name must be atleast 3 characters"})
    .max(255,{message:"name must not be more than 255 character"}),

    email:z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"email must be atleast 3 characters"})
    .max(255,{message:"email must not be more than 255 character"}),

    phone:z
    .string({required_error:"phone is required"})
    .trim()
    .min(10,{message:"phone must be atleast 10 characters"})
    .max(11,{message:"phone must not be more than 11 character"}),

    password:z
    .string({required_error:"password is required"})
    .min(6,{message:"password must be atleast 6 characters"})
    .max(1024,{message:"password must not be more than 1024 character"}),
})

const loginSchema=z.object({


    email:z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"email must be atleast 3 characters"})
    .max(255,{message:"email must not be more than 255 character"}),

  
    password:z
    .string({required_error:"password is required"})
    .min(6,{message:"password must be atleast 6 characters"})
    .max(1024,{message:"password must not be more than 1024 character"}),
})
module.exports={signupSchema,loginSchema};