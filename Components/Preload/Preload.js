import styled from "styled-components";

const BackWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
  position: fixed;
  z-index: 8000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  width: 317px;
  height: 50px;
  background: url("/icons/preloadIcon.svg");

  -webkit-animation: fadein 2s ease-out;
  -moz-animation: fadein 2s ease-out;
  -ms-animation: fadein 2s ease-out;
  -o-animation: fadein 2s ease-out;
  animation: fadein 2s ease-out;

  @keyframes fadein {
    0% {
      opacity: 0;
      transform: scale(1);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const Preload = () => {
  return (
    <BackWrapper>
      <Logo />
    </BackWrapper>
  );
};

export default Preload;
