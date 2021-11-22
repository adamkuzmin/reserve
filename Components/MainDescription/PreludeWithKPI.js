import { Col, LeadText } from "../common/body";
import styled from "styled-components";
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

const KPIs = styled.div`
  display: flex;
  justify-content: space-between;
`;

KPIs.Item = styled.div`
  display: flex;
  flex-direction: column;
  color: black;

  && h3 {
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: 0px;
    color: black;
  }

  && p {
    font-weight: 400;
  }
`;

const SLeadText = styled(LeadText)`
  &&& {
    margin-top: 6vw;
    margin-bottom: 6vw;
    font-weight: 400;
  }
`;

const PreludeWithKPI = () => {
  return (
    <Col>
      <SLeadText>
        <Text36 data-font="ibm">
          Творческое Производственное Объединение «РЕЗЕРВ» — одно из ведущих
          российских архитектурных бюро, основанное в 1987 году в Москве.
          Основными направлениями работы компании являются архитектурное
          проектирование и разработка градостроительных концепций.
        </Text36>
      </SLeadText>
      <KPIs>
        <KPIs.Item>
          <h3 data-font="ibm">
            <Text96 data-font="ibm">165</Text96>
          </h3>
          <p>
            <Text24 data-font="ibm">сотрудников</Text24>
          </p>
        </KPIs.Item>
        <KPIs.Item>
          <h3 data-font="ibm">
            <Text96 data-font="ibm">&#62;30</Text96>
          </h3>
          <p>
            <Text24 data-font="ibm">профессиональных наград</Text24>
          </p>
        </KPIs.Item>
        <KPIs.Item>
          <h3 data-font="ibm">
            <Text96 data-font="ibm">30+</Text96>
          </h3>
          <p>
            <Text24 data-font="ibm">лет в архитектуре</Text24>
          </p>
        </KPIs.Item>
        <KPIs.Item>
          <h3 data-font="ibm">
            <Text96 data-font="ibm">20</Text96>
          </h3>
          <p>
            <Text24 data-font="ibm">побед в конкурсах</Text24>
          </p>
        </KPIs.Item>
      </KPIs>
    </Col>
  );
};

export default PreludeWithKPI;
