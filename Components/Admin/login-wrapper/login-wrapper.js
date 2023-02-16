import { useEffect, useState } from "react";
import LoginForm from "../login-form/login-form";

const LoginWrapper = ({ children }) => {
  const [status, setStatus] = useState(); //access / no-access

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch("/api/login/auth");
        console.log("response", response);
        if (response.ok) {
          setStatus("access");
        } else {
          setStatus("no-access");
        }
      } catch (error) {
        console.error(error);
        setStatus("no-access");
      }
    }
    checkAuthStatus();
  }, []);

  if (!status || status === "no-access") {
    return <LoginForm />;
  }

  return <>{children}</>;
};

export default LoginWrapper;
