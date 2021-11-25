import "../styles/globals.css";
import { ConfigProvider } from "antd";
import ruRU from "antd/lib/locale/ru_RU";

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider locale={ruRU}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
