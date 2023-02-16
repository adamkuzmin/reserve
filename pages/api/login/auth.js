import jwt from "jsonwebtoken";
import { withIronSession } from "next-iron-session";

async function handler(req, res) {
  const { username } = req.session.get() || {};

  console.log("username", username);
  console.log("req.session.get", req.session.get());

  if (!username) {
    res.status(401).end("Unauthorized not found");
    return;
  }

  if (username && username === "admin") {
    res.status(200).end("Authorized");
    return;
  }

  /* try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "my-secret-key");

    if (decoded.username === username) {
      res.status(200).end("Authorized");
      return;
    }
  } catch (err) {
    console.error(err);
  } */

  res.status(401).end("Unauthorized");
}

export default withIronSession(handler, {
  password: "cx5fiZYdfASDaksjalsdklaklazzRpUjHsMis",
  cookieName: "my-session-cookie",
  cookieOptions: {
    secure: false,
    httpOnly: true,
    /* path: "/",
    sameSite: "lax", */
  },
});
