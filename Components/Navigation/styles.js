import styled from "styled-components";

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
    z-index: 9999;
    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    pointer-events: none;

    @media (max-width: 1000px) {
      & {
        height: clamp(68px, 11.2vw, 112px);
      }
    }
  }

  &&[data-status="closed"] {
    transform: translateY(-100%);
  }

  @media (max-width: 480px) {
    && {
      padding-left: calc(20px + 10px);
      padding-right: 20px;
    }
  }
`;

Nav.Logo = styled.div`
  width: 317px;
  height: 49px;
  background-size: cover;
  mix-blend-mode: difference;
  pointer-events: visible;

  &&[data-type="black"] {
    background-image: url("/icons/navlogo-black.png");
  }

  &&[data-type="white"] {
    background-image: url("/icons/navlogo-white.png");
  }

  &&&& {
    @media (max-width: 1000px) {
      & {
        width: clamp(61px, 9.4vw, 94px);
        height: clamp(32px, 4.9vw, 49px);
      }
    }
  }
`;

/* w: 94, h: 49 */

Nav.BurgerWrapper = styled.div`
  width: 72px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: visible;

  && {
    @media (max-width: 480px) {
      & {
        transform: scale(0.7, 0.7);
      }
    }
  }

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

export { Nav };
