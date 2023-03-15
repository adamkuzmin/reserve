import AdminWrapper from "@/Components/Admin/admin-wrapper/admin-wrapper";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { useStore } from "@/Store/useStore";
import Transfer from "@/Components/Admin/slider/transfer/transfer";
import groq from "groq";
import { useEffect, useState } from "react";
import { projectFields } from "@/Components/Admin/queries/__queries";

const SliderPage = () => {
  const logId = useStore(({ logId }) => logId);

  const [projects, setProjects] = useState([]);
  const [slider, setSlider] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    const query = groq`
      *[_type == "projects"] {
        ${projectFields}
      }
      | order(cr desc)
    `;

    const slider = groq`
      *[_type == "slider"] {
        _id,
        project_id,
        order
      }
    `;

    setLoading(true);
    setLoading1(true);

    sanity
      .fetch(query)
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(console.error);

    sanity
      .fetch(slider)
      .then((data) => {
        setSlider(data);
        setLoading1(false);
      })
      .catch(console.error);
  }, [logId]);

  return (
    <>
      <AdminWrapper>
        {projects && slider && !loading && !loading1 && (
          <Transfer key={`logId:${logId}`} data={projects} slider={slider} />
        )}
      </AdminWrapper>
    </>
  );
};

export default SliderPage;
