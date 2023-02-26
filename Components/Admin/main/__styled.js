import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  width: 100%;

  grid-template-columns: repeat(${({ cols }) => (cols ? cols : 1)}, 1fr);
  column-gap: 10px;
  row-gap: 10px;

  margin-top: 24px;
`;

export const Card = styled.div`
  width: 100%;
  padding: 50px;
  // border: 3px solid black;
  border-radius: 40px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 200px;
  overflow: hidden;

  &,
  & * {
    color: white;
    font-weight: 600;
  }

  & span {
    z-index: 2;
    
  }

  &&::before {
    z-index: 0;
    content: "";
    position: absolute;
    background: #282828;

    width: 100%;
    height: 100%;
  }

  &:hover {
    &::before {
      background: ${({ fill }) => fill};
    }
  }
`;
