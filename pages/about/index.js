import { useEffect, useState } from "react";
import { useStore } from "../../Store/useStore";

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

export default function HomeApp() {
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  const [layoutType, setLayoutType] = useState(5);

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
        layoutType === 1 && <About />
        /* */
      }
      {
        /* Раздел "Команда" */
        layoutType === 2 && <Team />
        /* */
      }

      {
        /* Раздел "Карьера" */
        layoutType === 3 && <Career />
        /* */
      }

      {
        /* Раздел "Награды" */
        layoutType === 4 && <Partners />
        /* */
      }

      {
        /* Раздел "Награды" */
        layoutType === 5 && <Awards />
        /* */
      }

      <Content background={"black"}>
        <Footer />
      </Content>
    </div>
  );
}
