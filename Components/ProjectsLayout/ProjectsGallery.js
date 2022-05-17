import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { useStore } from "../../Store/useStore";
import { Space, Spin, Grid } from "antd";

import { Layout } from "./components/gallery-styles";
import OneColumnGallery from "./components/gallery-column";
import { RowA, RowB, RowC, RowD } from "./components/gallery-rows";
import { LoadingOutlined } from "@ant-design/icons";

/* mobile */
import MobileGallery from "./components/mobile/gallery";

import { Text36, Text30 } from "../common/text";

const { useBreakpoint } = Grid;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const BottomTrigger = styled.div`
  width: 100%;
  background: rgba(255, 0, 0, 0);
  height: 250px;
  /*pointer-events: none;*/
  opacity: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  && * {
    color: rgba(0, 0, 0, 1);
  }

  transform: translateY(-50px);
`;

const MainGallery = ({ stateData, cards, setCards, showBottomTrigger }) => {
  const [partCards, setPartCards] = useState([]);
  const [loadedStep, setLoadedStep] = useState(1);
  const [needsToLoadMore, setNeedsToLoadMore] = useState(false);

  const setAnimatedGallery = useStore((state) => state.setAnimatedGallery);
  const setBarIsVisible = useStore((state) => state.setBarIsVisible);

  const bottomTriggerRef = useRef();

  useEffect(() => {
    if (bottomTriggerRef && partCards.length < cards.length) {
      const triggerScroll = () => {
        const top = bottomTriggerRef.current.getBoundingClientRect().top;

        if (top <= window.innerHeight && !needsToLoadMore)
          setNeedsToLoadMore(true);
      };

      document.addEventListener("scroll", triggerScroll, true);
      return () => document.removeEventListener("scroll", triggerScroll, true);
    }
  }, [bottomTriggerRef, needsToLoadMore, partCards, cards]);

  useEffect(() => {
    setPartCards(cards.slice(0, 3));
    setLoadedStep(1);

    setBarIsVisible(true);
  }, [cards]);

  useEffect(() => {
    if (needsToLoadMore) {
      const fetchMoreData = () => {
        setAnimatedGallery(false);
        setPartCards((state) =>
          state.concat(cards.slice(loadedStep * 3, loadedStep * 3 + 3))
        );
        setLoadedStep((state) => state + 1);
        setNeedsToLoadMore(false);
        return;
      };

      const timer = setTimeout(fetchMoreData, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [needsToLoadMore, cards, loadedStep]);

  /* количество проектов для каждого ряда */
  const sequence1 = [4, 3, 3, 5, 3, 3];
  const sequence2 = [3, 5, 3, 3, 4, 3];
  const sequence3 = [5, 3, 3, 4, 3, 3];

  const rowType1 = ["A", "B", "C", "D", "C", "B"];
  const rowType2 = ["C", "D", "C", "B", "A", "B"];
  const rowType3 = ["D", "C", "B", "A", "B", "C"];

  useEffect(() => {
    let stepKey = Math.round((Math.random() * 16) % 3);

    let rowType;
    let sequence;

    switch (stepKey) {
      case 0:
        {
          sequence = sequence1;
          rowType = rowType1;
        }
        break;
      case 1:
        {
          sequence = sequence2;
          rowType = rowType2;
        }
        break;
      case 2:
        {
          sequence = sequence3;
          rowType = rowType3;
        }
        break;
      default:
        {
          sequence = sequence1;
          rowType = rowType1;
        }
        break;
    }

    const sumOfCycle = [...sequence].reduce((prev, curr) => prev + curr);
    const cyclesAmount = Math.ceil(stateData.length / sumOfCycle);

    let copiedData = [...stateData];
    let components = [];

    /* дробим на порции для row компонентов */
    for (let i = 0; i < cyclesAmount; i++) {
      for (let b = 0; b < sequence.length; b++) {
        const part = copiedData.splice(0, sequence[b]);

        if (part.length > 0) {
          switch (rowType[b]) {
            case "A":
              components.push(<RowA {...{ data: part }} />);
              break;
            case "B":
              components.push(<RowB {...{ data: part }} />);
              break;
            case "C":
              components.push(<RowC {...{ data: part }} />);
              break;
            case "D":
              components.push(<RowD {...{ data: part }} />);
              break;
          }
        }
      }
    }

    setCards(components);
  }, [stateData]);

  return (
    <Layout>
      {partCards}
      {showBottomTrigger && partCards && partCards.length < cards.length && (
        <BottomTrigger ref={bottomTriggerRef}>
          <Space size={25}>
            <Spin indicator={antIcon} />
            <Text30>Загрузка проектов...</Text30>
          </Space>
        </BottomTrigger>
      )}
      {showBottomTrigger && partCards.length >= cards.length && (
        <BottomTrigger>
          <Space size={25}>
            <Text30>🤐 Конец списка</Text30>
          </Space>
        </BottomTrigger>
      )}
    </Layout>
  );
};

const CommonLayout = styled.div`
  width: 100%;
  display: flex;
  perspective: 500px;
  perspective-origin: top;
  transform-style: preserve-3d;
`;

const LayoutWrapper = styled.div`
  max-width: calc(100vw - 80px);
  width: calc(100vw - 80px);
  overflow: hidden;
  position: relative;
  height: 100%;
`;

const LayoutWrapperMobile = styled.div`
  max-width: calc(100vw);
  width: calc(100vw);
  overflow: hidden;
  height: 100%;

  margin-left: -20px;
`;

const ProjectsGallery = ({ stateData }) => {
  const screens = useBreakpoint();

  //cards - row компоненты с 3, 4, 5 карточками
  const [cards, setCards] = useState([]);
  const [mobileCards, setMobileCards] = useState([]);
  const animatedGallery = useStore((state) => state.animatedGallery);

  /* чтобы лишний раз не светить триггером */
  const [showBottomTrigger, setShowBottomTrigger] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBottomTrigger(true), 2000);

    return () => {
      clearTimeout(timer);
    };
  });
  /* */

  return screens.sm ? (
    <LayoutWrapper>
      {cards && (
        <CommonLayout>
          {animatedGallery && <OneColumnGallery position="left" />}
          {animatedGallery && <OneColumnGallery position="right" />}
          <MainGallery
            {...{
              stateData,
              cards,
              setCards,
              showBottomTrigger,
            }}
          />
        </CommonLayout>
      )}
    </LayoutWrapper>
  ) : (
    <LayoutWrapperMobile>
      <MobileGallery
        {...{ stateData, mobileCards, setMobileCards, showBottomTrigger }}
      />
    </LayoutWrapperMobile>
  );
};

export default ProjectsGallery;
