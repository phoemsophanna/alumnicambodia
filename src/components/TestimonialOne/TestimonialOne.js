import { testimonialArrayTwo } from "@/data/testimonial";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TestimonialSingle from "./TestimonialSingle";
import { api } from "src/config";
import axios from "axios";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useRootContext } from "@/context/context";
const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });

const settings = {
	lazyload: true,
	nav: false,
	mouseDrag: true,
	items: 2,
	autoplay: true,
	autoHeight: true,
	controls: true,
	gutter: 30,
	controlsContainer: "#testimonial-one-carousel-nav",
	// responsive: {
	// 	768: {
	// 		items: 2,
	// 		gutter: 30,
	// 	},
	// },
};

function chunk(arr, size) {
	var subArrayCount = arr.length / size;
	var res = [];
	for (let i = 0; i < subArrayCount; i++) {
		var from = size * i;
		var to = size * (1 + i);
		var sliced = arr.slice(from, to);
		res.push(sliced);
	}
	return res;
}
const TestimonialOne = ({ className = "", data = null }) => {
	const {t} = useTranslation();
	const {lang} = useRootContext();
	const [record, setRecord] = useState([]);
	const [donors, setDonors] = useState([]);
	const fetchDonorList = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/donation/list-top-donations`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((res) => {
				const sortData = res.data.sort((a, b) => b.totalDonation - a.totalDonation);
				if (sortData.length > 0) {
					setRecord(chunk(sortData, 2));
				}
			})
			.catch((err) => {
				console.error("Error:", err);
			})
			.finally(() => {
				if (record.length > 0) {
				}
			});
	};

	useEffect(() => {
		fetchDonorList();
	}, []);
	return (
		<section className={`testimonial-one ${className}`}>
			<div
				className="testimonial-one-bg"
				style={{
					backgroundImage: `url(${
						data?.thumbnailFive
							? api.RESOURCE + data?.thumbnailFive
							: "https://res.cloudinary.com/dufghzvge/image/upload/v1704270958/testimonial-1-bg.2893f287_iuvqzj.jpg"
					})`,
				}}
			></div>
			<Container>
				<Row>
					<Col xl={4}>
						<div className="testimonial-one__left">
							<div className="section-title text-left">
								<span className="section-title__tagline">{t("general.OurDonors")}</span>
								<h2 className="section-title__title">{data?.ourDonors}</h2>
							</div>
						</div>
					</Col>
					<Col xl={8}>
						<div className="testimonial-one__right testimonial-one__carousel owl-theme owl-carouse position-relative">
							<TinySlider settings={settings}>
								{record.map((singleTestimonial, index) => (
									<TestimonialSingle singleTestimonial={singleTestimonial} key={index} />
								))}
							</TinySlider>
							<div id="testimonial-one-carousel-nav" className="owl-nav">
								<button className="owl-prev me-2">
									<span className="icon-right-arrow left"></span>
								</button>
								<button className="owl-next">
									<span className="icon-right-arrow"></span>
								</button>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default TestimonialOne;
