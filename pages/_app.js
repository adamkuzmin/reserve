import "../styles/globals.css";
import { ConfigProvider } from "antd";
import ruRU from "antd/lib/locale/ru_RU";

import DotRing from "../Components/common/Cursor/dotRing";
import MouseContextProvider from "../Components/common/Cursor/mouse-context";

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider locale={ruRU}>
      <MouseContextProvider>
        <Component {...pageProps} />
        <DotRing />
      </MouseContextProvider>
    </ConfigProvider>
  );
}

export default MyApp;
