import styled from "styled-components";

const Back = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: grey;
  background-image: url("/renders/15.jpg");
  background-size: cover;
  background-attachment: fixed;
`;

const FloatedBack = () => {
  return <Back></Back>;
};

export default FloatedBack;
