import { withIronSession } from "next-iron-session";

const handler = async (req, res) => {
  const { username, password } = req.body;
  // Check if the username and password are valid
  if (username === "admin" && password === "1234") {
    // Save the authenticated username in the session
    req.session.set("username", username);
    await req.session.save();
    // Send a success response with the authenticated username
    res.status(200).json({ username });
  } else {
    // Send an error response if the username or password is invalid
    res.status(401).end("Invalid username or password");
  }
};

export default withIronSession(handler, {
  password: "cx5fiZYdfASDaksjalsdklaklazzRpUjHsMis",
  cookieName: "my-session-cookie",
  cookieOptions: {
    secure: false,
    httpOnly: false,
  },
});
