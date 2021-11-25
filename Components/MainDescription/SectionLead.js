import { Col, LeadText } from "../common/body";
import styled from "styled-components";

import { Text60, Text36 } from "../common/text";

const StyledTitle = styled.h2`
  font-weight: 600;
  color: black;
  margin-top: 6.5vw;
  margin-bottom: 1.5vw;
`;

const SectionLead = () => {
  return (
    <Col>
      <StyledTitle>
        <Text60 data-font="ibm">Актуальные проекты</Text60>
      </StyledTitle>
      <LeadText>
        <Text36 data-font="ibm">
          Мы спроектировали колоссальное количество общественных пространств,
          что прям душа не может нарадоваться. А визуалки просто блеск!
        </Text36>
      </LeadText>
    </Col>
  );
};

export default SectionLead;
