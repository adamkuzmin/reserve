import styled from "styled-components";

export const Col = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-top: 36px;

  && > * + * {
    margin-top: 24px;
  }
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 15px;
  row-gap: 15px;
`;

export const Member = styled.div`
  width: 100%;
  padding: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;

  && > * + * {
    margin-top: 8px;
  }

  background: rgba(0, 0, 0, 0.02);
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  border-radius: 40px;
  position: relative;

  ${({ center }) =>
    center
      ? `
    &&&& {
        min-height: 200px;
        align-items: center;
        justify-content: center;

        & > * {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
  `
      : ``}
`;

export const Cover = styled.div`
  width: 100%;
  padding-bottom: 129%;

  background-image: ${({ url }) => (url ? `url("${url}")` : `url("")`)};
  background-size: cover;
  background-color: lightgrey;
  border-radius: 20px;
`;

export const Edit = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  top: 10px;
  background: white;
  border-radius: 16px;
  padding: 2px 6px;
  z-index: 5;

  & > div {
    cursor: pointer;
  }

  && > * + * {
    margin-left: 12px;
  }
`;
