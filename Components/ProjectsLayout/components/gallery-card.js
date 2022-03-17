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

const Card = ({ swidth, src, IsGalleryAnimation }) => {
  const lang = useStore((state) => state.lang);
  const router = useRouter();

  const [RandomTime, setRandomTime] = useState(0);

  useEffect(() => {
    setRandomTime(Math.random());
  }, []);

  return (
    <Layout.Project
      {...{ swidth, randomtime: RandomTime }}
      data-effect={IsGalleryAnimation && "fade"}
      onClick={() => router.push("/project")}
    >
      <Render {...{ src }} />
      <Header data-type="card-header">
        <Header.Title>
          <TextWrapper data-type="text-wrapper" direction={-100}>
            <p>
              <Text30 data-font="wremena">{cardsData.a1.title[lang]}</Text30>
            </p>
          </TextWrapper>
          <TextWrapper data-type="text-wrapper" direction={100}>
            <h3>
              <Text48 data-type="title">{cardsData.a1.message[lang]}</Text48>
            </h3>
          </TextWrapper>
        </Header.Title>
        <Header.Year>
          <TextWrapper data-type="text-wrapper">
            <div>
              <Text30 data-font="wremena" direction={-100}>
                2018
              </Text30>
            </div>
          </TextWrapper>
        </Header.Year>
      </Header>
    </Layout.Project>
  );
};

export default Card;
