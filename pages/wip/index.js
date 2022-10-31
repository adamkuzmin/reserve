import styled from "styled-components";
import { Typography, Space } from "antd";
const { Title, Text } = Typography;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const WIPPage = () => {
  return (
    <>
      <Wrapper>
        <Space direction="vertical" align="center" size={0}>
          <Title>Ведутся технические работы</Title>
          <Text data-font="wremena">Сайт снова станет доступен с 01 ноября</Text>
        </Space>
      </Wrapper>
    </>
  );
};

export default WIPPage;
