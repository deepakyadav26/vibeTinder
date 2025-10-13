const express = require("express");
const app = express();

app.use("/", (err, req, res, next) => {
  if(err) {
    res.status(500).send("Something went wrong..!")
  }
})

app.get("/getUserData", (req, res) => {
  try {
throw new Error("galat baat hai..");
  res.send("USer Data Sent.");
  } catch(err) {
    res.status(500).send("Some error arises contact your support team..!")
  }
});

app.use("/", (err, req, res, next) => {
  if(err) {
    res.status(500).send("Something went wrong..!")
  }
});


app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777....");
});
