import styled from "styled-components";

const Nav = styled.div`
  position: fixed;
  width: clamp(400px, 20vw, 600px);
  background: white;
  height: 100vh;
  top: 0px;
  right: 0px;
  z-index: 9600;
  padding-left: 45px;
  padding-right: 25px;
  display: flex;
  flex-direction: column;

  &&[data-status="closed"] {
    transform: translateX(100%);
  }

  @media (max-width: 480px) {
    && {
      width: 100vw;
    }
  }

  box-shadow: 0px 0px 98px 15px rgba(0, 0, 0, 0.04);
`;

const NavBlock = styled.div`
  margin-top: 128px;
  width: 100%;
  display: flex;
  flex-direction: column;

  && > * + * {
    margin-top: 7px;
  }
`;

const NavLink = styled.div`
  line-height: 1;
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  & a,
  & a:hover {
    color: black;
    text-decoration: none;
    font-weight: 400;
  }

  & span {
    border-bottom: 2px solid white;
  }

  & span:hover,
  &[data-active="active"] span {
    border-bottom: 2px solid black;
  }

  &&[data-icon="plus"]::after {
    content: "";
    width: 31px;
    height: 34px;
    background: url("/icons/plusIcon.svg");
    margin-left: 12px;
  }

  &&[data-status="disabled"] {
    & span {
      border-bottom: 0px;
    }
  }
`;

const LinksGap = styled.div`
  height: 40px;
`;

const NavBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;

  &&[data-top="auto"] {
    margin-top: auto;
  }

  &&&&[data-space="nospace"] {
    justify-content: flex-start;
    padding-bottom: 20px;

    & > * + * {
      margin-left: 10px;
    }
  }

  a {
    color: black;
  }
`;

const SearchIcon = styled.div`
  background-image: url("/icons/searchIconBl.svg");
  background-size: cover;
  width: 25px;
  height: 25px;
`;

const Langs = styled.div`
  margin-top: 8px;

  display: flex;
  justify-content: space-between;
  padding-right: 24px;

  && > * + * {
    margin-left: 18px;
  }
`;

Langs.Item = styled.div`
  font-size: 24px;

  border: 1px solid black;
  padding: 0 16px;
`;

const SocNetIcon = styled.div`
  width: 30px;
  height: 30px;

  &[data-type="facebook"] {
    background: url("/icons/soc/fb-icon.svg");
    background-size: cover;
  }

  &[data-type="instagram"] {
    background: url("/icons/soc/ig-icon.svg");
    background-size: cover;
  }
`;

export {
  Nav,
  NavBlock,
  NavLink,
  LinksGap,
  NavBottom,
  SearchIcon,
  Langs,
  SocNetIcon,
};
