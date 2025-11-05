import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { SwiperSlide } from "swiper/react";

const SingleSlideThree = ({ singleSlide = {} }) => {
	const { image, bg, subTitle, title = "", href } = singleSlide;

	return (
		<SwiperSlide>
			<div
				className="image-layer"
				style={{
					backgroundImage: `url('${bg}')`,
				}}
			></div>
			<div className="image-layer-overlay"></div>
			<Container>
				<Row>
					<Col lg={8}>
						<div className="main-slider__content">
							<p>{subTitle}</p>
							<h2>
								{title.split("\n").map((t, i) => (
									<span key={i} className="d-block">
										{t}
									</span>
								))}
							</h2>
							<a href={href} className="thm-btn">
								<i className="fas fa-arrow-circle-right"></i>Learn More
							</a>
							<div className="main-slider-three-shape">
								<Image src={image} alt="" />
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</SwiperSlide>
	);
};

export default SingleSlideThree;
