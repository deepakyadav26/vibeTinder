const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if(!validator.isEmail(value)) {
          throw new Error("Invalid email address:" + value);
        }
      }, 
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if(!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "Gender must be male, female, or others",
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if(!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user..!",
      trim: true,
      minLength: 10,
      maxLength: 100,
    },
    skills: {
      type: [String],
      validate: [
        {
          validator: (v) => v.length <= 10,
          message: "Skills cannot be more than 10",
        },
        {
          validator: (v) => new Set(v).size === v.length,
          message: "Duplicate skills are not allowed",
        },
        {
          validator: (v) =>
            new Set(v.map((s) => s.toLowerCase())).size === v.length,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
