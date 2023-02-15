import LoginWrapper from "../../Components/Admin/login-wrapper/login-wrapper";
import cookie from "js-cookie";

const AdminPage = () => {
  const handleLogout = () => {
    cookie.remove("token");
    location.reload();
  };

  return (
    <LoginWrapper>
      <div>Now you have access</div>

      <div onClick={handleLogout}>Log out</div>
    </LoginWrapper>
  );
};

export default AdminPage;
