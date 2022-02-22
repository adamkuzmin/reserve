import styled from "styled-components";
import Link from "next/link";

import { useStore } from "../../Store/useStore";

import { Text48 } from "../common/text";

const ProjectB = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectHeaderWrapper = styled.div`
  margin-top: 5.1vw;
  width: 100%;
  display: flex;
  justify-content: space-between;

  && a {
    color: black;
    font-weight: 600;
  }
`;

const StyledText24 = styled.div`
  color: #4d4d4d;
  width: 100%;
  max-width: 20vw;
  min-width: 120px;
`;

const WideButton = styled.div`
  margin-top: 3.9vw;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  height: 178px;
  border: 1px solid black;
  color: black;
  margin-bottom: 7vw;

  &&:hover {
    background: black;
    color: white;
    cursor: pointer;
  }
`;

const navData = {
  prev: {
    ru: <>Предыдущий</>,
    en: <>Previous</>,
  },
  next: {
    ru: <>Следующий</>,
    en: <>Next</>,
  },
  all: {
    ru: "Все проекты",
    en: "All Projects",
  },
};

const ProjectBottom = () => {
  const lang = useStore((state) => state.lang);

  return (
    <ProjectB>
      <ProjectHeaderWrapper>
        <a>
          <Text48>{navData.prev[lang]}</Text48>
        </a>
        <a>
          <Text48>{navData.next[lang]}</Text48>
        </a>
      </ProjectHeaderWrapper>
      <Link href="/projects">
        <a>
          <WideButton data-font="wremena">
            <Text48>{navData.all[lang]}</Text48>
          </WideButton>
        </a>
      </Link>
    </ProjectB>
  );
};

export default ProjectBottom;
