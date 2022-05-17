import styled from "styled-components";
import { useStore } from "../../Store/useStore";
import { Text254, Text96, Text30, Text24 } from "../common/text";
import Link from "next/link";

const Lead = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  align-items: start;
  margin-top: clamp(64px, 9.7vw, 220px);
  margin-bottom: 6vw;

  @media (max-width: 576px) {
    & {
      margin-top: 64px;
    }
  }

  @media (max-width: 1100px) {
    & {
      flex-direction: column !important;
    }
  }
`;

const KPI = styled.div`
  display: flex;
  align-items: flex-end;
  color: black;
`;

KPI.Number = styled.div`
  font-weight: 600;
  line-height: 0.8;
  color: black;
  margin-right: 8px;
`;

KPI.Text = styled.div`
  font-weight: 400;
  max-width: clamp(100px, 13.8vw, 400px);

  @media (max-width: 576px) {
    & {
      max-width: 100px;
    }
  }
`;

const LeadAbout = styled.div`
  line-height: 1;
  font-weight: 400;
  color: black;
  padding-left: 60px;
  padding-right: 60px;

  @media (max-width: 1100px) {
    & {
      padding-left: 0;
      padding-right: 0;
      margin-top: 16px;
    }
  }
`;

const ButtonBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: end;
  min-width: 80px;
  cursor: pointer;

  && span {
    border-bottom: 1px solid white;
    font-weight: 400;
  }

  &&:hover span {
    border-bottom: 1px solid black;
  }

  &&::after {
    content: "";
    width: 59px;
    height: 21px;
    background: url("/icons/arrowRight.svg");
  }
`;

const LeadWithBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 1100px) {
    & {
      flex-direction: column;
    }
  }
`;

const leadData = {
  count: <>55</>,
  label: {
    ru: (
      <>
        построенных
        <br />
        объектов
      </>
    ),
    en: (
      <>
        built
        <br />
        objects
      </>
    ),
  },
  leadlabel: {
    ru: <>Ведущая проектная организация с&nbsp;1987&nbsp;года</>,
    en: <>Leading design organisation since 1987</>,
  },
  leadlink: {
    ru: <>О&nbsp;нас</>,
    en: <>About&nbsp;us</>,
  },
};

const GeneralLead = () => {
  const lang = useStore((state) => state.lang);

  return (
    <Lead>
      <KPI>
        <KPI.Number>
          <Text254 data-font="ibm">{leadData.count}</Text254>
        </KPI.Number>
        <KPI.Text>
          <Text24 data-font="ibm">{leadData.label[lang]}</Text24>
        </KPI.Text>
      </KPI>
      <LeadWithBtn>
        <LeadAbout>
          <Text96 data-font="ibm">{leadData.leadlabel[lang]}</Text96>
        </LeadAbout>
        <Link href={"/about"}>
          <ButtonBlock>
            <Text30 data-font="ibm">{leadData.leadlink[lang]}</Text30>
          </ButtonBlock>
        </Link>
      </LeadWithBtn>
    </Lead>
  );
};

export default GeneralLead;
