import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;

  & form {
    width: 100%;
  }

  && .ant-transfer {
    width: 100%;
    min-width: 100;
    min-width: 100%;
    grid-template-columns: 1fr 40px 1fr;

    & > .ant-transfer-list {
      width: 100%;
      height: 600px;
      overflow: hidden;
      max-width: 100%;
    }
  }
`;
