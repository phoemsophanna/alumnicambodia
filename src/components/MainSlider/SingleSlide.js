import { useRootContext } from "@/context/context";
import Link from "next/link";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { api } from "src/config";
import { SwiperSlide } from "swiper/react";

const SingleSlide = ({ slide = {} }) => {
	const {lang} = useRootContext();
	return (
		<SwiperSlide>
			<div className="image-layer" style={{ backgroundImage: `url(${slide?.image ? api.RESOURCE + slide?.image : slide.slide?.bg})` }}></div>
			<div className="image-layer-overlay"></div>
			<Container>
				<Row>
					<Col lg={8}>
						<div className="main-slider__content">
							<p>{slide?.subtitle || slide?.subTitle}</p>
							<h2 dangerouslySetInnerHTML={{__html: slide?.title}}></h2>
							{slide.linkTo ? <Link href={slide?.linkTo}>
								<a className="thm-btn">
									<i className="fa fa-heart"></i>{ slide?.linkLabel || "DONATE NOW"}
								</a>
							</Link> : null}
							
							{/* <div className="main-slider__shape-1 zoom-fade">
                <Image src={image.src} alt="" />
              </div> */}
						</div>
					</Col>
				</Row>
			</Container>
		</SwiperSlide>
	);
};

export default SingleSlide;
