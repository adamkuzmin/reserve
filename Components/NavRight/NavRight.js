import React, { useEffect, useRef } from "react";
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
import { Tooltip, Grid } from "antd";

/* данные по ссылкам */
import { pagesConfigs } from "../../Store/pagesConfigs";

const { useBreakpoint } = Grid;

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
  const setNavIsOpened = useStore((state) => state.setNavIsOpened);

  const links = Object.keys(pagesConfigs);
  const leadLinks = links?.slice(0, 3);
  const secondaryKeys = links?.slice(3, 6);

  const navRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setNavIsOpened(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [navRef]);

  const screens = useBreakpoint();

  return (
    <Nav ref={navRef} data-status={navIsOpened ? "opened" : "closed"}>
      {screens.sm && (
        <FixedBottom>
          <NavBottom data-space="nospace">
            <Text24>hello@reserve.ru</Text24>
          </NavBottom>
        </FixedBottom>
      )}

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
