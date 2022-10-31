import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import PageHead from "../Components/common/head";
import { MouseContext } from "../Components/common/Cursor/mouse-context";

import { useStore } from "../Store/useStore";

import Preload from "../Components/Preload/Preload";
import GlobalStyle from "../styles/global-styles";

import "../styles/globals.css";

import { ConfigProvider } from "antd";
import "antd/dist/antd.css";

import ruRU from "antd/lib/locale/ru_RU";

import DotRing from "../Components/common/Cursor/dotRing";
import MouseContextProvider from "../Components/common/Cursor/mouse-context";

/* Конфигурации страница */
import { pagesConfigs } from "../Store/pagesConfigs";
import SearchPanel from "../Components/Search";

import WIPPage from "./wip";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [imagesAreLoaded, setImagesLoaded] = useState(false);
  const [loadedImgCount, setLoadedImgCount] = useState(0);

  const setPageTitle = useStore((state) => state.setPageTitle);
  const setBarIsVisible = useStore((state) => state.setBarIsVisible);
  const setNavIsOpened = useStore((state) => state.setNavIsOpened);

  const searchPanel = useStore(({ searchPanel }) => searchPanel);
  const showSearchPanel = useStore(({ showSearchPanel }) => showSearchPanel);

  /* preload эффект, которые активируется при изменении route */
  useEffect(() => {
    setLoading(true);

    let timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    /* конфигурации для страницы */
    /* название для <title> */
    if (
      router &&
      router.pathname &&
      pagesConfigs[router.pathname] &&
      router.pathname !== "/"
    ) {
      const configs = pagesConfigs[router.pathname];

      setPageTitle(configs?.title);
    } else {
      setPageTitle(null);
    }

    /* при загрузке правая навигация скрыта, а бар видимый */
    setBarIsVisible(true);
    setNavIsOpened(false);

    showSearchPanel(false);

    return () => {
      clearTimeout(timer);
    };
  }, [router, setLoading]);

  return (
    <ConfigProvider locale={ruRU}>
      <MouseContextProvider>
        <GlobalStyle />
        <PageHead />

        <Preload
          loading={loading}
          {...{
            imagesAreLoaded,
            setImagesLoaded,
            loadedImgCount,
            setLoadedImgCount,
          }}
        />

        {searchPanel && <SearchPanel visible={searchPanel} />}

        {/* главный компонент */}
        {!loading && imagesAreLoaded && <WIPPage />}
        {/*!loading && imagesAreLoaded && <Component {...pageProps} />*/}
        <DotRing />
      </MouseContextProvider>
    </ConfigProvider>
  );
}

export default MyApp;
