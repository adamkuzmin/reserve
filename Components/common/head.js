import React, { useEffect } from "react";
import Head from "next/head";

import { useStore } from "../../Store/useStore";

const PageHead = () => {
  const pageTitle = useStore((state) => state.pageTitle);

  useEffect(() => {
    console.log("pageTitle", pageTitle);
  }, [pageTitle]);

  return (
    <Head>
      <title>ТПО «РЕЗЕРВ»{pageTitle && ` — ${pageTitle}`}</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default PageHead;
