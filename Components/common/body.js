import styled from "styled-components";
import { Typography } from "antd";

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

export { Content, Col, LeadText };
