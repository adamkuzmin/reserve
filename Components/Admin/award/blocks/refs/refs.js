import {
  AwardsRefQuery,
  projectFields,
} from "@/Components/Admin/queries/__queries";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { useStore } from "@/Store/useStore";
import { Button } from "antd";
import groq from "groq";
import { useEffect, useState } from "react";
import Ref from "../ref/ref";
import { List } from "./__styled";

const Refs = ({ value, onChange = () => {} }) => {
  const logId = useStore(({ logId }) => logId);

  const [projects, setProjects] = useState([]);
  const [refs, setRefs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    const query = groq`
      *[_type == "projects"] {
        ${projectFields}
      }
      | order(cr desc)
    `;

    const queryRefs = AwardsRefQuery;

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
      .fetch(queryRefs)
      .then((data) => {
        setRefs(data);
        setLoading(false);
        setLoading1(false);
      })
      .catch(console.error);
  }, [logId]);

  if (loading || loading1) return <>Loading...</>;

  return (
    <List>
      {value &&
        value
          .filter((item = {}) => {
            const { _id } = item;
            const foundEntry = refs.find(({ _id: id }) => id === _id);

            if (foundEntry) return true;
          })
          .map((item, i) => {
            const { _id, project = {} } = item;
            const foundEntry = refs.find(({ _id: id }) => id === _id);
            const { cover = "" } = foundEntry;

            const { _id: project_id } = project;

            return (
              <div key={`f:${_id}`}>
                <Ref
                  initialValues={{ cover, project: project_id }}
                  projects={projects}
                  key={`fg:${_id}:${logId}`}
                />
              </div>
            );
          })}

      <Button
        type="primary"
        style={{
          background: "black",
          width: "100%",
          borderRadius: "0",
          height: "70px",
          display: "flex",
          alignItems: "center",
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        + Добавить еще поле
      </Button>
    </List>
  );
};

export default Refs;
