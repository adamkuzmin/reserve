import { withIronSession } from "next-iron-session";

const logoutHandler = withIronSession(
  async (req, res) => {
    req.session.destroy();
    res.setHeader(
      "Set-Cookie",
      "my-session-cookie=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    res.redirect("/admin");
  },
  {
    password: "cx5fiZYdfASDaksjalsdklaklazzRpUjHsMis",
    cookieName: "my-session-cookie",
    cookieOptions: {
      secure: false,
    },
  }
);

export default logoutHandler;
