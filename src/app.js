const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model.
  const user = new User(req.body);
  // console.log("user is:", user);
  try {
    await user.save();
    res.send("USer Added Successfully..!");
  } catch (err) {
    res.status(400).send("Error Saving the User:" + err.message);
  }
});

// Get User by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.findOne({ emailId: userEmail });
    if (!users) {
      res.status(404).send("User not Found.");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

// Feed API - GET /feed - get all the users from the database.
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

// Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  // console.log(userId);
  try {
    // const user = await User.findByIdAndDelete({_id: userId});
    const user = await User.findByIdAndDelete(userId);
    // console.log(user);
    if (!user) {
      res.status(404).send("User not Found.");
    } else {
      res.send("User deleted successfully.");
    }
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

// Update data of the user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  // console.log(userId);
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({_id: userId}, data, {
      returnDocument: "after",
      runValidators: true,
    });
    // console.log(user);
    if (!user) {
      res.status(404).send("User not Found.");
    } else {
      res.send("User updated successfully.");
    }
  } catch (err) {
    // console.log("ERROR IS "+ err);
    res.status(400).send("UPDATE FAILED:"+ err.message);
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
