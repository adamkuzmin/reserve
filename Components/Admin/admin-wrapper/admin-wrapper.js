import Bar from "../bar/bar";
import LoginWrapper from "../login-wrapper/login-wrapper";
import { MainContent } from "../../../pages/projects/Projects";

const AdminWrapper = ({ children, panel }) => {
  return (
    <>
      <LoginWrapper>
        <Bar />
        {panel && panel}

        <MainContent>{children}</MainContent>
      </LoginWrapper>
    </>
  );
};

export default AdminWrapper;
