import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Image } from "react-bootstrap";
import { api } from "src/config";

const SingleGallery = ({ gallery = {}, onClick }) => {
	const { image } = gallery;

	return (
		<Col xl={4} lg={6} md={6}>
			<div className="gallery-page__single" onClick={onClick} style={{ cursor: "pointer" }}>
				<div className="gallery-page__img-box">
					<Image src={`${api.RESOURCE}` + image} alt="" />
					<div className="gallery-page__hover-content-box">
						<h2 style={{fontSize: "60px"}}>+</h2>
					</div>
				</div>
			</div>
		</Col>
	);
};

export default SingleGallery;
