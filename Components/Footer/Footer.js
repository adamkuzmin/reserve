import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Text36, Text30, Text24, Text14 } from "../common/text";
import { Space } from "antd";
import { sanity } from "@/Components/Client/sanity/sanity-client";

import { useStore } from "../../Store/useStore";
import groq from "groq";
import Link from "next/link";

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
    entitle: "Reserve",
    links: [
      { name: "Бюро", enname: "Bureau", await: 1 },
      { name: "Команда", enname: "Team", await: 2 },
      { name: "Карьера", enname: "Career", await: 3 },
      { name: "Заказчики", enname: "Customers", await: 4 },
      { name: "Награды", enname: "Awards", await: 5 },
    ],
  },
  {
    title: "Проекты",
    entitle: "Projects",
    links: [
      { name: "Жилые", enname: "Residential" },
      { name: "Офисно-административные", enname: "Office and administrative" },
      { name: "Торговые", enname: "Trade" },
      { name: "Культура", enname: "Culture" },
      {
        name: "Инфраструктура и транспорт",
        enname: "Infrastructure and transport",
      },
      { name: "Смешанная функция", enname: "Mixed function" },
      { name: "Градостроительство", enname: "Urban planning" },
      { name: "Построенные", enname: "Built" },
      { name: "Текущие", enname: "Current" },
      { name: "Конкурсные", enname: "Competitive" },
      { name: "Арт-объекты и дизайн", enname: "Art objects and design" },
    ],
  },
  {
    title: "Медиа",
    entitle: "Media",
    links: [
      { name: "Новости", enname: "News", await: "news" },
      { name: "Публикации", enname: "Publications", await: "publications" },
      { name: "Выставки", enname: "Exhibitions", await: "exhibitions" },
      { name: "Интервью", enname: "Interview", await: "interviews" },
    ],
  },
  {
    title: "Контакты",
    entitle: "Contacts",
    links: [],
  },
];

const Footer = () => {
  const blackLogo = useStore((state) => state.blackLogo);
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  const lang = useStore((state) => state.lang);
  const setLang = useStore((state) => state.setLang);

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

  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catsFetched, setCatsFetched] = useState(false);

  useEffect(() => {
    setLoading(true);

    const categoriesFields = groq`
    _id,
    name,
    cr
    `;

    const query = groq`
      *[_type == "categories"] {
        ${categoriesFields}
      }
      | order(cr desc)
    `;

    setLoading(true);

    sanity
      .fetch(query)
      .then((data) => {
        setCats(data);
        setCatsFetched(true);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <Foot ref={FooterRef}>
      <Foot.Search>
        <SearchInput
          onClick={() => showSearchPanel(true)}
          data-font="ibm"
          type="text"
          placeholder={lang === "ru" ? "Поиск по сайту" : "Search site"}
        />
      </Foot.Search>
      <Foot.Sections>
        {FooterData.map((key = {}, i) => {
          let { links = [] } = key;

          if (i === 1) {
            links = cats || [];
            links = links.map((item = {}) => {
              const { _id, name } = item;

              return { _id, name, enname: name, await: name };
            });
          }

          return (
            <Foot.Col key={`Foot.Col${i}`}>
              <StyledH4>
                <Text36 data-font="ibm" style={{ fontWeight: "600" }}>
                  {lang === "ru" ? key.title : key.entitle}
                </Text36>
              </StyledH4>
              <LinksBlock>
                {key.title !== "Контакты" ? (
                  links.map((link = {}, b) => {
                    const href =
                      key.title === "Проекты"
                        ? "/projects/"
                        : key.title === "Резерв"
                        ? "/about/"
                        : "/media/all/";

                    const hrefAwait = "await";

                    return (
                      <Link href={`${href}?${hrefAwait}=${link.await}`}>
                        <Text24 data-font="ibm" key={`footer.a.${b}`}>
                          <a>{lang === "ru" ? link.name : link.enname}</a>
                        </Text24>
                      </Link>
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
                          {lang === "ru"
                            ? "ООО «ТПО “Резерв”»"
                            : "TPO Reserve Ltd."}
                        </Text24>
                        <Text14 style={{ color: "rgb(162 162 162)" }}>
                          {lang === "ru" ? (
                            <>
                              Фактический адрес: <br />
                              Ленинградский проспект, 31А стр. 1, Москва,
                              125284, Россия
                              <br />
                              <br />
                              Юридический адрес:
                              <br /> Ул. Грузинская Б. дом 20, офис 4, Москва,
                              123242, Россия
                            </>
                          ) : (
                            <>
                              Actual address: <br />
                              31A, Leningradsky prospect, bld. 1, Moscow,
                              125284, Russia
                              <br />
                              <br />
                              Legal address:
                              <br />
                              20 Gruzinskaya str., office 4, Moscow, 123242,
                              Russia
                            </>
                          )}
                        </Text14>
                      </Space>

                      <Space direction="vertical" size={10}>
                        <Text24 style={{ fontWeight: "600" }}>
                          {lang === "ru"
                            ? "Сотрудничество и общие вопросы"
                            : "Cooperation and common issues"}
                        </Text24>
                        <Text24 style={{ textDecoration: "underline" }}>
                          info@reserve.ru
                        </Text24>
                      </Space>

                      <Space direction="vertical" size={10}>
                        <Text24 style={{ fontWeight: "600" }}>
                          {lang === "ru" ? "Пресса" : "Press"}
                        </Text24>
                        <Text24 style={{ textDecoration: "underline" }}>
                          press@reserve.ru
                        </Text24>
                      </Space>

                      <Space direction="vertical" size={10}>
                        <Text24 style={{ fontWeight: "600" }}>
                          {lang === "ru"
                            ? "Работа в «Резерве»"
                            : "Working in the Reserves"}
                        </Text24>
                        <Text14 style={{ color: "rgb(162 162 162)" }}>
                          {lang === "ru" ? (
                            <>
                              Мы всегда заинтересованы в талантах! Присылайте
                              ваше портфолио и резюме. Размер прикрепленных к
                              письму файлов не должны превышать 10 мб.
                            </>
                          ) : (
                            <>
                              We are always interested in talent! Send your
                              portfolio and CV. Please send your portfolio and
                              CV to us. of your email should not exceed 10 MB.
                            </>
                          )}
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
          <Text30 data-font="ibm">
            © 1987—{new Date().getFullYear()} Резерв
          </Text30>
        </p>
        <SocialNets>
          <a onClick={() => setLang(lang === "en" ? "ru" : "en")}>
            <Text30 data-font="ibm">{lang === "en" ? "RU" : "EN"}</Text30>
          </a>
        </SocialNets>
      </Foot.Base>
    </Foot>
  );
};

export default Footer;
