import LoginWrapper from "../../Components/Admin/login-wrapper/login-wrapper";
import { useRouter } from "next/router";
import Bar from "../../Components/Admin/bar/bar";
import AdminWrapper from "../../Components/Admin/admin-wrapper/admin-wrapper";
import Link from "next/link";

const AdminPage = () => {
  const router = useRouter();

  return (
    <AdminWrapper>
      <div>Now you have access</div>

      <Link href="/admin/projects">
        <div
          style={{
            width: "100%",
            padding: "50px 50px",
            border: "2px solid black",
            borderRadius: "40px",
          }}
        >
          Проекты
        </div>
      </Link>
    </AdminWrapper>
  );
};

export default AdminPage;
