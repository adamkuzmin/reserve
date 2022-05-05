import React from "react";
import styled from "styled-components";

import { Input } from "antd";

import { Content } from "../common/body";
import { Gap } from "../About/common/styles";

const Wrapper = styled.div`
  background: white;
  width: 100%;
  height: 100%;
  position: fixed;

  background: white;
  z-index: 99;

  left: 0;
  top: 0;

  &[data-display="show"] {
    opacity: 1;
  }

  &[data-display="hide"] {
    opacity: 0;
    pointer-events: none;
  }
`;

const InputSearch = styled(Input.Search)`
  && .ant-input-group-addon {
    display: none;
  }

  && .ant-input {
    text-align: center;
    font-size: 40px;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid black;

    &:hover {
      border-color: white;
      border-bottom: 1px solid black;
    }

    &:hover,
    &:focus {
      box-shadow: none;
      border-bottom: 1px solid black;
    }
  }
`;

const SearchPanel = ({ visible }) => {
  return (
    <Wrapper data-display={visible ? "show" : "hide"}>
      <Content>
        <Gap sheight={`120px`} />
        <InputSearch allowClear enterButton={false} addonAfter={false} />
      </Content>
    </Wrapper>
  );
};

export default SearchPanel;
