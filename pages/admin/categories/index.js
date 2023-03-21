import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import AdminWrapper from "../../../Components/Admin/admin-wrapper/admin-wrapper";
import client from "../../../Components/Client/apollo/apollo-client";
import { v4 as uuidv4 } from "uuid";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";
import { Text24, Text30 } from "@/Components/common/text";
import Projects from "@/Components/Admin/projects/projects";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import groq from "groq";
import { useStore } from "@/Store/useStore";
import {
  categoriesFields,
  projectFields,
} from "@/Components/Admin/queries/__queries";
import Categories from "@/Components/Admin/categories/categories";
import AddForm from "@/Components/Admin/categories/add";

const ProjectsPage = () => {
  const router = useRouter();

  const logId = useStore(({ logId }) => logId);

  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = groq`
      *[_type == "categories"] {
        ${categoriesFields}
      }
      | order(cr desc)
    `;

    setLoading(true);

    sanity
      .fetch(query)
      .then((data) => {
        setCats(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [logId]);

  const [add, setAdd] = useState(false);

  return (
    <>
      <AdminWrapper>
        <WideButton
          style={{ width: "550px", height: "75px" }}
          onClick={() => setAdd((state) => !state)}
        >
          <Text30>Добавить категорию</Text30>
        </WideButton>

        {add && <AddForm onClose={setAdd} />}

        <br />
        <br />

        {cats && !loading && <Categories data={cats} />}
      </AdminWrapper>
    </>
  );
};

export default ProjectsPage;
