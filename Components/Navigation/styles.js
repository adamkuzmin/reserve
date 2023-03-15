import styled from "styled-components";

const Nav = styled.div`
  && {
    background: white;
    width: 100vw;
    height: 90px;
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    padding-left: 40px;
    padding-right: 40px;
    z-index: 9999;
    transition: all 1.5s cubic-bezier(0.19, 1, 0.22, 1);
    pointer-events: none;

    @media (max-width: 576px) {
      & {
        height: 54px;
      }
    }

    @media (max-width: 1000px) and (min-width: 576px) {
      & {
        height: clamp(54px, 8.96vw, 90px);
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

Nav.LogoWrapper = styled.div`
  position: relative;
  width: max-content;

  @media (max-width: 772px) and (min-width: 576px) {
    & {
      width: 94px;
    }
  }

  @media (max-width: 576px) {
    & {
      width: 61px;
    }
  }
`;

Nav.Logo = styled.div`
  width: 317px;
  height: 49px;
  background-size: cover;
  mix-blend-mode: difference;
  pointer-events: visible;

  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  animation-delay: 1s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: both;
  animation-play-state: running;
  animation-name: fadeIn;

  @keyframes fadeIn {
    from {
      opacity: 0;
      display: block;
    }

    to {
      opacity: 1;
      display: block;
    }
  }

  &&[data-type="black"] {
    background-image: url("/icons/navlogo-black.png");
  }

  &&[data-type="white"] {
    background-image: url("/icons/navlogo-white.png");
  }

  &&&& {
    @media (max-width: 772px) {
      & {
        padding-bottom: 52.1%;
        width: 100%;
        height: auto;
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
  position: relative;
  pointer-events: visible;

  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  animation-delay: 1s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: both;
  animation-play-state: running;
  animation-name: fadeIn;

  @keyframes fadeIn {
    from {
      top: -100px;
    }

    to {
      top: 0px;
    }
  }

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

  &&[data-status="close"] {
    & div:first-child {
      transform: translateY(14px) rotate(45deg);
    }

    & div:last-child {
      transform: translateY(-8px) rotate(-45deg);
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
