const express = require("express");
const userController = require("../controllers/user-controllers");
const { authenticateJwt } = require("../authenticate.js");

const router = express.Router();

// User routes
router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);
router.get("/courses", authenticateJwt, userController.listCourses);
router.post(
  "/courses/:courseId",
  authenticateJwt,
  userController.purchaseCourse
);
router.get(
  "/purchasedCourses",
  authenticateJwt,
  userController.viewPurchasedCourses
);

module.exports = router;
