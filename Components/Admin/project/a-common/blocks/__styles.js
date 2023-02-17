import styled from "styled-components";
import { Button } from "antd";

export const UplWrapper = styled.div`
  display: flex;
  flex-direction: column;

  &&& * {
    font-size: 14px;
    line-height: 1.1;
    overflow: hidden;
  }

  & > span {
    width: 100%;
  }

  && .ant-upload-drag {
    border-radius: 40px !important;
    height: 300px;
    max-height: 300px;
  }

  &&&& .ant-upload-btn {
    padding: 0;
  }

  && > * + * {
    margin-top: 6px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 16px;
  row-gap: 16px;
  width: 100%;

  &&&&&&&&&&& {
    & .ant-upload-drag {
      height: 200px;
      max-height: 200px;
      position: relative;
    }

    & .img_thumb {
      height: 200px;
      max-height: 200px;
      overflow: hidden;
      border-radius: 40px;
      background: rgba(0, 0, 0, 0.1);
      position: relative;

      & .img_thumb_child {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      & img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    & .image-uploader-remove {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
`;

export const Btn = styled(Button)`
  &&&&& {
    width: 100%;
    height: 90px;
    margin-bottom: 160px;
    font-size: 18px;

    &,
    &:hover,
    &:focus {
      background: black;
      color: white;
      border: 1px solid black;
    }
  }
`;

export const MapWrapper = styled.div`
  && position: relative;

  &&& .mapboxgl-control-container {
    height: 100%;
  }
`;
