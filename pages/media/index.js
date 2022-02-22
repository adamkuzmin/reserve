import React, { useEffect, useState } from "react";
import MediaFilters from "../../Components/Filters/MediaFilters";

import Media from "./Media";
import News from "../../Components/Media/News";
import Publications from "../../Components/Media/Publications";

import { Content } from "../../Components/common/body";
import Navigation from "../../Components/Navigation/Navigation";
import NavRight from "../../Components/NavRight/NavRight";

import Footer from "../../Components/Footer/Footer";
import { useRouter } from "next/router";

export default function HomeApp() {
  const [layoutType, setLayoutType] = useState(1);

  const router = useRouter();

  useEffect(() => {
    if (router && router.query && router.query.section) {
      const s = router.query.section;

      setLayoutType(parseInt(s));
    }
  }, [router]);

  return (
    <div>
      <MediaFilters {...{ layoutType, setLayoutType }} />

      <NavRight />
      <Navigation />

      {
        /* Все разделы медиа */
        layoutType === 1 && <Media />
        /* */
      }

      {
        /* Все разделы медиа */
        layoutType === 2 && <News />
        /* */
      }

      {
        /* Все разделы медиа */
        layoutType === 3 && <Publications />
        /* */
      }

      {
        /* Все разделы медиа */
        layoutType === 4 && <News interviews />
        /* */
      }

      {
        /* Все разделы медиа */
        layoutType === 5 && <Publications exhibitions />
        /* */
      }

      <Content background={"black"}>
        <Footer />
      </Content>
    </div>
  );
}
