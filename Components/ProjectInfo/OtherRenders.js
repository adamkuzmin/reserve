import { Image } from "antd";
import styled from "styled-components";

const OR = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10vw;

  && > * + * {
    margin-top: 30px;
  }
`;

OR.Row = styled.div`
  width: 100%;
  display: flex;

  && > * + * {
    margin-left: 30px;
  }
`;

OR.Item = styled.div`
  width: 100%;
  background-color: grey;
  height: 30vw;
   background-image: url(${({ src }) => (src ? src : "")}); 
  background-position: center;
  background-size: cover;
  overflow: hidden;
  position: relative;

  && .ant-image {
    width: 100%;
    position absolute;
    z-index: 0;
  }
`;

const OtherRenders = ({ images = [] }) => {
  return (
    <OR>
      {Array(Math.ceil(images.length / 2))
        .fill(1)
        .map((_, rowIndex) => {
          const rowImages = images.filter(
            (_, i) => i >= rowIndex * 2 && i < rowIndex * 2 + 2
          );

          return (
            <OR.Row key={`g:${rowIndex}`}>
              {rowImages &&
                rowImages.map((src, b) => {
                  return (
                    <OR.Item key={`d:${b}:${rowIndex}`} src={src}>
                      {/* <Image src={src} style={{ width: "100%" }} /> */}
                    </OR.Item>
                  );
                })}
            </OR.Row>
          );
        })}
    </OR>
  );
};

export default OtherRenders;
