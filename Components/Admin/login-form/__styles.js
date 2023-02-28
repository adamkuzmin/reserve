import { Form } from "antd";
import styled from "styled-components";

export const AntForm = styled(Form)`
  &&& {
    .ant-btn {
      &,
      &:hover,
      &:focus {
        height: 80px;
        width: 100%;
        border-radius: 100px;
        background: black;
        box-shadow: initial;
        color: white;

        & * {
          color: white;
        }
      }
    }
  }
`;
