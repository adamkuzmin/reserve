import LoginWrapper from "../../Components/Admin/login-wrapper/login-wrapper";
import { useRouter } from "next/router";
import Bar from "../../Components/Admin/bar/bar";
import AdminWrapper from "../../Components/Admin/admin-wrapper/admin-wrapper";

const AdminPage = () => {
  const router = useRouter();

  return (
    <AdminWrapper>
      <div>Now you have access</div>
    </AdminWrapper>
  );
};

export default AdminPage;
