import React, { useEffect, useState } from "react";
import { Col, Image } from "react-bootstrap";

const SingleVideo = ({ video = {}, onClick }) => {
	const { link } = video;
	console.log(link);
	return (
		<Col xl={4} lg={6} md={6}>
			<div className="video-page gallery-page__single" onClick={onClick} style={{ cursor: "pointer" }}>
				<div className="gallery-page__img-box">
					<iframe
						width="100%"
						height="205px"
						style={{ borderRadius: "20px" }}
						frameBorder="0"
						allowFullScreen
						src={link}
						title="Embedded Video"
					></iframe>
				</div>
			</div>
		</Col>
	);
};

export default SingleVideo;
