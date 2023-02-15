import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const [bearer, token] = authorization.split(" ");
  console.log("authorization", authorization);

  if (bearer !== "Bearer" || !token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, "my-secret-key");
    res.status(200).json({ username: decoded.username });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
}
