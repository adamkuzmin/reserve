import React from "react";
import { useRouter } from "next/router";

import { Layout, Header, Render, TextWrapper } from "./gallery-styles";
import { Text48, Text36, Text30, Text24 } from "../../common/text";
import { useEffect, useState } from "react";
import { useStore } from "../../../Store/useStore";

const cardsData = {
  a1: {
    title: {
      ru: <>Объект культуры</>,
      en: <>Cultural object</>,
    },
    message: {
      ru: <>Концертный зал «Зарядье»</>,
      en: <>Zaryadye Concert Hall</>,
    },
  },
};

const Card = ({ swidth, src, meta, ratio = "horizontal" }) => {
  const lang = useStore((state) => state.lang);
  const animatedGallery = useStore((state) => state.animatedGallery);
  const router = useRouter();

  const localMeta = meta ? meta : {};
  const {
    coverhor,
    coververt,
    finished,
    nameru,
    nameen,
    id,
    cats = [],
  } = localMeta;
  const metaRatio = ratio === "vertical" ? coverhor : coververt;
  const metaSrc = metaRatio;

  const [RandomTime, setRandomTime] = useState(0);

  useEffect(() => {
    setRandomTime(Math.random());
  }, []);

  return (
    <Layout.Project
      {...{ swidth, randomtime: RandomTime }}
      data-effect={animatedGallery && "fade"}
      onClick={id ? () => router.push(`/project/${id}`) : () => {}}
    >
      <Render {...{ src: meta ? metaSrc : src }} />
      <Header data-type="card-header">
        <Header.Title>
          <TextWrapper data-type="text-wrapper" direction={-100}>
            {id && cats && cats.length > 0 && (
              <p>
                <Text24 data-font="wremena">{cats[0]}</Text24>
              </p>
            )}
          </TextWrapper>
          <TextWrapper data-type="text-wrapper" direction={100}>
            <h3>
              <Text36 data-type="title">
                {meta ? (lang === "ru" ? nameru : nameen) : null}
              </Text36>
            </h3>
          </TextWrapper>
        </Header.Title>
        <Header.Year>
          <TextWrapper data-type="text-wrapper">
            <div>
              <Text24 data-font="wremena" direction={-100}>
                {finished && finished}
              </Text24>
            </div>
          </TextWrapper>
        </Header.Year>
      </Header>
    </Layout.Project>
  );
};

export default Card;
