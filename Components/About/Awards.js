import React from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Content } from "../common/body";
import { Space } from "antd";

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

  return (
    <>
      <Content>
        <Gap sheight={"120px"} />

        <LocalTitle size={60}>{intro.title[lang]}</LocalTitle>
        <Gap sheight={"60px"} />

        <LeadDescription>
          <Text36>{intro.descr[lang]}</Text36>
        </LeadDescription>

        {awardsData.map(({ year, list }) => {
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
                        {items.map(({ name, label }) => {
                          return (
                            <Space direction="vertical" size={0}>
                              <LocalTitle size={30}>{name[lang]}</LocalTitle>
                              <Text24>{label[lang]}</Text24>
                            </Space>
                          );
                        })}
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
