import { Col, LeadText } from "../common/body";
import styled from "styled-components";

import { Text60, Text36 } from "../common/text";
import { useStore } from "../../Store/useStore";

const StyledTitle = styled.h2`
  font-weight: 600;
  color: black;
  margin-top: clamp(48px, 6.5vw, 128px);
  margin-bottom: clamp(12px, 1.5vw, 60px);

  @media (max-width: 576px) {
    margin-top: 48px;
    margin-bottom: 12px;
  }
`;

const leadData = {
  title: {
    ru: <>Актуальные проекты</>,
    en: <>Actual projects</>,
  },
  message: {
    ru: (
      <>
        Резерв — это бюро, которое создает решения, определяющие и меняющие
        мировую моду в архитектуре и способные создавать эмоции в душах даже
        самых черствых людей.
      </>
    ),
    en: (
      <>
        Reserve is an office that creates solutions that define and change the
        world's fashion in architecture and can create emotion in the souls of
        even the most callous people.
      </>
    ),
  },
};

const SectionLead = () => {
  const lang = useStore((state) => state.lang);

  return (
    <Col>
      <StyledTitle>
        <Text60 data-font="ibm">{leadData.title[lang]}</Text60>
      </StyledTitle>
      <LeadText>
        <Text36 data-font="ibm">{leadData.message[lang]}</Text36>
      </LeadText>
    </Col>
  );
};

export default SectionLead;
