import styled, { css } from "styled-components";

const Text254 = styled.span`
  font-size: 254px;

  &[data-type="kpi"] {
    line-height: 0.8;
    font-weight: 600;
    color: black;
  }

  @media (max-width: 576px) {
    & {
      font-size: 96px;
    }
  }

  @media (max-width: 1000px) and (min-width: 576px) {
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
  line-height: clamp(34px, 100%, 120px);

  @media (max-width: 576px) {
    line-height: 34px;
  }

  @media (max-width: 1000px) {
    font-size: clamp(30px, 7.2vw, 72px);

    @media (max-width: 576px) {
      & {
        font-size: 30px;
      }
    }

    &[data-type="kpi"] {
      font-size: clamp(56px, 7.2vw, 72px);
    }

    @media (max-width: 576px) {
      &[data-type="kpi"] {
        font-size: 56px;
      }
    }

    &[data-type="navright"] {
      font-size: clamp(44px, 7.2vw, 72px);
    }

    @media (max-width: 576px) {
      &[data-type="navright"] {
        font-size: 44px;
      }
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
  line-height: clamp(32px, 110%, 66px);

  @media (max-width: 576px) {
    && {
      font-size: 24px;
      line-height: 32px;
    }
  }

  @media (max-width: 1000px) and (min-width: 576px) {
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

const Wrap60 = styled.div`
  &&&&&& {
    &,
    & * {
      font-size: 60px;
      line-height: clamp(32px, 110%, 66px);

      @media (max-width: 576px) {
        & {
          font-size: 24px;
          line-height: 32px;
        }
      }

      @media (max-width: 1000px) and (min-width: 576px) {
        & {
          font-size: clamp(24px, 6vw, 60px);
        }
      }

      @media (min-width: 1000px) and (max-width: 1500px) {
        & {
          font-size: 50px;
        }
      }
    }
  }
`;

export const Text48Rules = css`
  &,
  & * {
    font-size: 48px;
    line-height: 1.125;

    @media (max-width: 576px) {
      & {
        font-size: 20px;
      }
    }

    @media (max-width: 1000px) and (min-width: 576px) {
      & {
        font-size: clamp(20px, 4vw, 40px);
      }
    }

    @media (min-width: 1000px) and (max-width: 1500px) {
      & {
        font-size: 40px;
      }
    }
  }
`;

const Text48 = styled.span`
  && {
    ${Text48Rules}
  }
`;

const Text40 = styled.span`
  font-size: 40px;

  @media (max-width: 576px) {
    && {
      font-size: 18px;
    }
  }

  @media (max-width: 1000px) and (min-width: 576px) {
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

export const Text36Rules = css`
  &,
  & * {
    font-size: 36px;
    line-height: 1.27;

    @media (max-width: 576px) {
      & {
        font-size: 14px;
        line-height: 24px;

        &[data-type="title"] {
          line-height: 18px;
        }
      }
    }

    @media (max-width: 1000px) and (min-width: 576px) {
      & {
        font-size: clamp(14px, 3vw, 30px);
        line-height: clamp(24px, 4.8vw, 48px);

        &[data-type="title"] {
          line-height: clamp(18px, 4.8vw, 48px);
        }
      }
    }

    @media (min-width: 1000px) and (max-width: 1500px) {
      & {
        font-size: 30px;
      }
    }
  }
`;

const Text36 = styled.span`
  && {
    ${Text36Rules}
  }
`;

export const Text30Rules = css`
  &,
  & * {
    font-size: 30px;
    line-height: 1.3;

    @media (max-width: 576px) {
      & {
        font-size: 14px;
      }
    }

    @media (max-width: 1000px) and (min-width: 576px) {
      & {
        font-size: clamp(14px, 2.6vw, 26px);
      }
    }

    @media (min-width: 1000px) and (max-width: 1500px) {
      & {
        font-size: 26px;
      }
    }
  }
`;

const Text30 = styled.span`
  ${Text30Rules}
`;

const Wrap30 = styled.div`
  &&&&&&&&& {
    ${Text30Rules}
  }
`;

export const Text24Rules = css`
  &,
  & * {
    font-size: 24px;
    line-height: 1.25;

    @media (max-width: 576px) {
      & {
        font-size: 14px;
      }

      &[data-type="label"] {
        font-size: 12px;
      }
    }

    @media (max-width: 1000px) and (min-width: 576px) {
      & {
        font-size: clamp(14px, 2.1vw, 21px);
      }

      &[data-type="label"] {
        font-size: clamp(12px, 2.1vw, 21px);
      }
    }

    @media (min-width: 1000px) and (max-width: 1500px) {
      & {
        font-size: 21px;
      }
    }
  }
`;

const Text24 = styled.span`
  && {
    ${Text24Rules}
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
  Wrap60,
  Text60,
  Text48,
  Text40,
  Text36,
  Wrap30,
  Text30,
  Text24,
  Wrap24,
  Wrap16,
  Text14,
};
