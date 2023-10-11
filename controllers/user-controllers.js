const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Course = require("../models/Course");

const SECRET = "S3CR3T";

// Function to sign up a user
const signupUser = async (req, res) => {
  // Logic to sign up user
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
};

// Function to log in a user
const loginUser = async (req, res) => {
  // Logic to log in user
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
};

// Function to list all courses for a user
const listCourses = async (req, res) => {
  // Logic to list all courses
  const courses = await Course.find({ published: true });
  res.json({ courses });
};

// Function to purchase a course as a user
const purchaseCourse = async (req, res) => {
  // Logic to purchase a course
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

// Function to view purchased courses for a user
const viewPurchasedCourses = async (req, res) => {
  // Logic to view purchased courses
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  listCourses,
  purchaseCourse,
  viewPurchasedCourses,
};
