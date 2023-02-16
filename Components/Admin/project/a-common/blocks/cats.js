import { gql, useQuery } from "@apollo/client";
import client from "../../../../Client/apollo/apollo-client";
import { useMemo } from "react";
import { Text14, Text24, Wrap16 } from "../../../../common/text";
import { Col } from "antd";
import { BlackRow, FLink, LabelRow } from "../../../../Filters/styles";

const CATS = gql`
  query getProjects {
    tiger_data_r_cat_hub {
      id
      name
    }
  }
`;

const Cats = ({ value, onChange }) => {
  const { data: catsData, loading } = useQuery(CATS, { client });
  const cats = useMemo(() => {
    if (catsData) {
      const { tiger_data_r_cat_hub = [] } = catsData;
      return tiger_data_r_cat_hub;
    }
  }, [catsData]);

  const handleSelect = (id) => {
    let result = value ? [...value] : [];
    if (result.includes(id)) {
      result = result.filter((d) => d !== id);
    } else {
      result = [...result, id];
    }

    onChange(result);
  };

  if (loading) return <></>;

  return (
    <>
      <Col>
        <LabelRow justify="space-between">
          <Col>
            <Text14 data-font="wremena">
              2.1 Вы можете выбрать несколько категорий одновременнно
            </Text14>
          </Col>
        </LabelRow>
        <BlackRow>
          {cats &&
            cats.map((item = {}, i) => (
              <FLink
                data-size="small"
                data-theme="white"
                key={`FilterDir${i}`}
                onClick={() => handleSelect(item.id)}
                data-status={value && value.includes(item.id) && "active_"}
              >
                <Text14>{item.name}</Text14>
              </FLink>
            ))}
        </BlackRow>
      </Col>
    </>
  );
};

export default Cats;
