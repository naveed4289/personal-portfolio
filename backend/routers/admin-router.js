const express = require('express');
const router = express.Router();
const UserData=require("../controllers/admin-controller")
const multer = require("multer");
const path = require("path");
const userDetail = require('../models/admin-model');
const skill=require("../controllers/skill-controller")
//for userDetail
router.route("/addUser").post(UserData.UserForm)
router.route("/get/userData").get(UserData.getUserForm)
router.route("/userData/:id").get(UserData.getUserFormById)
router.route("/update/userData/:id").patch(UserData.updateUserById)
router.route("/userForm/delete/:id").delete(UserData.deleteUserFormById);

//for role
router.route("/addRole").post(UserData.addRole)
router.route("/getRole").get(UserData.getRole)
router.route("/role/delete/:id").delete(UserData.deleteRole);

//for images

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    }, 
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        return cb(new Error("Error: Images Only!"));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } 
});


router.route("/addImage").post( upload.single('image'), UserData.AddImage);


router.route("/image/data").get(UserData.getAllImage)

router.route('/image/:id').get(UserData.getImageById);

router.route('/image/update/:id').patch( upload.single('image'), UserData.UpdateImageById);

router.route("/addResume").post( upload.single('resume'), UserData.AddResume);


router.route("/resume/data").get(UserData.getAllResume)

router.route('/resume/:id').get(UserData.getResumeById);

router.route('/resume/update/:id').patch( upload.single('resume'), UserData.UpdateResumeById);


// for skill
router.route("/addSkill").post(upload.single('image'), skill.addSkill);
router.route("/deleteSkill/:id").delete(skill.deleteSkill);
router.route("/getSkill").get(skill.getSkill);
router.route("/updateSkill").patch(upload.single('image'), skill.updateSkill);


router.route("/addSkillYear").post(skill.addSkillYear);
router.route("/getSkillYear").get(skill.getSkillYear);
router.route("/updateSkillYear/:id").patch(skill.updateSkillYear);

//for experience
router.route("/addExperience").post(skill.addExperience);
router.route("/getExperience").get(skill.getExperience);
router.route("/deleteExperience/:id").delete(skill.deleteExperience);
router.route("/updateExperience/:id").patch(skill.updateExperience);

//project

// for skill
router.route("/addProject").post(upload.single('image'), skill.addProject);
router.route("/deleteProject/:id").delete(skill.deleteProject);
router.route("/getProject").get(skill.getProject);
router.route("/updateProject").patch(upload.single('image'), skill.updateProject);

module.exports = router;