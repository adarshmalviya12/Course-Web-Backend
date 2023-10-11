const express = require("express");
const mongoose = require("mongoose");
const app = express();

const adminRoutes = require("./routes/admin-routes");
const userRoutes = require("./routes/user-routes");

app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

mongoose.connect(
  "mongodb+srv://adarshmalviya1199:pass123@cluster0.8rpgoac.mongodb.net/Courses"
);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
