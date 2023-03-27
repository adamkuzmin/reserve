import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminWrapper from "../../../Components/Admin/admin-wrapper/admin-wrapper";
import { v4 as uuidv4 } from "uuid";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";
import { Text30 } from "@/Components/common/text";
import Projects from "@/Components/Admin/projects/projects";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { useStore } from "@/Store/useStore";
import { PartnersQuery } from "@/Components/Admin/queries/__queries";
import Partners from "@/Components/Admin/partners/partners";

const PartnersPage = () => {
  const router = useRouter();

  const logId = useStore(({ logId }) => logId);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = PartnersQuery;

    setLoading(true);

    sanity
      .fetch(query)
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [logId]);

  return (
    <>
      <AdminWrapper>
        <WideButton
          style={{ width: "550px", height: "75px" }}
          onClick={() =>
            router.push(`/admin/partner/${uuidv4()}`, null, { shallow: true })
          }
        >
          <Text30>Добавить заказчика / партнера</Text30>
        </WideButton>

        <br />
        <br />

        {projects && !loading && <Partners data={projects} />}
      </AdminWrapper>
    </>
  );
};

export default PartnersPage;
