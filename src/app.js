const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model.
  const user = new User({
    firstName: "Radhey",
    lastName: "Singh",
    emailId: "radhey@gmail.com",
    password: "radhey@123",
  });
  try {
    await user.save();
    res.send("USer Added Successfully..!");
  } catch (err) {
    res.status(400).send("Error Saving the User:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777....");
    });
  })
  .catch((err) => {
    console.error("Database Can not be connected.!!");
  });
