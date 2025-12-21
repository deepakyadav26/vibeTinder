const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // Validation of Data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the Password
    // console.time("hash");
    const passwordHash = await bcrypt.hash(password, 8);
    // console.log(passwordHash);
    // console.timeEnd("hash");

    // Creating a new instance of the User model.
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added Successfully..!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const {emailId, password} = req.body;
    if(!validator.isEmail(emailId)){
      throw new Error("Invalid credentials");
    }
    const user = await User.findOne({emailId: emailId});
    if(!user) {
      throw new Error("Invalid credentials");
    }
    // console.log("User is before isPassword : ",  user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid) {
      res.send("Login Successfully!!");
    } 
    else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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
app.patch("/user/:userId", async (req, res) => {
  // console.log("before req.params : ", req.params);
  const userId = req.params?.userId;
  // console.log("userId is :" + userId);
  const data = req.body;
  // console.log("data is : ", data);
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Updates not Allowed.");
    }
    // if(data?.skills.length > 10) {
    //   throw new Error("Skills are not more than 10.");
    // }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
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
    res.status(400).send("UPDATE FAILED:" + err.message);
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
