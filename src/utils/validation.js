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

module.exports = {
    validateSignUpData,
};
