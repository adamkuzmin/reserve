import styled from "styled-components";
import { Tabs as AntTabs } from "antd";

export const Tabs = styled(AntTabs)`
  &&& {
    & .ant-tabs-nav {
      display: none;
    }
  }
`;
