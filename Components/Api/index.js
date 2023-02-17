import sanityClient from "@sanity/client";
import { basename } from "path";
import { useEffect } from "react";

const client = sanityClient({
  projectId: "2m6erddj",
  dataset: "production",
  token:
    "skpy1GO9WWaEybhQuG8cYfANOF6VpqAr1CIV5tLoxPTS2OhNOizuTXTZwfVcAvibhwheXcWo1aKk7288nKaS75pvSHx5MUfGCfs2OEqFdjBXKYzVJphHO8l6VxtF9YOfAprCoCyv4FiXhmwZJWPJWDi9ZiAWDMs3vAFU5ZKqt81tyRNSGn6B",
  useCdn: true,
});

const APIConnect = () => {
  useEffect(() => {
    const query = '*[_type == "projects"] {name, image}';

    client.fetch(query).then((item) => console.log("item", item));
  }, []);

  return <></>;
};

export default APIConnect;
