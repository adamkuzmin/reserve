import styled from "styled-components";
import { useEffect, useRef } from "react";
import { Text36, Text30, Text24, Text14 } from "../common/text";
import { Space } from "antd";

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
  margin-top: 64px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1100px) and (min-width: 576px) {
    && {
      min-width: 100%;
      display: grid !important;
      grid-template-columns: auto auto auto !important;
    }
  }

  @media (max-width: 576px) {
    && {
      min-width: 100%;
      display: grid !important;
      grid-template-columns: 50% 50%;
      column-gap: 2px;
      row-gap: 45px;
    }
  }
`;

Foot.Col = styled.div`
  width: 100%;
  color: white;
  max-width: max-content;

  && h4 {
    color: white;
  }
`;

Foot.Base = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  margin-top: clamp(60px, 5vw, 140px);
  margin-bottom: 5vw;

  @media (max-width: 576px) {
    & {
      margin-top: 60px;
    }
  }
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

    @media (max-width: 800px) and (min-width: 576px) {
      & {
        margin-top: clamp(12px, 2vw, 16px);
      }
    }

    @media (max-width: 576px) {
      & {
        margin-top: 12px;
      }
    }
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
  height: 60px;
  border-left: 0px;
  border-top: 0px;
  border-right: 0px;
  border-bottom: 1px solid white;
  background: none;
  color: white;
  text-align: center;
  font-size: clamp(16px, 1.6vw, 30px);
  border-radius: 0px !important;

  @media (max-width: 576px) {
    & {
      font-size: 16px;
    }
  }

  &&::placeholder {
    text-align: center;
    font-size: clamp(16px, 2.1vw, 30px);
    color: #9f9f9f;
  }

  @media (max-width: 576px) {
    &&::placeholder {
      text-align: center;
      font-size: 16px;
      color: #9f9f9f;
    }
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

  const showSearchPanel = useStore(({ showSearchPanel }) => showSearchPanel);

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
        <SearchInput
          onClick={() => showSearchPanel(true)}
          data-font="ibm"
          type="text"
          placeholder="Поиск по сайту"
        />
      </Foot.Search>
      <Foot.Sections>
        {FooterData.map((key, i) => {
          return (
            <Foot.Col key={`Foot.Col${i}`}>
              <StyledH4>
                <Text36 data-font="ibm" style={{ fontWeight: "600" }}>
                  {key.title}
                </Text36>
              </StyledH4>
              <LinksBlock>
                {key.title !== "Контакты" ? (
                  key?.links?.map((link, b) => {
                    return (
                      <Text24 data-font="ibm" key={`footer.a.${b}`}>
                        <a>{link.name}</a>
                      </Text24>
                    );
                  })
                ) : (
                  <>
                    <Space
                      direction="vertical"
                      size={40}
                      style={{ maxWidth: "350px" }}
                    >
                      <Space direction="vertical" size={10}>
                        <Text24 style={{ fontWeight: "600" }}>
                          +7 495 755 69 60
                        </Text24>
                        <Text24 style={{ fontWeight: "600" }}>
                          +7 495 280 75 25
                        </Text24>
                      </Space>

                      <Space direction="vertical" size={10}>
                        <Text24 style={{ fontWeight: "600" }}>
                          ООО «ТПО “Резерв”»
                        </Text24>
                        <Text14 style={{ color: "rgb(162 162 162)" }}>
                          Фактический адрес: <br />
                          Ленинградский проспект, 31А стр. 1, Москва, 125284,
                          Россия
                          <br />
                          <br />
                          Юридический адрес:
                          <br /> Ул. Грузинская Б. дом 20, офис 4, Москва,
                          123242, Россия
                        </Text14>
                      </Space>

                      <Space direction="vertical" size={10}>
                        <Text24 style={{ fontWeight: "600" }}>
                          Сотрудничество и общие вопросы
                        </Text24>
                        <Text24 style={{ textDecoration: "underline" }}>
                          info@reserve.ru
                        </Text24>
                      </Space>

                      <Space direction="vertical" size={10}>
                        <Text24 style={{ fontWeight: "600" }}>Пресса</Text24>
                        <Text24 style={{ textDecoration: "underline" }}>
                          press@reserve.ru
                        </Text24>
                      </Space>

                      <Space direction="vertical" size={10}>
                        <Text24 style={{ fontWeight: "600" }}>
                          Работа в «Резерве»
                        </Text24>
                        <Text14 style={{ color: "rgb(162 162 162)" }}>
                          Мы всегда заинтересованы в талантах! Присылайте ваше
                          портфолио и резюме. Размер прикрепленных к письму
                          файлов не должны превышать 10 мб.
                        </Text14>
                        <Text24 style={{ textDecoration: "underline" }}>
                          ok@reserve.ru
                        </Text24>
                      </Space>
                    </Space>
                  </>
                )}
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
          <a>
            <Text30 data-font="ibm">EN</Text30>
          </a>
        </SocialNets>
      </Foot.Base>
    </Foot>
  );
};

export default Footer;
