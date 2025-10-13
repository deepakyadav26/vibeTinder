const express = require("express");
const { adminAuth, userAuth, studentAuth } = require("./middlewares/auth");
const app = express();

// Handle Auth Middleware for all Get Post , ... request
app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully.");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User Get Data Send Successfullly");
});

app.get("/student", studentAuth, (req, res) => {
  res.send("Welcome Students");
})
 
app.get("/admin/getAllData", (req, res) => {
  // Logic of fetching all data.
  res.send("Get Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("USer Deleted.");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777....");
});
