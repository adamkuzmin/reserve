import styled from "styled-components";

const Text254 = styled.span`
  font-size: 254px;

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 216px;
    }
  }
`;

const Text96 = styled.span`
  font-size: 96px;

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 72px;
    }
  }
`;

const Text60 = styled.span`
  font-size: 60px;

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 50px;
    }
  }
`;

const Text48 = styled.span`
  font-size: 48px;

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 40px;
    }
  }
`;

const Text40 = styled.span`
  font-size: 40px;

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 34px;
    }
  }
`;

const Text36 = styled.span`
  font-size: 36px;

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 30px;
    }
  }
`;

const Text30 = styled.span`
  font-size: 30px;

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 26px;
    }
  }
`;

const Text24 = styled.span`
  font-size: 24px;

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 21px;
    }
  }
`;

const Wrap24 = styled.div`
  && {
    width: ${({ swidth }) => swidth && swidth};
  }

  &&&&& *, &&&&& *::placeholder {
    font-size: 24px;
  }

  @media (min-width: 1000px) and (max-width: 1500px) {
    &&&&& *, &&&&& *::placeholder {
      font-size: 21px;
    }
  }
`;

const Wrap16 = styled.div`
  font-size: 16px;
`

export {
  Text254,
  Text96,
  Text60,
  Text48,
  Text40,
  Text36,
  Text30,
  Text24,
  Wrap24,
  Wrap16
};
