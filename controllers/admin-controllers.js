const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Course = require("../models/Course");

const SECRET = "S3CR3T";

// Function to sign up an admin
const signupAdmin = async (req, res) => {
  // Logic to sign up admin
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin Already Exists" });
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created Successfully", token });
  }
};

// Function to log in an admin
const loginAdmin = async (req, res) => {
  // Logic to log in admin
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({
      message: "Invalid username or password",
    });
  }
};

// Function to create a course as an admin
const createCourse = async (req, res) => {
  // Logic to create a course
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created Successfully", courseId: course.id });
};

// Function to edit a course as an admin
const editCourse = async (req, res) => {
  // Logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated Successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

// Function to get all courses as an admin
const getAllCourses = async (req, res) => {
  // Logic to get all courses
  const courses = await Course.find({});
  res.json({ courses });
};

module.exports = {
  signupAdmin,
  loginAdmin,
  createCourse,
  editCourse,
  getAllCourses,
};
