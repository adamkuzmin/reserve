// components/login-wrapper/login-wrapper.js
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import LoginForm from "../login-form/login-form";

const LoginWrapper = ({ children }) => {
  const [status, setStatus] = useState(); //access / no-access

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        console.log("dd", cookie.get("username"));
        console.log("aa", cookie.get());

        const res = await fetch("/api/login/auth", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.get("username")}`,
          },
        });
        console.log("res", res);

        if (res.status === 200) {
          setStatus("access");
        } else {
          setStatus("no-access");
        }
      } catch (err) {
        console.error(err);
        setStatus("no-access");
      }
    }
    checkAuthStatus();
  }, []);

  if (!status || status === "no-access") return <LoginForm />;
  return <>{children}</>;
};

export default LoginWrapper;
