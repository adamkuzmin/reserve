import LoginWrapper from "../../Components/Admin/login-wrapper/login-wrapper";
import { useRouter } from "next/router";
import Bar from "../../Components/Admin/bar/bar";
import AdminWrapper from "../../Components/Admin/admin-wrapper/admin-wrapper";
import Link from "next/link";
import { Text24 } from "@/Components/common/text";

const AdminPage = () => {
  const router = useRouter();

  return (
    <AdminWrapper>
      <Link href="/admin/projects">
        <div
          style={{
            width: "100%",
            minWidth: "300px",
            padding: "50px 50px",
            border: "2px solid black",
            borderRadius: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
            marginTop: "24px",
          }}
        >
          <Text24>Проекты</Text24>
        </div>
      </Link>
    </AdminWrapper>
  );
};

export default AdminPage;
