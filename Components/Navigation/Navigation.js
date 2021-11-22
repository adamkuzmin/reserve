import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

////////////////////////////////////////
// Styled

const Nav = styled.div`
  && {
    width: 100vw;
    height: 112px;
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    padding-left: 40px;
    padding-right: 40px;
    z-index: 7000;
    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &&[data-status="closed"] {
    transform: translateY(-100%);
  }
`;

Nav.Logo = styled.div`
  width: 317px;
  height: 49px;
  background-size: cover;
  mix-blend-mode: difference;

  &&[data-type="black"] {
    background-image: url("/icons/preloadIcon.svg");
  }

  &&[data-type="white"] {
    background-image: url("/icons/logo.svg");
  }
`;

Nav.BurgerWrapper = styled.div`
  width: 72px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &&[data-status="opened"] {
    & div:first-child {
      transform: translateY(11px);
    }

    & div:last-child {
      transform: translateY(-12px);
    }
  }
`;

Nav.BurgerLine = styled.div`
  width: 52px;
  height: 5px;
  margin: 9px auto;

  &&[data-type="white"] {
    background: white;
  }

  &&[data-type="black"] {
    background: black;
  }
`;

//////////////////////////////////
// Burger

Nav.Burger = ({ iswhite, status, ...props }) => {
  return (
    <Nav.BurgerWrapper data-status={status ? "opened" : "closed"} {...props}>
      <Nav.BurgerLine data-type={iswhite && !status ? "white" : "black"} />
      <Nav.BurgerLine data-type={iswhite && !status ? "white" : "black"} />
    </Nav.BurgerWrapper>
  );
};

////////////////////////////////////
// Nav

const Navigation = ({
  MiniNavIsOpened,
  setMiniNavIsOpened,
  BlackBlockIsScrolling,
  setBlackBlockIsScrolling,
}) => {
  const [oldScrollY, setOldScrollY] = useState(null);
  const [newScrollY, setNewScrollY] = useState(null);
  const [NavIsOpened, setNavIsOpened] = useState(true);

  const NavRef = useRef();

  const AppearNav = (e) => {
    setOldScrollY(newScrollY);
    setNewScrollY(window.scrollY);

    const ScrollVector = newScrollY - oldScrollY;

    if (ScrollVector > 30 && NavIsOpened) {
      setNavIsOpened(false);
    } else if (ScrollVector && ScrollVector < 0) {
      setNavIsOpened(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", AppearNav);
    return () => {
      window.removeEventListener("scroll", AppearNav);
    };
  }, [AppearNav]);

  return (
    <Nav data-status={NavIsOpened ? "opened" : "closed"} ref={NavRef}>
      <Nav.Logo
        data-type={
          BlackBlockIsScrolling ? "white" : "black"
        }
      ></Nav.Logo>
      <Nav.Burger
        iswhite={BlackBlockIsScrolling}
        status={MiniNavIsOpened}
        onClick={() => {
          setMiniNavIsOpened(!MiniNavIsOpened);

          if (!MiniNavIsOpened) disableBodyScroll(NavRef);
          if (MiniNavIsOpened) clearAllBodyScrollLocks();
        }}
      />
    </Nav>
  );
};

export default Navigation;
