import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminWrapper from "../../../Components/Admin/admin-wrapper/admin-wrapper";
import { v4 as uuidv4 } from "uuid";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";
import { Text30 } from "@/Components/common/text";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { useStore } from "@/Store/useStore";
import { AwardsQuery } from "@/Components/Admin/queries/__queries";
import Awards from "@/Components/Admin/awards/awards";

const AwardsPage = () => {
  const router = useRouter();

  const logId = useStore(({ logId }) => logId);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = AwardsQuery;

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
            router.push(`/admin/award/${uuidv4()}`, null, { shallow: true })
          }
        >
          <Text30>Добавить награду</Text30>
        </WideButton>

        <br />
        <br />

        {projects && !loading && <Awards data={projects} />}
      </AdminWrapper>
    </>
  );
};

export default AwardsPage;
