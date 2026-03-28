const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please enter valid Name.");
  } else if (firstName.length < 3 || firstName.length > 50) {
    throw new Error("FirstName should be 3-50 characters.");
  } else if (lastName.length < 3 || lastName.length > 50) {
    throw new Error("LastName should be 3-50 characters.");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a Strong Password!");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  // Optional Enhancement: Check if body is totally empty
  if (Object.keys(req.body).length === 0) {
    // return false; 
    throw new Error("No data provided to edit");
  }

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  if (!isEditAllowed) {
    throw new Error("Invalid fields found in request");
  }

  // Optional Enhancement: Validate individual fields

    if (req.body.firstName && (req.body.firstName.length < 3 || req.body.firstName.length > 50)) {
    throw new Error("FirstName should be between 3 and 50 characters");
  }

  if (req.body.lastName && (req.body.lastName.length < 3 || req.body.lastName.length > 50)) {
    throw new Error("LastName should be between 3 and 50 characters");
  }

  if (req.body.age && (req.body.age < 18 || req.body.age > 100)) {
    throw new Error("Age must be between 18 and 100");
  }

  if (req.body.gender && !["male", "female", "others"].includes(req.body.gender)) {
    throw new Error("Gender must be male, female, or others");
  }

  if (req.body.photoUrl && !validator.isURL(req.body.photoUrl)) {
    throw new Error("Invalid Photo URL");
  }

  if (req.body.about && (req.body.about.length < 10 || req.body.about.length > 100)) {
    throw new Error("About must be between 10 and 100 characters");
  }

  if (req.body.skills) {
    if (!Array.isArray(req.body.skills)) {
      throw new Error("Skills must be an array");
    }
    if (req.body.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    if (new Set(req.body.skills).size !== req.body.skills.length) {
      throw new Error("Duplicate skills are not allowed");
    }
    if (new Set(req.body.skills.map((s) => s.toLowerCase())).size !== req.body.skills.length) {
      throw new Error("Duplicate skills are not allowed (case-insensitive)");
    }
  }

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
