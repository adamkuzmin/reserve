import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Link from "next/link";
import Image from "next/image";

import { useStore } from "../../../../Store/useStore";
import { Text24 } from "../../../common/text";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const MobileBottomTrigger = styled.div`
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

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  && > * {
    margin-top: 2px;
  }
`;

Layout.Row = styled.div`
  width: 100%;
  min-height: 49.5vw;
  max-height: 49.5vw;

  display: flex;

  && > * + * {
    margin-left: 2px;
  }

  ${({ ratio }) =>
    ratio === "vertical"
      ? `&&& {
      min-height: calc(49.5vw * 2);
  max-height: calc(49.5vw * 2);
    }
    
    `
      : null}
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  min-height: inherit;
  background: lightgrey;

  max-height: ${({ ratio }) =>
    ratio === "vertical" ? `calc(49.5vw * 2)` : `calc(49.5vw)`};

  overflow: hidden;

  position: relative;
  display: flex;
  align-items: stretch;

  &&&& > span {
    width: 100% !important;
    height: auto !important;
  }
`;

Layout.Card = ({ meta = {}, ratio = "horizontal" }) => {
  const localMeta = meta ? meta : {};
  const { coverhor, coververt, finished, nameru, nameen } = localMeta;
  const metaRatio = ratio === "vertical" ? coverhor : coververt;
  const metaSrc = `/projects/Frame%20${metaRatio}.jpg`;

  return (
    <Link href="/project">
      <Card {...{ ratio }}>
        <Image
          src={metaSrc}
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="cover"
        />
      </Card>
    </Link>
  );
};

const RowMA = ({ data = [] }) => {
  return (
    <Layout.Row>
      <Layout.Card meta={data[0]} />
      <Layout.Card meta={data[1]} />
    </Layout.Row>
  );
};

const RowMB = ({ data = [] }) => {
  return (
    <Layout.Row>
      <Layout.Card meta={data[0]} />
    </Layout.Row>
  );
};

const RowMC = ({ data = [] }) => {
  return (
    <Layout.Row ratio="vertical">
      <Layout.Card meta={data[0]} ratio="vertical" />
      <Layout.Card meta={data[1]} ratio="vertical" />
    </Layout.Row>
  );
};

const MobileGallery = ({
  stateData = [],
  mobileCards = [],
  setMobileCards,
  showBottomTrigger
}) => {
  const [partCards, setPartCards] = useState([]);
  const [loadedStep, setLoadedStep] = useState(1);
  const [needsToLoadMore, setNeedsToLoadMore] = useState(false);

  const setBarIsVisible = useStore((state) => state.setBarIsVisible);

  useEffect(() => {
    setPartCards(mobileCards.slice(0, 5));
    setLoadedStep(1);

    setBarIsVisible(true);
  }, [mobileCards]);

  const bottomTriggerRef = useRef();

  useEffect(() => {
    if (bottomTriggerRef && partCards.length < mobileCards.length) {
      const triggerScroll = () => {
        const top = bottomTriggerRef.current.getBoundingClientRect().top;

        if (top <= window.innerHeight && !needsToLoadMore)
          setNeedsToLoadMore(true);
      };

      document.addEventListener("scroll", triggerScroll, true);
      return () => document.removeEventListener("scroll", triggerScroll, true);
    }
  }, [bottomTriggerRef, needsToLoadMore, partCards, mobileCards]);

  useEffect(() => {
    if (needsToLoadMore) {
      const fetchMoreData = () => {
        /*setAnimatedGallery(false);*/
        setPartCards((state) =>
          state.concat(mobileCards.slice(loadedStep * 5, loadedStep * 5 + 5))
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
  }, [needsToLoadMore, mobileCards, loadedStep]);

  /* количество проектов для каждого ряда */
  const sequence1 = [2, 1, 2, 2, 1, 1, 2, 2];
  const sequence2 = [1, 2, 2, 1, 1, 2, 2, 2];
  const sequence3 = [2, 2, 1, 2, 2, 1, 1, 2];

  const rowType1 = ["A", "B", "A", "A", "B", "B", "A", "C"];
  const rowType2 = ["B", "A", "A", "B", "B", "A", "C", "A"];
  const rowType3 = ["C", "A", "B", "A", "A", "B", "B", "A"];

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
              components.push(<RowMA {...{ data: part }} />);
              break;
            case "B":
              components.push(<RowMB {...{ data: part }} />);
              break;
            case "C":
              components.push(<RowMC {...{ data: part }} />);
              break;
          }
        }
      }
    }

    setMobileCards(components);
  }, [stateData]);

  return (
    <>
      <Layout>{partCards}</Layout>

      {showBottomTrigger && partCards && partCards.length < mobileCards.length && (
        <MobileBottomTrigger ref={bottomTriggerRef}>
          <Space size={25}>
            <Spin indicator={antIcon} />
            <Text24>Загрузка проектов...</Text24>
          </Space>
        </MobileBottomTrigger>
      )}
      {showBottomTrigger && partCards.length >= mobileCards.length && (
        <MobileBottomTrigger>
          <Space size={25}>
            <Text24>🤐 Конец списка</Text24>
          </Space>
        </MobileBottomTrigger>
      )}
    </>
  );
};

export default MobileGallery;
