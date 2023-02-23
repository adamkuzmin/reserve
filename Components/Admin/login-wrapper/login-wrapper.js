import { MainContent } from "@/pages/projects/Projects";
import { useEffect, useState } from "react";
import Bar from "../bar/bar";
import LoginForm from "../login-form/login-form";

const LoginWrapper = ({ children }) => {
  const [status, setStatus] = useState(); //access / no-access

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch("/api/login/auth");

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

  if (!status) return <></>;

  if (status === "no-access") {
    return (
      <>
        <Bar noAuth />

        <MainContent>
          <LoginForm />
        </MainContent>
      </>
    );
  }

  return <>{children}</>;
};

export default LoginWrapper;
