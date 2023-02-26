import { MainContent } from "@/pages/projects/Projects";
import { Nav } from "@/Components/Navigation/styles";
import Link from "next/link";
import { Text24 } from "@/Components/common/text";

const Bar = ({ noAuth }) => {
  const handleLogout = async () => {
    const response = await fetch("/api/login/logout");
    if (response.ok) {
      location.reload();
    } else {
      console.log("Logout failed");
    }
  };

  return (
    <>
      <Nav>
        <Link href="/admin/">
          <Nav.LogoWrapper>
            <Nav.Logo data-type={"white"}></Nav.Logo>
          </Nav.LogoWrapper>
        </Link>

        {!noAuth && (
          <Text24
            style={{ cursor: "pointer", pointerEvents: "visible" }}
            onClick={handleLogout}
          >
          Выйти из аккаунта
          </Text24>
        )}
      </Nav>
    </>
  );
};

export default Bar;
