import styled from "styled-components";
import ThreeCanvas from "../Models/construcetor";

const CanvasWrapper = styled.div`
  width: 673.5px;
  height: 778px;
  border: 1px solid grey;
  border-radius: 50px;
`;

const ThreeIndex = () => {
  return (
    <CanvasWrapper>
      <ThreeCanvas />
    </CanvasWrapper>
  );
};

export default ThreeIndex;
