import { gql } from "@apollo/client";

export const GET_PROJECT = gql`
  query getProject($project_id: uuid!) {
    tiger_data_r_pr_hub_by_pk(id: $project_id) {
      year
      slider_imgs
      name
      secondary_imgs
      meta
      main_img
      id
      description
      cr
      coververt
      coverhor
      comment
      city
      cats
      address
    }
  }
`;

export const CATS = gql`
  query getProjects {
    tiger_data_r_cat_hub {
      id
      name
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($object: tiger_data_r_pr_hub_insert_input!) {
    insert_tiger_data_r_pr_hub_one(object: $object) {
      id
    }
  }
`;

export const EDIT_PROJECT = gql`
  mutation editProject(
    $object: tiger_data_r_pr_hub_set_input!
    $project_id: uuid!
  ) {
    update_tiger_data_r_pr_hub_by_pk(
      pk_columns: { id: $project_id }
      _set: $object
    ) {
      id
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($project_id: uuid!) {
    delete_tiger_data_r_pr_hub_by_pk(id: $project_id) {
      id
    }
  }
`;
