import styled from "styled-components";
import { Typography } from "antd";

import {
  Text254,
  Text96,
  Text60,
  Text48,
  Text40,
  Text36,
  Text30,
  Text24,
} from "../common/text";

const { Paragraph } = Typography;

const LeadText = styled(Paragraph)`
  && {
    line-height: 1.22;
    color: black;
    margin-bottom: 0px;
    font-weight: 400;
  }
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ background }) => (background ? background : "white")};
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "baseline"};
`;

const Col = styled.div`
  width: 75%;
`;

const Lead = styled.div`
  margin-top: ${({ margintop }) => (margintop ? margintop : "7vw")};
  margin-bottom: ${({ marginbottom }) =>
    marginbottom ? marginbottom : "9.3vw"};
  line-height: 1.06;
  width: 70vw;
  margin-left: 11.4vw;
  color: ${({ color }) => (color ? color : "black")};
`;

////////////////////////////////
// Lead Block Component
const ScreenLead = ({ children, color, margintop, marginbottom }) => {
  return (
    <Lead {...{ color, margintop, marginbottom }}>
      <Text60 data-font="wremena">
        {children}
      </Text60>
    </Lead>
  );
};

export { Content, Col, LeadText, ScreenLead };
