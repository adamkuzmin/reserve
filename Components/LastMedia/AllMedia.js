import { useEffect, useRef } from "react";
import { useStore } from "../../Store/useStore";
import styled from "styled-components";
import { Text48 } from "../common/text";
import Router, { useRouter } from "next/router";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

const transValue = `800px`;

const MediaWrapper = styled.div`
  padding-top: 9.6vw;
  width: 100%;

  opacity: 0;
  transform: translateY(100px);

  animation: SectionAppear 0.7s ease-in-out 0.5s;
  @keyframes SectionAppear {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation-fill-mode: forwards;
`;

const Media = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 6.9vw;

  && > * + * {
    margin-left: 4px;
  }

  @media (max-width: ${transValue}) and (min-width: 576px) {
    flex-direction: column;

    && > * + * {
      margin-top: clamp(20px, 6.25vw, 40px);
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;

    && > * + * {
      margin-top: 20px;
    }
  }
`;

const LargeCard = styled.div`
  width: ${({ swidth }) => (swidth ? `${swidth}%` : `100%`)};
  display: flex;
  flex-direction: column;

  && h3 {
    color: white;
    font-size: 48px;
  }

  & span[data-type="title"] {
    border-bottom: 3px solid black
  }

  &&:hover {
    cursor: pointer;

    & span[data-type="title"] {
      border-bottom: 3px solid white
    }
  }

  &&:hover {div[data-content="image"] {
    &::after {
      transform: scale(1.02);
      opacity: 0.9;
    }
  }
`;

LargeCard.Content = styled.div`
  height: 45vw;

  &&[data-content="image"] {
    width: 100%;
    background: grey;
    border-radius: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    @media (max-width: ${transValue}) {
      & {
        background: url(${({ src }) => (src ? src : "")});
        background-size: cover;
        padding-bottom: 124%;
      }
    }

    &::after {
      content: "";
      width: 100%;
      height: 100%;
      background: url(${({ src }) => (src ? src : "")});
      background-size: cover;
      transform: scale(1.08);
      transition: transform 0.6s ease-in-out;
    }
  }

  &&[data-content="tiles"] {
    display: flex;
    flex-direction: column;

    & > * + * {
      margin-top: 4px;
    }
  }
`;

const Tile = styled.div`
  width: 100%;
  height: 100%;
  background: grey;
  border-radius: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &&:hover {
    &::after {
      transform: scale(1);
      opacity: 0.9;
    }
  }

  &&::after {
    content: "";
    width: 100%;
    height: 100%;
    background: url(${({ src }) => (src ? src : "")});
    background-size: cover;
    transform: scale(1.08);
    transition: transform 0.6s ease-in-out;
  }
`;

const intro = {
  labels: {
    news: {
      ru: <>Новости</>,
      en: <>News</>,
    },
    publications: {
      ru: <>Публикации</>,
      en: <>Publications</>,
    },
    socmedia: {
      ru: <>Соцсети</>,
      en: <>Social media</>,
    },
    allmedia: {
      ru: <>Все медиа</>,
      en: <>All media</>,
    },
    interview: {
      ru: <>Интервью</>,
      en: <>interview</>,
    },
    exhibition: {
      ru: <>Выставки</>,
      en: <>Exhibitions</>,
    },
    lectures: {
      ru: <>Лекции</>,
      en: <>Lectures</>,
    },
    students: {
      ru: <>Студенты Владимира Плоткина</>,
      en: <>Plotkin students</>,
    },
  },
};

const AllMedia = () => {
  const screens = useBreakpoint();
  const lang = useStore((state) => state.lang);

  const blackLogo = useStore((state) => state.blackLogo);
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  const MediaRef = useRef();

  const router = Router;

  useEffect(() => {
    const onScroll = (e) => {
      if (MediaRef && MediaRef.current) {
        const BoundingRect = MediaRef.current.getBoundingClientRect();

        if (BoundingRect.top <= 0 && BoundingRect.bottom >= 0 && blackLogo) {
          setBlackLogo(false);
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <MediaWrapper ref={MediaRef}>
      <Media>
        <LargeCard
          onClick={() =>
            router.push({
              pathname: "/media/news",
            })
          }
        >
          <LargeCard.Content data-content="image" src="/renders/10.jpg" />
          <h3>
            <Text48 data-type="title">{intro.labels.news[lang]}</Text48>
          </h3>
        </LargeCard>
        <LargeCard
          onClick={() =>
            router.push({
              pathname: "/media/publications",
            })
          }
        >
          <LargeCard.Content data-content="image" src="/renders/11.jpg" />
          <h3>
            <Text48 data-type="title">{intro.labels.publications[lang]}</Text48>
          </h3>
        </LargeCard>
        {screens.md && (
          <LargeCard swidth={60}>
            <LargeCard.Content data-content="tiles">
              <Tile src="/renders/12.jpg"></Tile>
              <Tile src="/renders/13.jpg"></Tile>
            </LargeCard.Content>
            <h3>
              <Text48 data-type="title">{intro.labels.socmedia[lang]}</Text48>
            </h3>
          </LargeCard>
        )}
      </Media>

      <Media>
        <LargeCard
          onClick={() =>
            router.push({
              pathname: "/media/exhibition",
            })
          }
        >
          <LargeCard.Content data-content="image" src="/renders/24.jpg" />
          <h3>
            <Text48 data-type="title">{intro.labels.exhibition[lang]}</Text48>
          </h3>
        </LargeCard>
        <LargeCard
          onClick={() =>
            router.push({
              pathname: "/media/interview",
            })
          }
        >
          <LargeCard.Content data-content="image" src="/renders/25.jpg" />
          <h3>
            <Text48 data-type="title">{intro.labels.interview[lang]}</Text48>
          </h3>
        </LargeCard>
      </Media>

      <Media>
        <LargeCard>
          <LargeCard.Content data-content="image" src="/renders/26.jpg" />
          <h3>
            <Text48 data-type="title">{intro.labels.lectures[lang]}</Text48>
          </h3>
        </LargeCard>
        <LargeCard>
          <LargeCard.Content data-content="image" src="/renders/27.jpg" />
          <h3>
            <Text48 data-type="title">{intro.labels.students[lang]}</Text48>
          </h3>
        </LargeCard>
      </Media>
    </MediaWrapper>
  );
};

export default AllMedia;
