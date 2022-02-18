import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import PageHead from "../Components/common/head";

import { useStore } from "../Store/useStore";

import Preload from "../Components/Preload/Preload";

import "../styles/globals.css";

import { ConfigProvider } from "antd";
import "antd/dist/antd.css";

import ruRU from "antd/lib/locale/ru_RU";

import DotRing from "../Components/common/Cursor/dotRing";
import MouseContextProvider from "../Components/common/Cursor/mouse-context";

/* Конфигурации страница */
import { pagesConfigs } from "../Store/pagesConfigs";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const setPageTitle = useStore((state) => state.setPageTitle);

  /* preload эффект, которые активируется при изменении route */
  useEffect(() => {
    setLoading(true);

    let timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    console.log("router", router);

    /* конфигурации для страницы */
    if (router && router.pathname && pagesConfigs[router.pathname]) {
      const configs = pagesConfigs[router.pathname];

      setPageTitle(configs?.title);
    } else {
      setPageTitle(null);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [router, setLoading]);

  return (
    <ConfigProvider locale={ruRU}>
      <MouseContextProvider>
        <PageHead />

        <Preload loading={loading} />

        {/* главный компонент */}
        {!loading && <Component {...pageProps} />}
        <DotRing />
      </MouseContextProvider>
    </ConfigProvider>
  );
}

export default MyApp;
