import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Content } from "../common/body";
import { Space } from "antd";
import { projectData } from "../ProjectsLayout/data/data";
import { MouseContext } from "../common/Cursor/mouse-context";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { AwardsHeaderQuery, AwardsRefQuery } from "../Admin/queries/__queries";

import { intro, awardsData } from "./awards/data";

import {
  ContentFlex,
  Gap,
  LocalTitle,
  VertFlex,
  LeadQuote,
  ShowBtn,
  LeadDescription,
} from "./common/styles";

import { Text96, Text36, Text30, Text24 } from "../common/text";
import groq from "groq";

const AwardsList = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  row-gap: 50px;
`;

const Award = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

Award.Photo = styled.div`
  width: 100%;
  padding-bottom: 51%;
  background-color: lightgrey;

  background-image: url(${({ url }) => (url ? `"${url}"` : "")});
  background-size: cover;

  margin-bottom: 28px;
  border: 1px solid #c2c2c2;
`;

const Awards = () => {
  const lang = useStore((state) => state.lang);

  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  const setBlackLogo = useStore((state) => state.setBlackLogo);
  const blackLogo = useStore((state) => state.blackLogo);

  useEffect(() => {
    setBlackLogo(true);
  }, []);

  const contentRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      if (contentRef && contentRef.current) {
        const maincontent = contentRef.current.getBoundingClientRect();

        if (maincontent.top <= 0 && maincontent.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const [projects, setProjects] = useState([]);
  const [refs, setRefs] = useState([]);

  useEffect(() => {
    const AwardsQuery = groq`
    *[_type == "awards"] | order(year desc) {
      _id,
      year,
      cover,
      cr,
      awards_refs
    }
  `;

    const fetchData = async () => {
      setLoading(true);

      const [awardsData, refsData] = await Promise.all([
        sanity.fetch(AwardsQuery),
        sanity.fetch(AwardsRefQuery),
      ]);

      setProjects(awardsData);
      setRefs(refsData);
      setFetched(true);
      setLoading(false);
    };

    fetchData().catch(console.error);
  }, []);

  const awardsUnits = useMemo(() => {
    if (!fetched) return;

    let extProjects = [...projects].map((item = {}) => {
      let awards_refs = item.awards_refs || [];

      awards_refs = awards_refs
        .map((id) => {
          const ref = refs.find(({ _id }) => id === _id);
          return ref;
        })
        .filter((item) => item);

      return { ...item, awards_refs };
    });

    const rearrangeByYear = (arr) => {
      const result = arr.reduce((acc, cur) => {
        const year = cur.year.toString();

        if (!acc[year]) {
          acc[year] = { year, list: [cur] };
        } else {
          acc[year].list.push(cur);
        }

        return acc;
      }, {});

      return Object.values(result)
        .sort((a, b) => b.year - a.year)
        .map((obj) => ({
          ...obj,
          year: obj.year.toString(),
          list: obj.list.map((item, i) => {
            const { cover, awards_refs = [] } = item;

            return {
              photo: cover,
              items: awards_refs.map((a) => {
                let { cover: label, project = {} } = a;
                project = project || {};

                let { name, coververt, coverhor } = project;

                return {
                  index: i,
                  label: { ru: label, en: label },
                  name: { ru: name, en: name },
                  coververt,
                  coverhor,
                };
              }),
            };
          }),
        }));
    };

    extProjects = rearrangeByYear(extProjects);

    return extProjects;
  }, [fetched, projects, refs]);

  const [values, setValues] = useState();
  const [isFetched1, setFetched1] = useState(false);

  useEffect(() => {
    const query = AwardsHeaderQuery;

    sanity
      .fetch(query)
      .then((data) => {
        setValues(data);
        setFetched1(true);
      })
      .catch(() => setFetched1(true));
  }, []);

  const initialValues = useMemo(() => {
    if (!(values && isFetched1)) return;

    if (values.length > 0) return values[0];
  }, [values, isFetched1]);

  return (
    <>
      <Content ref={contentRef}>
        <Gap sheight={"120px"} />

        <LocalTitle size={60}>{intro.title[lang]}</LocalTitle>
        <Gap sheight={"60px"} />

        <LeadDescription>
          {initialValues && <Text36>{initialValues.description}</Text36>}
        </LeadDescription>

        {awardsUnits &&
          awardsUnits.map(({ year, list }) => {
            return (
              <>
                <Gap sheight={"120px"} />
                <Text96
                  data-font="ibm"
                  style={{ fontWeight: "600", color: "black" }}
                >
                  {year}
                </Text96>

                <Gap sheight={"60px"} />

                <AwardsList>
                  {list.map(({ photo, items }) => {
                    return (
                      <Award>
                        <Award.Photo url={photo} />

                        <Space direction="vertical" size={12}>
                          {items.map(
                            ({ name, label, index, coververt, coverhor }) => {
                              const cover =
                                index % 2 === 0 ? coververt : coverhor;
                              const coverClass =
                                index % 2 === 0 ? "renderHor-1" : "renderVer-3";

                              const metaSrc = cover || "";

                              return (
                                <Space
                                  direction="vertical"
                                  size={0}
                                  onMouseEnter={() =>
                                    cursorChangeHandler({
                                      url: metaSrc,
                                      coverClass,
                                    })
                                  }
                                  onMouseLeave={() => cursorChangeHandler(null)}
                                >
                                  <LocalTitle size={30}>
                                    {name[lang]}
                                  </LocalTitle>
                                  <Text24>{label[lang]}</Text24>
                                </Space>
                              );
                            }
                          )}
                        </Space>
                      </Award>
                    );
                  })}
                </AwardsList>
              </>
            );
          })}

        <Gap sheight={"120px"} />
      </Content>
    </>
  );
};

export default Awards;
