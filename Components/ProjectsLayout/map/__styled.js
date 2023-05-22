import styled from "styled-components";

export const CirclePoint = styled.div`
  width: 22px;
  height: 22px;
  background: black;
  cursor: pointer;
  transition: transform 0.6s ease-in-out;

  border: 2.2px solid ${({ color }) => (color ? color : "black")};
  filter: brightness(1.75);

  &&:hover {
    transform: scale(1.1);
  }

  &&[data-type="0"] {
    border-radius: 50%;
  }

  &&[data-type="1"] {
    transform: rotate(45deg);
  }

  &&[data-type="2"] {
    border-radius: 30%;
  }
`;

export const RectProject = styled.div`
  width: 300px;
  height: 400px;
  background: grey;
  positon: fixed;
  z-index: 80;
`;

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 140px;

  border: 1px solid black;
  background-color: lightgrey;
  width: 100%;
  height: 46vw;

  @media (max-width: 576px) {
    &&& {
      width: 100vw;
      height: 100vh;
      margin-left: -20px;
    }
  }
`;

export const StatusLoader = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  padding: 10px 20px;
  border-radius: 50px;

  &&& * {
    color: white;
    font-size: 14px;
  }
`;
