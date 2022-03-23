import styled from "styled-components";
import { Space, Row, Col } from "antd";

const FilterWrapper = styled(Space)`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(0%);
  z-index: 9200;
  opacity: 1;

  &&[data-animation="true"] {
    transform: translateX(-50%) translateY(-50%);
    opacity: 0;

    animation: FiltersAppear 1s ease-in-out 4s;
    @keyframes FiltersAppear {
      0% {
        opacity: 0;
        transform: translateX(-50%) translateY(-50%);
      }

      100% {
        opacity: 1;
        transform: translateX(-50%);
      }
    }

    animation-fill-mode: forwards;
  }
`;

const Filters = styled(Space)`
  background: white;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 60px;
  border: 1px solid black;
  position: relative;

  &&&[data-block="filter"] {
    margin-left: 40px;

    @media (max-width: 576px) {
      & {
        margin-left: 20px;
      }
    }
  }

  &&&&[data-theme="black"] {
    background: black;

    &::before {
      width: calc(100% + 2px);
      height: 100%;
      transform: translateY(-50%);
      z-index: 500;
      background: black;
      content: "";
      position: absolute;
      margin-left: -5px;
    }

    & * {
      color: white;
      z-index: 501;
    }
  }
`;

const FLink = styled.div`
  @media (max-width: 480px) {
    &&& {
      padding-left: 14px;
      padding-right: 14px;
    }
  }

  && {
    cursor: pointer;

    & {
      padding-left: 30px;
      padding-right: 30px;
      padding-top: 7px;
      padding-bottom: 7px;
      border-radius: 60px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }

    &[data-type="link"] {
      background-color: black;
      color: white;
    }

    &[data-type="notfilter"] {
      opacity: 0.6;
    }

    &[data-theme="black"] {
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.8);
    }

    &[data-theme="black"]:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &[data-status="active"] {
      background-color: rgba(255, 255, 255, 0.5) !important;
    }

    &[data-status="active"]:hover {
      background-color: rgba(255, 255, 255, 0.5) !important;
    }
  }
`;

const BlackPanel = styled.div`
  position: absolute;
  width: 90%;
  padding: 20px;
  height: auto;
  min-height: 200px;
  background: black;
  border-radius: 25px 25px 0px 25px;
  right: 0;
  bottom: calc(100% + 4px);

  pointer-events: visible;

  && * {
    color: white;
  }

  @media (max-width: 480px) {
    &&& {
      width: 100%;
      border-radius: 25px;
    }
  }
`;

const BlackRow = styled(Row)`
  && > *[data-theme="black"] {
    margin-right: 6px;
    margin-bottom: 10px;
  }
`;

const LabelRow = styled(Row)`
  margin-bottom: 24px;
  opacity: 0.6;
`;

const CloseBtnCol = styled(Col)`
  cursor: pointer;

  &:hover div {
    text-decoration: underline;
  }
`;

export {
  FilterWrapper,
  Filters,
  FLink,
  BlackPanel,
  BlackRow,
  LabelRow,
  CloseBtnCol,
};
