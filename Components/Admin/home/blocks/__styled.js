import styled from "styled-components";

export const Col4 = styled.div`
  display: flex;

  && > * + * {
    margin-left: 20px;
  }
`;
