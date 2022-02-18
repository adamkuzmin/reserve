import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styled from "styled-components";

import Preload from "../Components/Preload/Preload";

import "../styles/globals.css";
import { ConfigProvider } from "antd";
import ruRU from "antd/lib/locale/ru_RU";

import DotRing from "../Components/common/Cursor/dotRing";
import MouseContextProvider from "../Components/common/Cursor/mouse-context";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    let timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    console.log("router", router);

    return () => {
      clearTimeout(timer);
    };
  }, [router, setLoading]);

  return (
    <ConfigProvider locale={ruRU}>
      <MouseContextProvider>
        {<Preload PreloadIsHidden={!loading} />}
        {/* главный компонент */}
        {!loading && <Component {...pageProps} />}
        {/* end: главный компонент */}
        <DotRing />
      </MouseContextProvider>
    </ConfigProvider>
  );
}

export default MyApp;
