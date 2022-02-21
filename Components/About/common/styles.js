import styled from "styled-components";

import {
  Text60,
  Text48,
  Text36,
  Text30,
} from "../../../Components/common/text";

const Gap = styled.div`
  height: ${({ sheight }) => (sheight ? sheight : "100%")};
  min-width: ${({ swidth }) => (swidth ? swidth : "100%")};
`;

const ContentFlex = styled.div`
  display: flex;

  &&[data-columns="eq"] {
    & > * {
      width: 100%;
    }
  }

  ${({ wrap }) =>
    wrap
      ? `
      flex-wrap: ${wrap}
      `
      : ``};

  ${({ align }) =>
    align
      ? `
      align-items: ${align}
      `
      : ``}
`;

const VertFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ size }) =>
    size
      ? `
    && > * + * {
      margin-top: ${size};
    }
    `
      : ``}
`;

const LeadQuote = styled.div`
  & * {
    line-height: 1.1;
  }

  & {
    max-width: clamp(300px, 59vw, 1200px);
    margin-bottom: 80px;
  }
`;

const LeadDescription = styled.div`
  & {
    max-width: clamp(300px, 71vw, 1400px);
  }
`;

const ShowBtn = styled.div`
  padding: 18px 45px;
  border: 1px solid black;
  border-radius: 60px;
  max-width: max-content;
  cursor: pointer;

  &&:hover {
    background: black;

    & * {
      color: white;
    }
  }
`;

const BoldTitle = styled.div`
  & * {
    font-weight: 600;
    color: black;
  }
`;

const LocalTitle = ({ children, size, ...props }) => {
  return (
    <BoldTitle>
      {size === 60 && (
        <Text60 data-font="ibm" {...props}>
          {children}
        </Text60>
      )}

      {size === 48 && (
        <Text48 data-font="ibm" {...props}>
          {children}
        </Text48>
      )}

      {size === 36 && (
        <Text36 data-font="ibm" {...props}>
          {children}
        </Text36>
      )}

      {size === 30 && (
        <Text30 data-font="ibm" {...props}>
          {children}
        </Text30>
      )}
    </BoldTitle>
  );
};

export {
  Gap,
  ContentFlex,
  LocalTitle,
  VertFlex,
  LeadQuote,
  ShowBtn,
  LeadDescription,
};
