import React from "react";
import { Col, Image } from "react-bootstrap";

const SingleGallery = ({ gallery = {}, onClick }) => {
	const { image, title, category } = gallery;
	return (
		<Col xl={4} lg={6} md={6}>
			<div className="gallery-page__single" onClick={onClick} style={{ cursor: "pointer" }}>
				<div className="gallery-page__img-box">
					<Image src={image} alt="" />
					<div className="gallery-page__hover-content-box">
						<h2>{title}</h2>
					</div>
				</div>
			</div>
		</Col>
	);
};

export default SingleGallery;
