const express = require("express");
const adminController = require("../controllers/admin-controllers");
const { authenticateJwt } = require("../authenticate.js");

const router = express.Router();

// Admin routes
router.post("/signup", adminController.signupAdmin);
router.post("/login", adminController.loginAdmin);
router.post("/courses", authenticateJwt, adminController.createCourse);
router.put("/courses/:courseId", authenticateJwt, adminController.editCourse);
router.get("/courses", authenticateJwt, adminController.getAllCourses);

module.exports = router;
