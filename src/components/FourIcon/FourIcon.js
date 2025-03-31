import fourIcons from "@/data/fourIcons";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const FourIcon = () => {
	return (
		<section className="four-icon">
			<Container>
				<Row>
					{fourIcons.map(({ id, title, icon, description, image }) => (
						<Col xl={3} lg={6} md={6} className="fadeInUp" key={id}>
							<div className="four-icon__single">
								<div className="four-icon__img">
									<Image src={image} alt="" />
									<div className="four-icon__content-box">
										<h3 className="four-icon__title">{title}</h3>
										<p className="four-icon__text">{description}</p>
									</div>
								</div>
								<div className="four-icon__bottom-icon">
									<span className={icon}></span>
								</div>
							</div>
						</Col>
					))}
				</Row>
			</Container>
		</section>
	);
};

export default FourIcon;
