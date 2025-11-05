import React from "react";
import { Col, Image } from "react-bootstrap";

const SingleTestimonial = ({ singleTestimonial = {} }) => {
	const { name, description, category, image } = singleTestimonial;

	return (
		<Col xl={4} lg={4} className="animated fadeInLeft">
			<div className="testimonial-one__single testimonial-two__single">
				<p className="testimonial-one__text">{description}</p>
				<div className="testimonial-one__client-info">
					<div className="testimonial-one__client-img">
						<Image src={image} alt="" />
						<div className="testimonial-one__quote"></div>
					</div>
					<div className="testimonial-one__client-name">
						<h3>{name}</h3>
						<p>{category}</p>
					</div>
				</div>
			</div>
		</Col>
	);
};

export default SingleTestimonial;
