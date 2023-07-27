const express=require("express");
const router=new express.Router();
const controllers=require("../Controllers/userController");
const galleryControllers=require("../Controllers/galleryControllers");
const courseController=require("../Controllers/courseController");
const jobController=require("../Controllers/jobController");
const eventController=require("../Controllers/eventController");
const alumniController=require("../Controllers/alumniController");
const contactController=require("../Controllers/contactInfoController");
const collgeInfoController=require("../Controllers/collegeInfoController");
const upload=require("../multerconfig/storageConfig");

//routes:-
router.post("/user/register",upload.single("user_profile"),controllers.userpost);
router.post("/user/login",controllers.userlogin);
router.post("/user/forgot-password",controllers.userforgotpassword);
router.get("/user/details",controllers.userget);
router.get("/user/:id",controllers.singleuserget);
router.put("/user/edit/:id",upload.single("user_profile"),controllers.useredit);
router.delete("/user/delete/:id",controllers.userdelete);
router.put("/user/status/:id",controllers.userstatus);
router.get("/userexport",controllers.userExport);

//gallery-routes:-
router.post("/gallery/add",upload.single("gallery_Image"),galleryControllers.gallerypost);
router.get("/gallery/get", galleryControllers.galleryget);
router.get("/gallery/get/:id",galleryControllers.singlegallaryget);
router.put("/gallery/edit/:id",upload.single("gallery_Image"),galleryControllers.gallaryedit);
router.delete("/gallery/delete/:id",galleryControllers.gallerydelete);


//course-routes:-
router.post("/course/add",courseController.coursepost);
router.get("/course/get", courseController.courseget);
router.get("/course/get/:id",courseController.singlecourseget);
router.put("/course/edit/:id",courseController.courseedit);
router.delete("/course/delete/:id",courseController.coursedelete);

//Jobs-routes:-
router.post("/job/add",jobController.jobpost);
router.get("/jobs/get",jobController.jobsget);
router.get("/job/get/:id",jobController.singlejobget);
router.put("/job/edit/:id",jobController.jobedit);
router.delete("/job/delete/:id",jobController.jobdelete);

//event-routes:-
router.post("/event/add",upload.single("banner"),eventController.eventpost);
router.get("/events/get",eventController.eventsget);
router.delete("/event/delete/:id",eventController.eventdelete);
router.get("/event/get/:id",eventController.singleEventget);
router.put("/event/edit/:id",upload.single("banner"),eventController.eventedit);

//alumni-routes:-
router.get("/alumnis/details",alumniController.getActiveUsers);
router.get("/alumnis/count",alumniController.countAlumnifun);

//contact-routes:-
router.post("/contact/post",contactController.contactpost);
router.get("/contact/get/:id",contactController.contactgetsingle);
router.post("/contact/edit/:id",contactController.contactUpdate);
router.get("/contact/get",contactController.contactget);


//college-routes:-
router.post('/college/post',collgeInfoController.collegepost);
router.get('/college/get',collgeInfoController.collegeget);
router.post("/college/edit/:id",collgeInfoController.collegeUpdate);
module.exports=router;