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
  background-image: url(${({src}) => src ? src : ''});
  background-size: cover;
`;

const OtherRenders = () => {
  return (
    <OR>
      <OR.Row>
        <OR.Item src={"/renders/20.jpg"} />
        <OR.Item src={"/renders/21.jpg"} />
      </OR.Row>
      <OR.Row>
        <OR.Item src={"/renders/22.jpg"} />
        <OR.Item src={"/renders/23.jpg"} />
      </OR.Row>
    </OR>
  );
};

export default OtherRenders;
