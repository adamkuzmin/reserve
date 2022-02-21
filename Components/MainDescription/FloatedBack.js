import styled from "styled-components";

const Back = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: grey;
  background-image: url("/renders/15.jpg");
  background-size: cover;
  background-attachment: fixed;

  @media (max-width: 480px) {
    & {
      background-attachment: unset;
      height: 29vh;
    }
  }
`;

const FloatedBack = () => {
  return <Back></Back>;
};

export default FloatedBack;
