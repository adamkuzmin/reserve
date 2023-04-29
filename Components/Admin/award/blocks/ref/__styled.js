import styled from "styled-components";
import { Form as AntForm } from "antd";

export const Form = styled(AntForm)`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  border: 1px solid black;
  padding: 20px;
  margin-bottom: 10px;

  && .ant-form-item {
    margin-bottom: 0;

    & .ant-form-item-row {
      min-height: 110px;

      & .ant-select-selector {
        padding: 8px 2px;
        min-height: 50px;
      }

      & .ant-btn {
        margin-top: 16px;
        background: black;
        display: flex;
        align-items: center;
        border-radius: 0px;
        min-height: 50px;
      }
    }
  }
`;

export const RemovePanel = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: lightgrey;
  display: flex;
  padding: 2px 8px;
  cursor: pointer;
  z-index: 40;

  &, & * {
    font-size: 10px;
  }

  && > * + * {
    margin-left: 5px;
  }
`;
