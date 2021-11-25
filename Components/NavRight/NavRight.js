import styled from "styled-components";
import {
  Text254,
  Text96,
  Text60,
  Text48,
  Text40,
  Text36,
  Text30,
  Text24,
} from "../common/text";
import Link from "next/link";

const Nav = styled.div`
  position: fixed;
  width: 300px;
  background: white;
  height: 100vh;
  top: 0px;
  right: 0px;
  z-index: 4000;
  padding-left: 25px;
  padding-right: 25px;

  &&[data-status="closed"] {
    transform: translateX(100%);
  }
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

  & a,
  & a:hover {
    color: black;
    text-decoration: none;
    font-weight: 400;
  }

  & span {
    border-bottom: 3px solid black;
  }

  & span:hover {
    border-bottom: 3px solid white;
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

const NavBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;

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
  display: flex;
  justify-content: space-between;
  padding-right: 24px;

  && > * + * {
    margin-left: 18px;
  }
`;

Langs.Item = styled.div`
  font-size: 28px;
`;

const NavRight = ({ MiniNavIsOpened }) => {
  return (
    <Nav data-status={MiniNavIsOpened ? "opened" : "closed"}>
      <NavBlock>
        <NavLink data-status="disabled" data-icon="plus">
          <Text48>
            <Link href="/" rel="nofollow">
              <a>Резерв</a>
            </Link>
          </Text48>
        </NavLink>
        <NavLink>
          <Text48>
            <Link href="/projects" rel="nofollow">
              <a data-font="ibm">Проекты</a>
            </Link>
          </Text48>
        </NavLink>
        <NavLink>
          <Text48>
            <a data-font="ibm">Медиа</a>
          </Text48>
        </NavLink>
        <NavLink>
          <Text48>
            <a data-font="ibm">Контакты</a>
          </Text48>
        </NavLink>
      </NavBlock>
      <NavBottom>
        <SearchIcon />
        <Langs>
          <Langs.Item>
            <a data-font="ibm">RU</a>
          </Langs.Item>
          <Langs.Item>
            <a data-font="ibm">EN</a>
          </Langs.Item>
        </Langs>
      </NavBottom>
    </Nav>
  );
};

export default NavRight;
