import styled from "styled-components";
import { useEffect, useRef } from "react";
import { Text36, Text30, Text24 } from "../common/text";

import { useStore } from "../../Store/useStore";

const Foot = styled.div`
  width: 100%;
  padding-top: 4.4vw;
`;

Foot.Search = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2vw;
  width: 100%;
  max-width: 1486px;
  min-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1100px) {
    & {
      min-width: auto;
    }
  }
`;

Foot.Sections = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1376px;
  min-width: 1000px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1100px) {
    flex-wrap: wrap;
    min-width: auto;
  }
`;

Foot.Col = styled.div`
  width: 100%;
  color: white;

  && h4 {
    color: white;
  }
`;

Foot.Base = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  margin-top: 5vw;
  margin-bottom: 5vw;
`;

const SocialNets = styled.div`
  display: flex;
  align-items: center;

  && > * + * {
    margin-left: 42px;
  }

  && a {
    color: white;
    text-decoration: none;
  }
`;

const SIcon = styled.div`
  width: 25px;
  height: 25px;
  background-size: cover;

  &&[data-type="facebook"] {
    background-image: url("/icons/fbIcon.svg");
  }

  &&[data-type="instagram"] {
    background-image: url("/icons/igIcon.svg");
  }

  &&:hover {
    cursor: pointer;
  }
`;

const LinksBlock = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;

  && > * + * {
    margin-top: 16px;
  }

  && a {
    color: white;
  }

  && a:hover {
    opacity: 0.75;
  }
`;

const SearchIcon = styled.div`
  width: 26px;
  height: 26px;
  background: url("/icons/searchIcon.svg");
  background-size: cover;
  margin-right: 32px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  border-left: 0px;
  border-top: 0px;
  border-right: 0px;
  border-bottom: 1px solid white;
  background: none;
  color: white;
  font-size: 30px;

  &&::placeholder {
    font-size: 30px;
    color: #9f9f9f;
  }
`;

const CloseIcon = styled.div`
  width: 53px;
  height: 44px;
  background: url("/icons/closeIcon.svg");
  background-size: cover;
`;

const StyledH4 = styled.div`
  margin-bottom: 20px;
  font-weight: 400;
`;

const FooterData = [
  {
    title: "Резерв",
    links: [
      { name: "Бюро" },
      { name: "Команда" },
      { name: "Карьера" },
      { name: "Заказчики" },
      { name: "Награды" },
      { name: "Документация" },
    ],
  },
  {
    title: "Проекты",
    links: [
      { name: "Жилые" },
      { name: "Офисно-административные" },
      { name: "Торговые" },
      { name: "Культура" },
      { name: "Инфраструктура и транспорт" },
      { name: "Смешанная функция" },
      { name: "Градостроительство" },
      { name: "Построенные" },
      { name: "Текущие" },
      { name: "Конкурсные" },
      { name: "Арт-объекты и дизайн" },
    ],
  },
  {
    title: "Медиа",
    links: [
      { name: "Новости" },
      { name: "Публикации" },
      { name: "Выставки" },
      { name: "Интервью" },
      { name: "Лекции" },
    ],
  },
  {
    title: "Контакты",
    links: [],
  },
];

const Footer = () => {
  const blackLogo = useStore((state) => state.blackLogo);
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  const FooterRef = useRef();

  useEffect(() => {
    const onScroll = (e) => {
      const BoundingRect = FooterRef?.current?.getBoundingClientRect();

      if (
        BoundingRect &&
        BoundingRect.top <= 0 &&
        BoundingRect.bottom >= 0 &&
        blackLogo
      ) {
        setBlackLogo(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <Foot ref={FooterRef}>
      <Foot.Search>
        <SearchIcon />
        <SearchInput data-font="ibm" type="text" placeholder="Поиск по сайту" />
      </Foot.Search>
      <Foot.Sections>
        {FooterData.map((key, i) => {
          return (
            <Foot.Col key={`Foot.Col${i}`}>
              <StyledH4>
                <Text36 data-font="ibm" style={{fontWeight: '600'}}>{key.title}</Text36>
              </StyledH4>
              <LinksBlock>
                {key?.links?.map((link, b) => {
                  return (
                    <Text24 data-font="ibm" key={`footer.a.${b}`}>
                      <a>{link.name}</a>
                    </Text24>
                  );
                })}
              </LinksBlock>
            </Foot.Col>
          );
        })}
      </Foot.Sections>
      <Foot.Base>
        <p>
          <Text30 data-font="ibm">© 1987—2021 Резерв</Text30>
        </p>
        <SocialNets>
          <SIcon data-type="facebook" />
          <SIcon data-type="instagram" />
          <a>
            <Text30 data-font="ibm">EN</Text30>
          </a>
        </SocialNets>
      </Foot.Base>
    </Foot>
  );
};

export default Footer;
