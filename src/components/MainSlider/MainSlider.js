import React, { useEffect, useState } from "react";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { Swiper } from "swiper/react";
import SingleSlide from "./SingleSlide";
import SliderCounter from "./SliderCounter";
import axios from "axios";
import { api } from "src/config";
import { useRootContext } from "@/context/context";

SwiperCore.use([Autoplay, Navigation, EffectFade, Pagination]);

const mainSlideOptions = {
	slidesPerView: 1,
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
		delay: 6000,
	},
};

const MainSlider = (props) => {
	const { lang, onSelectLang } = useRootContext();
	const [sliders, setSliders] = useState([]);
	const [isLoading, setLoading] = useState(false);

	const fetchSlider = async () => {
		setLoading(true);
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/home/slider`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((response) => {
				setSliders(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (props?.sliders) {
			setSliders(props?.sliders);
		}
	}, [props]);

	useEffect(() => {
		fetchSlider();
	}, [lang]);

	return (
		<section className="main-slider">
			{sliders?.length > 0 ? (
				<Swiper className="thm-swiper__slider" {...mainSlideOptions}>
					<div className="swiper-wrapper">
						{sliders.map((slide) => (
							<SingleSlide key={slide.id} slide={slide} />
						))}
					</div>
					<div className="swiper-pagination" id="main-slider-pagination"></div>
					<div className="main-slider__nav">
						<div
							className="swiper-button-prev"
							id="main-slider__swiper-button-prev"
						>
							<i className="icon-right-arrow icon-left-arrow"></i>
						</div>
						<div
							className="swiper-button-next"
							id="main-slider__swiper-button-next"
						>
							<i className="icon-right-arrow"></i>
						</div>
					</div>
					{/* <SliderCounter /> */}
				</Swiper>
			) : null}
		</section>
	);
};

export default MainSlider;
