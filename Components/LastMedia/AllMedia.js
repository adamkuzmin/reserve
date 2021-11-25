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

import { ScreenLead } from "../common/body";

const MediaWrapper = styled.div`
  padding-top: 9.6vw;
  width: 100%;
`;

const Media = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 6.9vw;

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

const AllMedia = ({ BlackBlockIsScrolling, setBlackBlockIsScrolling }) => {
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

      <Media>
        <LargeCard>
          <LargeCard.Content data-content="image" src="/renders/24.jpg" />
          <h3>
            <Text48 data-type="title">Выставки</Text48>
          </h3>
        </LargeCard>
        <LargeCard>
          <LargeCard.Content data-content="image" src="/renders/25.jpg" />
          <h3>
            <Text48 data-type="title">Интервью</Text48>
          </h3>
        </LargeCard>
      </Media>

      <Media>
        <LargeCard>
          <LargeCard.Content data-content="image" src="/renders/26.jpg" />
          <h3>
            <Text48 data-type="title">Лекции</Text48>
          </h3>
        </LargeCard>
        <LargeCard>
          <LargeCard.Content data-content="image" src="/renders/27.jpg" />
          <h3>
            <Text48 data-type="title">Студенты Владимира Плоткина</Text48>
          </h3>
        </LargeCard>
      </Media>
    </MediaWrapper>
  );
};

export default AllMedia;
