const express = require("express");

const app = express();


app.get("/user", (req, res) => {
  res.send({ firstname: "Radhey", lastName: "Shyam" });
});

app.post("/user", (req, res) => {
    // Logic to save database in DB
    res.send("Data Successfully saved to the dataase.");
});

app.delete("/user", (req, res) => {
    res.send("User Deleted Successfully.");
});

app.use("/test", (req, res) => {
  res.send("Hello, from the Server hello.! /test");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777....");
});
