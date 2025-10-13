const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the Route User 1 ");
    // res.send("Response.1.!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the Route User 2 ");
    // res.send("Response.2.!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the Route User 3 ");
    // res.send("Response.3.!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the Route User 4 ");
    // res.send("Response.4.!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the Route User 5 ");
    res.send("Response.5.!");
  }
);

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777....");
});
