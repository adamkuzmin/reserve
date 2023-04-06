import styled from "styled-components";
import { Form as AntForm } from "antd";

export const Form = styled(AntForm)`
  width: 100%;
  display: flex;
  flex-direction: column;
  

  && .ant-form-item {
    margin-bottom: 0;

    & .ant-form-item-row {
      min-height: 110px;

      & .ant-select-selector {
        padding: 8px 2px;
        min-height: 50px;
      }

      & .ant-btn {
        background: black;
        display: flex;
        align-items: center;
        border-radius: 0px;
        min-height: 50px;
      }
    }
  }
`;
