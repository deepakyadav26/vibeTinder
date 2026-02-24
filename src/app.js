const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

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
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // console.log("before password");
    // console.log("User is before isPassword : ",  user);
    const isPasswordValid = await user.validatePassowrd(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      // Create a JWT Token
      // const token = await jwt.sign({ _id: user._id }, "Alpha@123", {
      //   expiresIn: "7d",
      // });
      // console.log(token);

      // Add the token to cookie and send the response back to the user.
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
        secure: true,
      });
      res.send("Login Successfully!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  // Sending a Connection Request
  console.log("Sending a connection Request.");

  res.send(user.firstName + " sent the connection request..");
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
      ALLOWED_UPDATES.includes(k),
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
    console.log("Database Connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777....");
      console.log("connect")
    });
  })
  .catch((err) => {
    console.error("Database Can not be connected.!!");
  });
