import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import "antd/dist/antd.css";

import Project from "./Project";
import { useEffect, useState } from "react";
import Preload from "../../Components/Preload/Preload";

export default function HomeApp() {
  const [PreloadIsHidden, setPreloadIsHidden] = useState(false);

  useEffect(() => {
    let preloadTimeout = setTimeout(() => setPreloadIsHidden(true), 3500);
    return () => {
      clearTimeout(preloadTimeout);
    };
  });

  return (
    <div>
      <Head>
        <title>ТПО «РЕЗЕРВ» — Проект</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {<Preload {...{PreloadIsHidden}} />}
      {<Project {...{PreloadIsHidden}}/>}
    </div>
  );
}
