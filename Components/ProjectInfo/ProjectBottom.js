import styled from "styled-components";
import Link from "next/link";

import { useStore } from "../../Store/useStore";

import { Text48 } from "../common/text";
import { Button } from "antd";

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

export const WideButton = styled(Button)`
  &,
  &:hover,
  &:focus {
    border: 0px;
    margin-top: 3.9vw;
    box-shadow: 0;
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

const ProjectBottom = ({ beforeAfter = [] }) => {
  const lang = useStore((state) => state.lang);

  const beforeId = beforeAfter[0] && beforeAfter[0]?._id;
  const nextId = beforeAfter[1] && beforeAfter[1]?._id;

  return (
    <ProjectB>
      <ProjectHeaderWrapper>
        {beforeId && (
          <Link href={`/project/${beforeId}`}>
            <Text48>{navData.prev[lang]}</Text48>
          </Link>
        )}
        {nextId && (
          <Link href={`/project/${nextId}`}>
            <Text48>{navData.next[lang]}</Text48>
          </Link>
        )}
      </ProjectHeaderWrapper>
      <Link href="/projects">
        <WideButton data-font="wremena">
          <Text48>{navData.all[lang]}</Text48>
        </WideButton>
      </Link>
    </ProjectB>
  );
};

export default ProjectBottom;
