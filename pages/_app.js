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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("router", router);

    const timeout = () =>
      setTimeout(() => {
        console.log("he out");
        setLoading(false);
      }, 2000);

    const handleStart = (url) => {
      console.log("ddd");

      url !== router.pathname ? setLoading(true) : timeout();
    };

    const handleComplete = (url) => console.log("df");

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    /*router.events.on("routeChangeError", handleComplete);*/
  }, [router]);

  console.log("styled", styled);

  return (
    <ConfigProvider locale={ruRU}>
      <MouseContextProvider>
        {<Preload PreloadIsHidden={!loading} />}
        {/* главный компонент */}
        <Component {...pageProps} />
        {/* end: главный компонент */}
        <DotRing />
      </MouseContextProvider>
    </ConfigProvider>
  );
}

export default MyApp;
