import React, { useEffect } from "react";
import { useStore } from "../../Store/useStore";
import styled from "styled-components";

import { LeadLinks, SecondaryLinks } from "./Links";
import { Text24 } from "../common/text";
import {
  Nav,
  NavBlock,
  LinksGap,
  NavBottom,
  Langs,
  SocNetIcon,
} from "./styles";
import { Tooltip } from "antd";

/* данные по ссылкам */
import { pagesConfigs } from "../../Store/pagesConfigs";

const FixedBottom = styled.div`
  min-width: 100%;
  position: absolute;
  background: white;
  padding-top: 30px;
  bottom: 0;
`;

const NavRight = () => {
  /* язык */
  const lang = useStore((state) => state.lang);
  const setLang = useStore((state) => state.setLang);

  const navIsOpened = useStore((state) => state.navIsOpened);

  const links = Object.keys(pagesConfigs);
  const leadLinks = links?.slice(0, 4);
  const secondaryKeys = links?.slice(4, 6);

  return (
    <Nav data-status={navIsOpened ? "opened" : "closed"}>
      <FixedBottom>
        <NavBottom data-top="auto">
          <Text24>hello@reserve.ru</Text24>
        </NavBottom>
        <NavBottom data-space="nospace">
          <Tooltip placement={"left"} title={<>Ссылка в разработке</>}>
            <SocNetIcon data-type={"facebook"} />
          </Tooltip>
          <Tooltip placement={"left"} title={<>Ссылка в разработке</>}>
            <SocNetIcon data-type={"instagram"} />
          </Tooltip>
        </NavBottom>
      </FixedBottom>

      <NavBlock>
        <LeadLinks routes={leadLinks} />

        <LinksGap />

        <SecondaryLinks routes={secondaryKeys} />
      </NavBlock>

      <NavBottom>
        <Langs>
          {lang === "ru" ? (
            <Langs.Item onClick={() => setLang("en")}>
              <a data-font="ibm">En</a>
            </Langs.Item>
          ) : (
            <Langs.Item onClick={() => setLang("ru")}>
              <a data-font="ibm">Ru</a>
            </Langs.Item>
          )}
        </Langs>
      </NavBottom>
    </Nav>
  );
};

export default NavRight;
