import styled from "styled-components";
import { Form } from "antd";

export const Edit = styled.div`
  margin-left: 8px;

  opacity: 0.4;

  &&:hover {
    opacity: 1;
  }
`;

export const BtnRow = styled.div`
  display: flex;

  margin-left: 3px;
`;

export const NameForm = styled(Form)`
  &&& {
    display: flex;

    & .ant-input {
      height: 43px;
      border: 1px solid black;
    }

    & .ant-form-item {
      margin-right: 10px;
      margin-bottom: 0;

      & .ant-form-item-explain-error {
        display: none;
      }

      & .ant-form-item-row {
        height: 100%;

        & button {
          height: 43px;
          margin-left: 8px;
          border-radius: 0;

          &.ant-btn-primary {
            background: black;
          }

          &.ant-btn-default {
            border: 1px solid black;

            &,
            & * {
              color: black;
            }
          }

          &,
          & * {
            font-size: 16px;
          }
        }
      }
    }
  }
`;
