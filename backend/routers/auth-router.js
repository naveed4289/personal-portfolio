const express=require("express")
const router=express.Router();
const authController=require("../controllers/auth-controller")
const validate=require("../middlewares/validate-middleware")
const{signupSchema,loginSchema}=require("../validators/authZodValidators")
const authMiddleware=require("../middlewares/auth-middleware")
const adminMiddleware=require("../middlewares/admin-middleware")


 

//-----Home
router.route("/").get(authController.home);

//------:1:--Registeration
router.route("/register").post(validate(signupSchema),authController.Register);

//------:2:--Login
router.route("/login").post(validate(loginSchema),authController.Login);


//-------3:user
router.route("/user").get(authMiddleware,authController.user);

router.route('/show/:id').get(authMiddleware,adminMiddleware, authController.getSingleUser);
router.route('/show/update/:id').patch(authMiddleware,adminMiddleware, authController.updateUserById);


// router.route("/update").put(authMiddleware,authController.updateProfile );

// Request password reset
router.route("/forgot-password").post(authController.forgotPassword);

// Reset password

router.route("/reset-password/:token").post(authController.resetPassword);



module.exports = router;
 

