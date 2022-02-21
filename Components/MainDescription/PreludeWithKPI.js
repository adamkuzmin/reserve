import { Col, LeadText } from "../common/body";
import styled from "styled-components";
import { Text96, Text36, Text24 } from "../common/text";
import { useStore } from "../../Store/useStore";

const KPIs = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1100px) {
    flex-wrap: wrap;
  }

  @media (max-width: 600px) {
    & {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
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
    padding-right 40px;
  }
`;

const SLeadText = styled(LeadText)`
  &&& {
    margin-top: 6vw;
    margin-bottom: 7.3vw;
    font-weight: 400;
  }
`;

const preludeData = {
  descr: {
    ru: (
      <>
        Творческое Производственное Объединение «РЕЗЕРВ» — одно из ведущих
        российских архитектурных бюро, основанное в 1987 году в Москве.
        Основными направлениями работы компании являются архитектурное
        проектирование и разработка градостроительных концепций.
      </>
    ),
    en: (
      <>
        Creative Production Association RESERVE is one of Russia's leading
        architectural firms founded in 1987 in Moscow. Russian architectural
        bureau, founded in 1987 in Moscow. The company's main lines of work are
        architectural design design and development of urban planning concepts.
      </>
    ),
  },
  kpis: [
    {
      count: <>165</>,
      label: {
        ru: <>сотрудников</>,
        en: <>employees</>,
      },
    },
    {
      count: <>&#62;30</>,
      label: {
        ru: <>профессиональных наград</>,
        en: <>professional awards</>,
      },
    },
    {
      count: <>30+</>,
      label: {
        ru: <>лет в архитектуре</>,
        en: <>years in architecture</>,
      },
    },
    {
      count: <>20</>,
      label: {
        ru: <>побед в конкурсах</>,
        en: <>competition victories</>,
      },
    },
  ],
};

const PreludeWithKPI = () => {
  const lang = useStore((state) => state.lang);

  return (
    <Col>
      <SLeadText>
        <Text36 data-font="ibm">{preludeData.descr[lang]}</Text36>
      </SLeadText>
      <KPIs>
        {preludeData.kpis.map(({ count, label }, i) => {
          return (
            <KPIs.Item key={`kpi:item:${i}`}>
              <h3 data-font="ibm">
                <Text96 data-font="ibm" data-type="kpi">
                  {count}
                </Text96>
              </h3>
              <p>
                <Text24 data-font="ibm">{label[lang]}</Text24>
              </p>
            </KPIs.Item>
          );
        })}
      </KPIs>
    </Col>
  );
};

export default PreludeWithKPI;
