import { Carousel } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../../Store/useStore";
import Link from "next/link";
import styled from "styled-components";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// eslint-disable-next-line
import "swiper/css/bundle";

import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation } from "swiper";

import { sliderData } from "./sliderData";
import { projectSliderData } from "./projectSliderData";

const SkeletonSlider = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: lightgrey;
`;

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const CarouselWrapper = styled.div`
  width: 100vw;
  background: black;
  position: relative;

  height: ${({ height }) => (height ? `${height}px` : `100vh;`)};
  /*height: 100vh;*/
`;

const CarouselBlock = styled(Carousel)`
  width: 100vw;
  height: 100vh;

  && .slick-dots {
    bottom: 48px;
    justify-content: right;
    margin-left: auto;
    margin-right: 40px;
    left: auto;
    right: 0;

    & li {
      width: 12.5px;
      height: 12.5px;
      border: 1px solid white;
      margin-right: 0px;
      margin-left: 16px;

      & button {
        height: 100%;
      }
    }
  }
`;

const Card = styled.div`
  &&& {
    width: 100vw;
    height: 100vh;
    background-color: #364d79;
    background-image: url(${({ src }) => (src ? src : "")});
    background-size: cover;
    background-position: center;
  }
`;

Card.Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: end;
`;

Card.Header = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 5000;
  margin-left: 88px;
  margin-bottom: 72px;

  @media (max-width: 1000px) {
    & {
      margin-left: 40px;
      margin-bottom: 65px;

      @media (max-width: 480px) {
        margin-left: 20px;
      }
    }
  }

  width: 40%;

  @media (max-width: 900px) {
    width: 80%;
    bottom: 40px;
  }

  p,
  h3 {
    color: white;
    z-index: 1000;
  }

  &&& p {
    font-size: 24px;
    margin-bottom: 3px;
    font-weight: 300;

    @media (max-width: 576px) {
      & {
        font-size: 14px;
      }
    }

    @media (max-width: 1000px) and (min-width: 576px) {
      & {
        font-size: clamp(14px, 2.1vw, 21px);
      }
    }

    @media (min-width: 1000px) and (max-width: 1500px) {
      & {
        font-size: 21px;
      }
    }
  }

  h3 {
    font-size: 40px;
    line-height: 1.1;
    font-weight: 600;

    @media (max-width: 576px) {
      & {
        font-size: 20px;
      }
    }

    @media (max-width: 1000px) and (min-width: 576px) {
      & {
        font-size: clamp(20px, 3.4vw, 34px);
      }
    }

    @media (min-width: 1000px) and (max-width: 1500px) {
      & {
        font-size: 34px;
      }
    }
  }
`;

const BackImg = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-image: url("${({ fill }) => (fill ? fill : "")}");
  background-size: cover;
  filter: brightness(0.9) contrast(100%);
  background-position: center;
  position: absolute;
  display: block;

  &[data-status="no-active"] {
    display: none;
    pointer-events: none;
  }

  &[data-status="was-active"] {
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: both;
    animation-play-state: running;
    animation-name: fadeOut;

    @keyframes fadeOut {
      from {
        opacity: 1;
        display: block;
        pointer-events: visible;
      }

      to {
        opacity: 0;
        display: block;
        pointer-events: none;
      }
    }
  }

  &[data-status="active"] {
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
    animation-delay: 1.5s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: both;
    animation-play-state: running;
    animation-name: fadeIn;

    @keyframes fadeIn {
      from {
        opacity: 0;
        display: block;
      }

      to {
        opacity: 1;
        display: block;
      }
    }
  }
`;

const CustomSwiper = styled(Swiper)`
  & {
    width: 100%;
    height: 100%;
    background: #000;
  }

  & .swiper-slide {
    font-size: 18px;
    color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  & .parallax-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center center;
  }

  & .swiper-slide .title {
    font-size: 41px;
    font-weight: 300;
  }

  & .swiper-slide .subtitle {
    font-size: 21px;
  }

  & .swiper-slide .text {
    font-size: 14px;
    max-width: 400px;
    line-height: 1.3;
  }

  &&& .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    opacity: 0.6;
    background: white;

    @media (max-width: 600px) {
      width: 6px;
      height: 6px;
    }

    margin: 0 12px;

    transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &&& .svgbullet {
    fill: none;
    stroke-width: 10;
  }

  & .swiper-pagination-bullet-active {
    transform: scale(2, 2);
    opacity: 1 !important;
  }

  & .swiper-pagination {
    text-align: right;
    bottom: 46px;
    left: auto;
    right: 0;
    padding-right: 40px;

    @media (max-width: 600px) {
      & {
        text-align: center;
        bottom: 120px;
      }
    }
  }
`;

const ScrollDown = styled.svg`
  z-index: 999;
  position: absolute;
  width: 140px;
  cursor: pointer;

  bottom: 50px;
  left: 50%;
  transform: translateX(-50%) rotate(270deg);

  & .svg-wrap {
    transform: translateY(353px);
  }

  & .svg-circle-wrap {
    transition: 0.5s;
    transform-origin: -20px 40px;
    opacity: 1;
  }

  & .svg-circle {
    transition: 0.5s;
    stroke-width: 2px;
    stroke: #fff;
    fill: none;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    opacity: 1;
    transform-origin: 0px 0px 0px;
  }

  & .svg-arrow {
    transition: 0.5s;
    fill: #fff;
    transform: rotateY(180deg) translate(-55px, 36.1px) scale(1.75);
  }

  & .svg-line {
    transition: 0.5s;
    stroke: #fff;
    stroke-width: 2;
    transform: translate(50px, 42px);
  }

  &&& {
    & .svg-line {
      transform: translate(35px, 42px) scaleX(0.5);
    }

    & .svg-arrow {
      transform: rotateY(180deg) translate(-40px, 36.1px) scale(1.75);
    }

    & .svg-circle {
      opacity: 1;
    }

    & .svg-circle-wrap {
      transform: scale(1.1);
    }
  }
`;

const OverlayBlack = styled.div`
  width: 100%;
  height: 100%;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0)),
    to(black)
  );
  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0, #000 100%);
  background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0, #000 100%);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, #000 100%);
  opacity: 0.16;
  position: absolute;

  ${({ rotate }) =>
    rotate
      ? `
    transform: rotate(${rotate}deg);
  `
      : ``}
`;

const Black = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  position: absolute;
  transition: all 1.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 2;

  &&[data-active="active"] {
    opacity: 1;
  }

  &&[data-active="noactive"] {
    opacity: 0;
    pointer-events: none;
  }
`;

const LinkWrapper = ({ children, href }) => {
  return href ? <Link href={href}>{children}</Link> : <>{children}</>;
};

const Slider = ({
  projectType = false,
  images = [],
  height,
  scrolling = () => {},
}) => {
  const swipeTitle = -700;
  const swipeLabel = -2000;

  const [startAutoplay, setStartAutoplay] = useState(false);
  const [blackOverlay, setBlackOverlay] = useState(true);
  const [slideKey, setSlideKey] = useState(0);

  const lang = useStore((state) => state.lang);

  const blackLogo = useStore((state) => state.blackLogo);
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  const CarouselRef = useRef();

  useEffect(() => {
    let timer = setTimeout(() => setStartAutoplay(true), 3000);
    let timer1 = setTimeout(() => setBlackOverlay(false), 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer1);
    };
  }, []);

  useEffect(() => {
    if (startAutoplay) {
      let timer = setInterval(() => {
        return setSlideKey((state) =>
          state < sdata.length - 1 ? state + 1 : 0
        );
      }, 5500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [startAutoplay]);

  useEffect(() => {
    const onScroll = (e) => {
      if (CarouselRef && CarouselRef.current) {
        const BoundingRect = CarouselRef.current.getBoundingClientRect();

        if (
          BoundingRect &&
          BoundingRect.top <= 0 &&
          BoundingRect.bottom >= 0 &&
          blackLogo
        ) {
          setBlackLogo(false);
        }
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  const sdata = images;

  const handleActiveKey = (i, slideKey) => {
    console.log("i", slideKey);

    if (i === slideKey) return "active";
    if (i === sdata.length - 1 && slideKey === 0) return "was-active";
    if (i === slideKey - 1) return "was-active";
    return "no-active";
  };

  return (
    <>
      <CarouselWrapper height={height} ref={CarouselRef}>
        <Black data-active={blackOverlay ? "active" : "noactive"} />

        {images.map(({ cover, name, category, id, cats }, i) => {
          return (
            <LinkWrapper href={id && `/project/${id}`}>
              <BackImg fill={cover} data-status={handleActiveKey(i, slideKey)}>
                <OverlayBlack />
                <OverlayBlack rotate={180} />

                <Card.Content>
                  {(name || cats) && (
                    <Card.Header data-type="slide-header">
                      {cats && cats.length > 0 && (
                        <p
                          data-font="wremena"
                          data-swiper-parallax={`${swipeLabel}`}
                        >
                          {cats[0]}
                        </p>
                      )}
                      {name && (
                        <h3
                          data-font="ibm"
                          data-swiper-parallax={`${swipeTitle}`}
                        >
                          {name}
                        </h3>
                      )}
                    </Card.Header>
                  )}
                </Card.Content>
              </BackImg>
            </LinkWrapper>
          );
        })}
      </CarouselWrapper>

      <ScrollDown
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 350 160 90"
        onClick={scrolling}
      >
        <g className="svg-wrap">
          {/*<g className="svg-circle-wrap">
            <circle className="svg-circle" cx="42" cy="42" r="40"></circle>
        </g>*/}
          <path
            className="svg-arrow"
            d="M.983,6.929,4.447,3.464.983,0,0,.983,2.482,3.464,0,5.946Z"
          ></path>
          <path className="svg-line" d="M80,0H0"></path>
        </g>
      </ScrollDown>
    </>
  );
};

export default Slider;
