import styled, { css } from "styled-components";

export const Cover = styled.div`
  width: 200px;
  position: relative;

  &&::before {
    content: "";
    position: relative;
    width: 100%;
    background-color: lightgrey;
    ${({ url }) =>
      url
        ? css`
            background-image: url("${url}");
            background-size: cover;
            background-position: center;
          `
        : ``}

    padding-bottom: 50%;
    display: block;
  }
`;
