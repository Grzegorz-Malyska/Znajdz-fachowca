const express = require("express");
const app = express();

app.use(express.static(__dirname + "/build"));
app.get("/", (req, res) =>
    res.sendFile(__dirname + '/build/index.html'));
app.get("*", (req, res) =>
    res.sendFile(__dirname + "/build/error.html"));

app.listen(80);
console.log("Server started on port 80.");
