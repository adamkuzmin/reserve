import { useEffect, useRef, useState } from "react";
import { useStore } from "../../Store/useStore";
import Link from "next/link";

import { Nav } from "./styles";

import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import Burger from "./Burger";

/* Navigation */
const Navigation = () => {
  const [oldScrollY, setOldScrollY] = useState(null);
  const [newScrollY, setNewScrollY] = useState(null);

  /* черный / белый лого */
  const blackLogo = useStore((state) => state.blackLogo);

  /* входные для бара */
  const barIsVisible = useStore((state) => state.barIsVisible);
  const setBarIsVisible = useStore((state) => state.setBarIsVisible);

  /* входные для правой навигации */
  const navIsOpened = useStore((state) => state.navIsOpened);

  const BarRef = useRef();

  /* при быстром скролле вниз бар пропадает */
  const AppearBar = () => {
    setOldScrollY(newScrollY);
    setNewScrollY(window.scrollY);

    const ScrollVector = newScrollY - oldScrollY;

    if (ScrollVector > 5 && barIsVisible) {
      setBarIsVisible(false);
    } else if (ScrollVector && ScrollVector < 0) {
      setBarIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", AppearBar);
    return () => {
      window.removeEventListener("scroll", AppearBar);
    };
  }, [AppearBar]);

  /* залочить скроллинг когда правая панель открыта */
  useEffect(() => {
    if (navIsOpened) disableBodyScroll(BarRef);
    if (!navIsOpened) clearAllBodyScrollLocks();
  }, [navIsOpened]);

  return (
    <Nav data-status={barIsVisible ? "opened" : "closed"} ref={BarRef}>
      <Link href="/">
        <a>
          <Nav.LogoWrapper>
            <Nav.Logo
              data-type={/*!blackLogo ? "white" : "black"*/ "white"}
            ></Nav.Logo>
          </Nav.LogoWrapper>
        </a>
      </Link>

      <Burger />
    </Nav>
  );
};

export default Navigation;
