import { useEffect, useRef } from "react";
import Link from "next/link";
import { useStore } from "../../Store/useStore";

import styled from "styled-components";
import { Text48, Text40 } from "../common/text";

import { ScreenLead } from "../common/body";
import Router, { useRouter } from "next/router";

const transValue = `800px`;

const MediaWrapper = styled.div`
  width: 100%;
`;

const Media = styled.div`
  width: 100%;
  display: flex;

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

const WideButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 300px;
  height: 194px;
  font-size: 48px;
  border: 1px solid white;
  color: white;
  margin-top: 5.7vw;
  margin-bottom: clamp(96px, 13vw, 144px);

  @media (max-width: 576px) {
    & {
      margin-bottom: 96px;
    }
  }

  &&:hover {
    cursor: pointer;
    background: white;
    color: black;
  }

  @media (max-width: 768px) and (min-width: 576px) {
    &&& {
      height: clamp(45px, 18vw, 147px);
    }
  }

  @media (max-width: 576px) {
    &&& {
      height: 45px;
    }
  }
`;

const LargeCard = styled.div`
  width: ${({ swidth }) => (swidth ? `${swidth}%` : `100%`)};
  display: flex;
  flex-direction: column;

  @media (max-width: ${transValue}) {
    & {
      width: 100%
    }
  }

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

LargeCard.Title = styled.div`
  margin-top: 12px;

  && * {
    color: white;
    font-weight: 600;
  }

  @media (max-width: 800px) and (min-width: 576px) {
    && {
      margin-top: clamp(4px, 1.2vw, 12px);
    }
  }

  @media (max-width: 576px) {
    && {
      margin-top: 4px;
    }
  }
`;

LargeCard.Content = styled.div`
  height: 45vw;

  @media (max-width: ${transValue}) {
    && {
      height: 45vw;
    }
  }

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

    @media (max-width: ${transValue}) {
      flex-direction: row;

      & > * + * {
        margin-left: 2px;
      }
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

  @media (max-width: ${transValue}) and (min-width: 576px) {
    && {
      border-radius: clamp(10px, 12vw, 96px);
    }
  }

  @media (max-width: 576px) {
    && {
      border-radius: 10px;
    }
  }

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
  descr: {
    ru: (
      <>
        «Резерв» активно участвует в&nbsp;медиа-тусовке: постоянно публикуются
        журналы, мы получаем награды, ведем образовательную деятельность.
        Подписывайтесь, рыбки, на&nbsp;нас в&nbsp;соцсетях
      </>
    ),
    en: (
      <>
        "Reserve is active in the media scene: we publish magazines all the
        time, we win awards and we do educational activities. Subscribe, fish,
        to us on social networks
      </>
    ),
  },
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
  },
};

const LastMedia = () => {
  const blackLogo = useStore((state) => state.blackLogo);
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  const lang = useStore((state) => state.lang);

  const router = Router;

  const MediaRef = useRef();

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
      <ScreenLead color={"white"}>{intro.descr[lang]}</ScreenLead>
      <Media>
        <LargeCard
          onClick={() =>
            router.push({
              pathname: "/media/news",
            })
          }
        >
          <LargeCard.Content data-content="image" src="/renders/10.jpg" />
          <LargeCard.Title>
            <Text48 data-type="title">{intro.labels.news[lang]}</Text48>
          </LargeCard.Title>
        </LargeCard>
        <LargeCard
          onClick={() =>
            router.push({
              pathname: "/media/publications",
            })
          }
        >
          <LargeCard.Content data-content="image" src="/renders/11.jpg" />
          <LargeCard.Title>
            <Text40 data-type="title">{intro.labels.publications[lang]}</Text40>
          </LargeCard.Title>
        </LargeCard>
        <LargeCard swidth={60}>
          <LargeCard.Content data-content="tiles">
            <Tile src="/renders/12.jpg"></Tile>
            <Tile src="/renders/13.jpg"></Tile>
          </LargeCard.Content>
          <LargeCard.Title>
            <Text40 data-type="title">{intro.labels.socmedia[lang]}</Text40>
          </LargeCard.Title>
        </LargeCard>
      </Media>
      <Link href="/media/all">
        <a>
          <WideButton>
            <Text40 data-font="wremena">{intro.labels.allmedia[lang]}</Text40>
          </WideButton>
        </a>
      </Link>
    </MediaWrapper>
  );
};

export default LastMedia;
