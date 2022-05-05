import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Text60, Text30, Text24 } from "../common/text";

const ProjectHeaderWrapper = styled.div`
  margin-top: 5.1vw;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 26px;
`;

Header.Title = styled.div`
  display: flex;
  flex-direction: column;

  && p,
  && h3 {
    line-height: 1;
    margin-bottom: 0px;
  }

  && p {
    line-height: 1.46;
    font-weight: 400;
  }
`;

const StyledText24 = styled.div`
  color: #4d4d4d;
  width: 100%;
  max-width: 20vw;
  min-width: 120px;

  @media (max-width: 576px) {
    margin-top: 24px;
    max-width: 60%;
    margin-left: auto;
  }
`;

const intro = {
  location: {
    ru: <>Москва, улица Остоженка, 23</>,
    en: <>23 Ostozhenka Street, Moscow</>,
  },
  name: {
    ru: <>Жилой комплекс Wine House</>,
    en: <>Wine House residential complex</>,
  },
  descr: {
    ru: (
      <>
        ЖК Wine House удостоен награды Arch-Cup Red Dot Award в 2018 году в
        номинации «Перспективные пространства для жизни».
      </>
    ),
    en: (
      <>
        Wine House has been awarded the Arch-Cup Red Dot Award in the 2018 in
        the "Promising Living Spaces" category.
      </>
    ),
  },
};

const ProjectHeader = () => {
  const lang = useStore((state) => state.lang);

  return (
    <ProjectHeaderWrapper>
      <Header>
        <Header.Title>
          <p>
            <Text30 data-font="wremena">{intro.location[lang]}</Text30>
          </p>
          <h3>
            <Text60 data-type="title">{intro.name[lang]}</Text60>
          </h3>
        </Header.Title>
      </Header>
      <StyledText24>
        <Text24>{intro.descr[lang]}</Text24>
      </StyledText24>
    </ProjectHeaderWrapper>
  );
};

export default ProjectHeader;
