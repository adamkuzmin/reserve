import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
import client from "./apollo-client";
import { useEffect } from "react";

const getProjectsHub = gql`
  query getProjects {
    tiger_data_r_pr_hub {
      cr
      description
      id
      meta
      name
    }
  }
`;

const TestApollo = () => {
  const [getProjects, { data, error }] = useLazyQuery(getProjectsHub, {
    client,
  });

  useEffect(() => {
    getProjects();
  }, []);

  return <></>;
};

export default TestApollo;
