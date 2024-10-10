const express=require("express")
const router=express.Router();
const contactController=require("../controllers/contact-controller")
const authMiddleware=require("../middlewares/auth-middleware")
const adminMiddleware=require("../middlewares/admin-middleware")
//contact router

router.route("/contact").post(contactController.contactForm);


router.route('/contacts/delete/:id').delete(authMiddleware,adminMiddleware,contactController.deleteContactById);

router.route('/get/contacts').get(authMiddleware, adminMiddleware, contactController.getAllContacts);

module.exports=router; 