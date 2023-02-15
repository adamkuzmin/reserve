// pages/api/login.js
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const { username, password } = req.body;
  // Check if the username and password are valid
  if (username === "admin" && password === "1234") {
    // Encode the username with a secret key and set it in a cookie
    const token = jwt.sign({ username }, "my-secret-key");
    res.setHeader(
      "Set-Cookie",
      `username=${token}; Path=/; HttpOnly; SameSite=Strict`
    );
    // Send a success response with the authenticated username
    res.status(200).json({ username });
  } else {
    // Send an error response if the username or password is invalid
    res.status(401).end("Invalid username or password");
  }
}
