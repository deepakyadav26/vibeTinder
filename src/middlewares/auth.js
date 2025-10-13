const adminAuth = (req, res, next) => {
  console.log("Admin Auth is getting checked...");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized admin request.");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User Auth is getting checked...");
  const token = "xyzab";
  const isAdminAuthorized = token === "xyza";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized user request.");
  } else {
    next();
  }
};

const studentAuth = (req, res, next) => {
  console.log("Student Auth is getting checked...");
  const token = "stu";
  const isStudent = token === "stu";
  if (!isStudent) {
    res.status(401).send("Unauthorized student, try again");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
  studentAuth,
};
