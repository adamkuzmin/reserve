import { Carousel } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// eslint-disable-next-line
import "swiper/css/bundle";

import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation } from "swiper";

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
  height: 100vh;
  }
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

Card.Substrate = styled.div`
  && {
    width: 100vw;
    height: 30vh;
    position: absolute;
    background: black;
    bottom: ${({ deg }) => (deg === 0 ? 0 : "auto")};
    top: ${({ deg }) => (deg === 180 ? 0 : "auto")};
    z-index: 2;
    background: linear-gradient(
      ${({ deg }) => (deg ? deg : 0)}deg,
      #355266 0%,
      rgba(196, 196, 196, 0) 100%
    );
    mix-blend-mode: multiply;
    z-index: 1;
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

  p,
  h3 {
    color: white;
    z-index: 1000;
  }

  &&& p {
    font-size: 24px;
    margin-bottom: 3px;
    font-weight: 300;
  }

  h3 {
    font-size: 40px;
    line-height: 44px;
    font-weight: 600;
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
`;

const Slider = ({ BlackBlockIsScrolling, setBlackBlockIsScrolling }) => {
  const swipeTitle = 2000;
  const swipteLabel = 1000;

  const [startAutoplay, setStartAutoplay] = useState(false);

  const CarouselRef = useRef();
  const sliderRef = useRef();

  useEffect(() => {
    let timer = setTimeout(() => setStartAutoplay(true), 1200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (sliderRef && startAutoplay) {
      console.log("hello and start");

      /*const autoPlay = () => setInterval(() => sliderRef.current.next(), 2000);

      return () => clearInterval(autoPlay);*/
    }
  }, [sliderRef, startAutoplay]);

  useEffect(() => {
    const onScroll = (e) => {
      if (CarouselRef && CarouselRef.current) {
        const BoundingRect = CarouselRef.current.getBoundingClientRect();

        if (
          BoundingRect &&
          BoundingRect.top <= 0 &&
          BoundingRect.bottom >= 0 &&
          !BlackBlockIsScrolling
        ) {
          setBlackBlockIsScrolling(true);
        }
      }
      window.addEventListener("scroll", onScroll);

      return () => window.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <CarouselWrapper ref={CarouselRef}>
      {!startAutoplay && false && <SkeletonSlider />}
      <CustomSwiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={1000}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        {Array(8).fill(
          <SwiperSlide key={`swiper::${Math.random()}`}>
            <div
              slot="container-start"
              className="parallax-bg"
              style={{
                backgroundImage: "url('/carousel/1.jpg')",
              }}
              data-swiper-parallax="0"
            />
            <Card.Substrate deg={0} />
            <Card.Substrate deg={180} />
            <Card.Content>
              <Card.Header data-type="slide-header">
                <p data-font="wremena" data-swiper-parallax="-2000">
                  Объект культуры
                </p>
                <h3 data-font="ibm" data-swiper-parallax="-700">
                  Концертный зал «Зарядье»
                </h3>
              </Card.Header>
            </Card.Content>
          </SwiperSlide>
        )}
      </CustomSwiper>
      )
      {/* <CarouselBlock ref={sliderRef}>
          <Card src="/carousel/1.jpg">
            <Card.Substrate deg={0} />
            <Card.Substrate deg={180} />
            <Card.Content>
              <Card.Header data-type="slide-header">
                <p data-font="wremena">Объект культуры</p>
                <h3 data-font="ibm">Концертный зал «Зарядье»</h3>
              </Card.Header>
            </Card.Content>
          </Card>
          <Card src="/carousel/2.jpg">
            <Card.Substrate deg={0} />
            <Card.Substrate deg={180} />
            <Card.Content>
              <Card.Header data-type="slide-header">
                <p data-font="wremena">Офисно-административные проекты</p>
                <h3 data-font="ibm">Больница с родильным домом в Коммунарке</h3>
              </Card.Header>
            </Card.Content>
          </Card>
          <Card src="/carousel/3.jpg">
            <Card.Substrate deg={0} />
            <Card.Substrate deg={180} />
            <Card.Content>
              <Card.Header data-type="slide-header">
                <p data-font="wremena">Офисно-административные проекты</p>
                <h3 data-font="ibm">
                  Штаб-квартира ОАО "Аэрофлот-Российские авиалинии"
                </h3>
              </Card.Header>
            </Card.Content>
          </Card>
          <Card src="/carousel/6.jpg">
            <Card.Substrate deg={0} />
            <Card.Substrate deg={180} />
            <Card.Content>
              <Card.Header data-type="slide-header">
                <p data-font="wremena">Офисно-административные проекты</p>
                <h3 data-font="ibm">Административно-деловой центр ТиНАО</h3>
              </Card.Header>
            </Card.Content>
          </Card>
          <Card src="/carousel/5.jpg">
            <Card.Substrate deg={0} />
            <Card.Substrate deg={180} />
            <Card.Content>
              <Card.Header data-type="slide-header">
                <p data-font="wremena">Проекты жилых зданий</p>
                <h3 data-font="ibm">Жилой комплекс «Небо»</h3>
              </Card.Header>
            </Card.Content>
          </Card>
          <Card src="/carousel/7.jpg">
            <Card.Substrate deg={0} />
            <Card.Substrate deg={180} />
            <Card.Content>
              <Card.Header data-type="slide-header">
                <p data-font="wremena">Офисно-административные проекты</p>
                <h3 data-font="ibm">Торговый центр "Времена года"</h3>
              </Card.Header>
            </Card.Content>
          </Card>
          <Card src="/carousel/8.jpg">
            <Card.Substrate deg={0} />
            <Card.Substrate deg={180} />
            <Card.Content>
              <Card.Header data-type="slide-header">
                <p data-font="wremena">Объект культуры</p>
                <h3 data-font="ibm">Комплекс апартаментов “STORY”</h3>
              </Card.Header>
            </Card.Content>
          </Card>
        </CarouselBlock>*/}
    </CarouselWrapper>
  );
};

export default Slider;
