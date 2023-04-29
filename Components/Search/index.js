import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Input, Row, Col, Spin, Typography } from "antd";

import { Content } from "../common/body";
import { Gap } from "../About/common/styles";

import { Text24, Text36 } from "../common/text";
import { sanity } from "../Client/sanity/sanity-client";
import Link from "next/link";

const { Text } = Typography;

const Wrapper = styled.div`
  background: white;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: scroll;

  padding: 50px auto;

  background: white;
  z-index: 99;

  left: 0;
  top: 0;

  &[data-display="show"] {
    opacity: 1;
  }

  &[data-display="hide"] {
    opacity: 0;
    pointer-events: none;
  }
`;

const InputSearch = styled(Input.Search)`
  && .ant-input-group-addon {
    display: none;
  }

  && .ant-input {
    text-align: center;
    font-size: 40px;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid black;

    @media (max-width: 576px) {
      font-size: 24px;
    }

    &:hover {
      border-color: white;
      border-bottom: 1px solid black;
    }

    &:hover,
    &:focus {
      box-shadow: none;
      border-bottom: 1px solid black;
    }
  }
`;

const SearchPanel = ({ visible }) => {
  const searchRef = useRef();
  const [loading, setLoading] = useState(false);

  const [note, showNote] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  console.log("searchResults", searchResults);

  const handleSearch = async (query) => {
    if (query.length >= 1) {
      setLoading(true);
      showNote(true);

      const results = await sanity.fetch(
        `*[_type in ["projects", "news", "interviews", "exhibitions", "publications", "team_members", "awards_ref"] && name match $query]{
          _id,
          _type,
          name,
        }`,
        { query: `*${query}*` }
      );

      setSearchResults(results);
      setLoading(false);
    } else {
      showNote(false);
      setSearchResults([]);
    }
  };

  return (
    <Wrapper data-display={visible ? "show" : "hide"}>
      <Content>
        <Gap sheight={`120px`} />
        <InputSearch
          placeholder="Введите запрос и нажмите 'Enter'"
          autoFocus
          ref={searchRef}
          enterButton={false}
          addonAfter={false}
          onPressEnter={(e) => handleSearch(e.target.value)}
        />

        {true && (
          <Row justify="center" style={{ width: "100%" }}>
            <Col>
              <Gap sheight={`120px`} />

              <Spin spinning={loading}>
                {searchResults && searchResults.length === 0 && (
                  <Text36>Ничего не найдено по запросу</Text36>
                )}

                {searchResults &&
                  searchResults.length > 0 &&
                  searchResults.map((result) => {
                    let type;
                    let href;

                    let t = result._type;

                    switch (t) {
                      case "projects": {
                        type = "Проекты";
                        href = `/project/${result._id}`;
                        break;
                      }
                      case "news": {
                        type = "Новости";
                        href = `/media/all?await=news`;
                        break;
                      }
                      case "interviews": {
                        type = "Интервью";
                        href = `/media/all?await=interviews`;
                        break;
                      }
                      case "exhibitions": {
                        type = "Выставки";
                        href = `/media/all?await=exhibitions`;
                        break;
                      }
                      case "publications": {
                        type = "Публикации";
                        href = `/media/all?await=publications`;
                        break;
                      }
                      case "team_members": {
                        type = "Команда";
                        href = `/about?await=2`;
                        break;
                      }
                      case "awards_ref": {
                        type = "Номинации | Награды";
                        href = `/about?await=5`;
                        break;
                      }
                    }

                    return (
                      <Link href={href} target={"_blank"}>
                        <div
                          key={result._id}
                          style={{ marginBottom: "24px", maxWidth: "900px" }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div style={{ color: "black" }}>{type}</div>

                            <Text
                              ellipsis={{ rows: 3 }}
                              style={{ fontSize: "30px", fontWeight: "700" }}
                            >
                              {result.name}
                            </Text>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </Spin>
            </Col>
          </Row>
        )}
      </Content>
    </Wrapper>
  );
};

export default SearchPanel;
