import { useEffect, useRef } from "react";
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

import Link from "next/link";

import { ScreenLead } from "../common/body";

const MediaWrapper = styled.div`
  width: 100%;
`;

const Media = styled.div`
  width: 100%;
  display: flex;

  && > * + * {
    margin-left: 4px;
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
  margin-bottom: 13vw;

  &&:hover {
    cursor: pointer;
    background: white;
    color: black;
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

const LastMedia = ({ BlackBlockIsScrolling, setBlackBlockIsScrolling }) => {
  const MediaRef = useRef();

  useEffect(() => {
    const onScroll = (e) => {
      const BoundingRect = MediaRef.current.getBoundingClientRect();

      if (
        BoundingRect.top <= 0 &&
        BoundingRect.bottom >= 0 &&
        !BlackBlockIsScrolling
      ) {
        setBlackBlockIsScrolling(true);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <MediaWrapper ref={MediaRef}>
      <ScreenLead color={"white"} margintop={"7vw"} marginbottom={"9.3vw"}>
        «Резерв» активно участвует в&nbsp;медиа-тусовке: постоянно публикуются
        журналы, мы получаем награды, ведем образовательную деятельность.
        Подписывайтесь, рыбки, на&nbsp;нас в&nbsp;соцсетях
      </ScreenLead>
      <Media>
        <LargeCard>
          <LargeCard.Content data-content="image" src="/renders/10.jpg" />
          <h3>
            <Text48 data-type="title">Новости</Text48>
          </h3>
        </LargeCard>
        <LargeCard>
          <LargeCard.Content data-content="image" src="/renders/11.jpg" />
          <h3>
            <Text48 data-type="title">Публикации</Text48>
          </h3>
        </LargeCard>
        <LargeCard swidth={60}>
          <LargeCard.Content data-content="tiles">
            <Tile src="/renders/12.jpg"></Tile>
            <Tile src="/renders/13.jpg"></Tile>
          </LargeCard.Content>
          <h3>
            <Text48 data-type="title">Соцсети</Text48>
          </h3>
        </LargeCard>
      </Media>
      <Link href="/media">
        <a>
          <WideButton>
            <Text48 data-font="wremena">Все медиа</Text48>
          </WideButton>
        </a>
      </Link>
    </MediaWrapper>
  );
};

export default LastMedia;
