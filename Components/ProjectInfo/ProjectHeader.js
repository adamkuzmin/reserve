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

const ProjectHeaderWrapper = styled.div`
  margin-top: 5.1vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
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
`;

const ProjectHeader = () => {
  return (
    <ProjectHeaderWrapper>
      <Header>
        <Header.Title>
          <p>
            <Text30 data-font="wremena">Москва, улица Остоженка, 23</Text30>
          </p>
          <h3>
            <Text60 data-type="title">Жилой комплекс Wine House</Text60>
          </h3>
        </Header.Title>
      </Header>
      <StyledText24>
        <Text24>
          ЖК Wine House удостоен награды Arch-Cup Red Dot Award в 2018 году в
          номинации «Перспективные пространства для жизни».
        </Text24>
      </StyledText24>
    </ProjectHeaderWrapper>
  );
};

export default ProjectHeader;
