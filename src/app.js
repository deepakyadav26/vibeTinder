const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send(`${req.method} |  ${req.url}  |  Welcome, to Dashoard.`);
});


app.get("/hello", (req, res) => {
    res.send(`${req.method} |  ${req.url}  |  Hello, from the Server hello.`);
});

app.get("/test", (req, res) => {
    res.send(`${req.method} |  ${req.url}  |  Hello, from the Server testing.`);
});

app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777....");
});

