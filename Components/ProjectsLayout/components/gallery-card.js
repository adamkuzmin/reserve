import React from "react";
import { useRouter } from "next/router";

import { Layout, Header, Render, TextWrapper } from "./gallery-styles";
import { Text48, Text30 } from "../../common/text";
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
  const { coverhor, coververt, finished, nameru, nameen } = localMeta;
  const metaRatio = ratio === "vertical" ? coverhor : coververt;
  const metaSrc = `/projects/Frame%20${metaRatio}.jpg`;

  const [RandomTime, setRandomTime] = useState(0);

  useEffect(() => {
    setRandomTime(Math.random());
  }, []);

  return (
    <Layout.Project
      {...{ swidth, randomtime: RandomTime }}
      data-effect={animatedGallery && "fade"}
      onClick={() => router.push("/project")}
    >
      <Render {...{ src: meta ? metaSrc : src }} />
      <Header data-type="card-header">
        <Header.Title>
          <TextWrapper data-type="text-wrapper" direction={-100}>
            <p>
              <Text30 data-font="wremena">Объект культуры</Text30>
            </p>
          </TextWrapper>
          <TextWrapper data-type="text-wrapper" direction={100}>
            <h3>
              <Text48 data-type="title">
                {meta ? (lang === "ru" ? nameru : nameen) : null}
              </Text48>
            </h3>
          </TextWrapper>
        </Header.Title>
        <Header.Year>
          <TextWrapper data-type="text-wrapper">
            <div>
              <Text30 data-font="wremena" direction={-100}>
                {finished && finished}
              </Text30>
            </div>
          </TextWrapper>
        </Header.Year>
      </Header>
    </Layout.Project>
  );
};

export default Card;
