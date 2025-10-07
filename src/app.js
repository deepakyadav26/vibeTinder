const express = require("express");

const app = express();

app.get("/user/:userId/:name/:password", (req, res) => {
  // const userId = req.params.id;
  console.log(JSON.parse(JSON.stringify(req.params)));
  res.send({firstname: "Radhey", lastName: "Shyam" });
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777....");
});
