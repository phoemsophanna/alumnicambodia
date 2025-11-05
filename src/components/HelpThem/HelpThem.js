import helpThem from "@/data/helpThem";
import VideoData from "@/data/videoData";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import JarallaxImage from "../Jarallax/JarallaxImage";
import Video from "./Video";
import VideoModal from "./VideoModal";
const Jarallax = dynamic(() => import("../Jarallax/Jarallax"), { ssr: false });

const HelpThem = () => {
	const [isOpen, setOpen] = useState(false);
	const { id } = VideoData;

	return (
		<>
			<section className="help-them">
				<Jarallax className="help-them-bg" speed={0.2} imgPosition="50% 0%">
					<JarallaxImage src="https://res.cloudinary.com/dufghzvge/image/upload/v1704273539/three-boxes-img-1.651d35b8_adwvoe.jpg" />
					<Container>
						<div className="help-them__top">
							<Row>
								<Col xl={8} lg={8}>
									<div className="help-them__top-content">
										<h2 className="help-them__top-content-title">Help them whenever they are in need</h2>
									</div>
								</Col>
								<Col xl={4} lg={4}>
									<Video setOpen={setOpen} />
								</Col>
							</Row>
						</div>
						<div className="help-them__bottom">
							<Row>
								{helpThem.map(({ id, title, subTitle, icon }) => (
									<Col xl={4} lg={4} key={id}>
										<div className="help-them__single">
											<div className="help-them__icon">
												<span className={icon}></span>
											</div>
											<div className="help-them__text">
												<h3>{title}</h3>
												<p>{subTitle}</p>
											</div>
										</div>
									</Col>
								))}
							</Row>
						</div>
					</Container>
				</Jarallax>
			</section>
			<VideoModal isOpen={isOpen} setOpen={setOpen} id={id} />
		</>
	);
};

export default HelpThem;
