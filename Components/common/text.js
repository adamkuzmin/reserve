import styled from "styled-components";

const Text254 = styled.span`
  font-size: 254px;

  &[data-type="kpi"] {
    line-height: 0.8;
    font-weight: 600;
    color: black;
  }

  @media (max-width: 1000px) {
    & {
      font-size: clamp(96px, 21.6vw, 216px);
    }
  }

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 216px;
    }
  }
`;

const Text96 = styled.span`
  font-size: 96px;

  @media (max-width: 1000px) {
    font-size: clamp(30px, 7.2vw, 72px);

    &[data-type="kpi"] {
      font-size: clamp(56px, 7.2vw, 72px);
    }

    &[data-type="navright"] {
      font-size: clamp(44px, 7.2vw, 72px);
    }
  }

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 72px;
    }
  }
`;

const Text60 = styled.span`
  font-size: 60px;
  line-height: 1.1;

  @media (max-width: 1000px) {
    && {
      font-size: clamp(24px, 6vw, 60px);
    }
  }

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 50px;
    }
  }
`;

const Text48 = styled.span`
  font-size: 48px;
  line-height: 1.125;

  @media (max-width: 1000px) {
    && {
      font-size: clamp(20px, 4vw, 40px);
    }
  }

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 40px;
    }
  }
`;

const Text40 = styled.span`
  font-size: 40px;

  @media (max-width: 1000px) {
    && {
      font-size: clamp(18px, 3.4vw, 34px);
    }
  }

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 34px;
    }
  }
`;

const Text36 = styled.span`
  font-size: 36px;
  line-height: 1.27;

  @media (max-width: 1000px) {
    && {
      font-size: clamp(14px, 3vw, 30px);
      line-height: clamp(24px, 4.8vw, 48px)
    }
  }

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 30px;
    }
  }
`;

const Text30 = styled.span`
  font-size: 30px;
  line-height: 1.3;

  @media (max-width: 1000px) {
    && {
      font-size: clamp(14px, 2.6vw, 26px);
    }
  }

  @media (min-width: 1000px) and (max-width: 1500px) {
    && {
      font-size: 26px;
    }
  }
`;

const Text24 = styled.span`
  font-size: 24px;
  line-height: 1.25;

  @media (max-width: 1000px) {
    && {
      font-size: clamp(14px, 2.1vw, 21px);
    }
  }

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

  &&&&& *,
  &&&&& *::placeholder {
    font-size: 24px;
  }

  @media (min-width: 1000px) and (max-width: 1500px) {
    &&&&& *,
    &&&&& *::placeholder {
      font-size: 21px;
    }
  }
`;

const Wrap16 = styled.div`
  font-size: 16px;
`;

const Text14 = styled.span`
  font-size: 14px;
  line-height: 1.25;
`;

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
  Wrap16,
  Text14
};
