import styled from "styled-components";
import { Typography } from "antd";

import { Text60 } from "../common/text";

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

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const Col = styled.div`
  width: 75%;

  @media (max-width: 600px) {
    & {
      width: 100%;
    }
  }
`;

const Lead = styled.div`
  margin-top: ${({ margintop }) => (margintop ? margintop : "clamp(72px, 7vw, 140px)")};
  margin-bottom: ${({ marginbottom }) =>
    marginbottom ? marginbottom : "clamp(72px, 9.3vw, 140px)"};
  line-height: 1.06;
  width: 70vw;
  margin-left: 11.4vw;
  color: ${({ color }) => (color ? color : "black")};

  @media (max-width: 800px) {
    && {
      margin-left: 0;
      width: 80vw;
    }
  }
`;

////////////////////////////////
// Lead Block Component
const ScreenLead = ({ children, color, margintop, marginbottom }) => {
  return (
    <Lead {...{ color, margintop, marginbottom }}>
      <Text60 data-font="wremena">{children}</Text60>
    </Lead>
  );
};

export { Content, Col, LeadText, ScreenLead };
