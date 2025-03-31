import mainSliderTwo from "@/data/mainSliderTwo";
import React from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper } from "swiper/react";
import SingleSlideTwo from "./SingleSlideTwo";

SwiperCore.use([Autoplay, Navigation, EffectFade, Pagination]);

const mainSlideOptions = {
  slidesPerView: 1,
  loop: true,
  effect: "fade",
  pagination: {
    el: "#main-slider-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: "#main-slider__swiper-button-next",
    prevEl: "#main-slider__swiper-button-prev",
  },
  autoplay: {
    delay: 5000,
  },
};

const MainSliderTwo = () => {
  return (
    <section className="main-slider main-slider-two">
      <Swiper className="thm-swiper__slider" {...mainSlideOptions}>
        <div className="swiper-wrapper">
          {mainSliderTwo.map((slide) => (
            <SingleSlideTwo key={slide.id} slide={slide} />
          ))}
        </div>
        <div className="swiper-pagination" id="main-slider-pagination"></div>
        <div className="main-slider__nav-two">
          <div
            className="swiper-button-prev"
            id="main-slider__swiper-button-next"
          >
            <i className="icon-right-arrow icon-left-arrow"></i>
          </div>
          <div
            className="swiper-button-next"
            id="main-slider__swiper-button-prev"
          >
            <i className="icon-right-arrow"></i>
          </div>
        </div>
      </Swiper>
    </section>
  );
};

export default MainSliderTwo;
