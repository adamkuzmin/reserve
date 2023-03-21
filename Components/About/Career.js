import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Content } from "../common/body";
import {
  ContentFlex,
  Gap,
  LocalTitle,
  VertFlex,
  LeadQuote,
  ShowBtn,
} from "./common/styles";

import { Text60, Text48, Text36, Text30, Text24 } from "../common/text";
import { cover, career } from "./career/data";
import { Grid, Row, Col, Form } from "antd";
import groq from "groq";
import { sanity } from "../Client/sanity/sanity-client";
import QuillEditor from "../Admin/project/b-editor/blocks/quill";

const { useBreakpoint } = Grid;

const BackCover = styled.div`
  width: 100vw;
  min-height: 41vw;

  background: url("/about/office/4.jpg");
  background-size: cover;
`;

const MainContent = styled.div`
  width: 100%;
  max-width: clamp(300px, 59vw, 1140px);

  @media (max-width: 576px) {
    & {
      max-width: 300px;
    }
  }

  display: flex;
  flex-direction: column;
`;

const Career = () => {
  const logId = useStore(({ logId }) => logId);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = groq`
      *[_type == "vacancies"] {
        _id,
        name,
        description,
        cr
      }
      | order(cr desc)
    `;

    setLoading(true);

    sanity
      .fetch(query)
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [logId]);

  console.log("projects", projects);

  const lang = useStore((state) => state.lang);
  const screens = useBreakpoint();

  const setBlackLogo = useStore((state) => state.setBlackLogo);
  const blackLogo = useStore((state) => state.blackLogo);

  useEffect(() => {
    setBlackLogo(false);
  }, []);

  const backRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      if (backRef && backRef.current) {
        const maincontent = backRef.current.getBoundingClientRect();

        if (maincontent.top <= 0 && maincontent.bottom >= 0 && blackLogo) {
          setBlackLogo(false);
        }
      }

      if (contentRef && contentRef.current) {
        const maincontent1 = contentRef.current.getBoundingClientRect();

        if (maincontent1.top <= 0 && maincontent1.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <>
      <BackCover ref={backRef}>
        <Content background="none">
          <Gap sheight={"120px"} />
          <LocalTitle size={60} style={{ color: "white" }}>
            {cover.title[lang]}
          </LocalTitle>
          <Gap sheight={"60px"} />

          <ContentFlex>
            <Row>
              {screens.lg && <Gap swidth={`12.1vw`} />}
              <Col span={screens.lg ? 15 : 24}>
                <Text60 style={{ color: "white" }} data-font="wremena">
                  {cover.descr[lang]}
                </Text60>
              </Col>
            </Row>
          </ContentFlex>

          <Gap sheight={"120px"} />
        </Content>
      </BackCover>

      <Content ref={contentRef}>
        <Gap sheight={"80px"} />
        <LocalTitle size={60}>{career.title[lang]}</LocalTitle>

        <Gap sheight={"80px"} />

        <ContentFlex>
          {screens.sm && <Gap swidth={`12.1vw`} />}

          <MainContent>
            <Text36 style={{ color: "#939393" }}>{career.nojobs[lang]}</Text36>
            <Gap sheight={`90px`} />

            {projects &&
              projects.map((item = {}) => {
                const { name, description, _id } = item;

                console.log("description", description);

                return (
                  <React.Fragment key={`d:${_id}`}>
                    <LocalTitle size={48}>{name}</LocalTitle>
                    <Gap sheight={`36px`} />

                    <Form initialValues={{ description }}>
                      <Form.Item name="description">
                        <QuillEditor
                          {...{ isEdit: false }}
                          type="description"
                        />
                      </Form.Item>
                    </Form>

                    <Gap sheight={`24px`} />
                    <ShowBtn>
                      <Text24 data-font="wremena">
                        {lang === "ru" ? "Откликнуться" : "Apply for the job"}
                      </Text24>
                    </ShowBtn>

                    <Gap sheight={`90px`} />
                  </React.Fragment>
                );
              })}
          </MainContent>
        </ContentFlex>
      </Content>

      <Gap sheight={"120px"} />
    </>
  );
};

export default Career;
