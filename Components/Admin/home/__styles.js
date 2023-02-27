import styled from "styled-components";

export const Block3 = styled.div`
  display: flex;
  width: 100%;

  & > * {
    width: 100%;
  }

  & {
    & > *:first-child,
    & > *:nth-child(2) {
      width: 50%;
    }
  }

  & > * + * {
    margin-left: 20px;
  }
`;
