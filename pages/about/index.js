import { useEffect, useState } from "react";
import { useStore } from "../../Store/useStore";

import styled from "styled-components";

import About from "../../Components/About/About";
import Team from "../../Components/About/Team";
import Career from "../../Components/About/Career";
import Partners from "../../Components/About/Partners";
import Awards from "../../Components/About/Awards";

import { Content } from "../../Components/common/body";
import Navigation from "../../Components/Navigation/Navigation";
import NavRight from "../../Components/NavRight/NavRight";

import Footer from "../../Components/Footer/Footer";
import AboutFilters from "../../Components/Filters/AboutFilters";

const WrapperAnimation = styled.div`
  opacity: 0;
  transform: translateY(100px);

  animation: SectionAppear .7s ease-in-out .5s;
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

export default function HomeApp() {
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  const [layoutType, setLayoutType] = useState(1);

  useEffect(() => {
    setBlackLogo(true);
  }, []);

  return (
    <div>
      <NavRight />
      <Navigation />

      <AboutFilters {...{ layoutType, setLayoutType }} />

      {
        /* Раздел "О Бюро" */
        layoutType === 1 && (
          <WrapperAnimation>
            <About />
          </WrapperAnimation>
        )
        /* */
      }
      {
        /* Раздел "Команда" */
        layoutType === 2 && (
          <WrapperAnimation>
            <Team />
          </WrapperAnimation>
        )
        /* */
      }

      {
        /* Раздел "Карьера" */
        layoutType === 3 && (
          <WrapperAnimation>
            <Career />
          </WrapperAnimation>
        )
        /* */
      }

      {
        /* Раздел "Награды" */
        layoutType === 4 && (
          <WrapperAnimation>
            <Partners />
          </WrapperAnimation>
        )
        /* */
      }

      {
        /* Раздел "Награды" */
        layoutType === 5 && (
          <WrapperAnimation>
            <Awards />
          </WrapperAnimation>
        )
        /* */
      }

      <Content background={"black"}>
        <Footer />
      </Content>
    </div>
  );
}
