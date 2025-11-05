import React from "react";
import { Col, Image } from "react-bootstrap";
import { api } from "src/config";

const CharityImage = ({ mainImg = null, smallImg = null }) => {
	return (
		<Col xl={6} lg={6}>
			<div className="welcome-one__left">
				<div className="welcome-one__img-box">
					<Image src={mainImg ? `${api.RESOURCE}${mainImg}` : "causes-one-img-1.jpg"} alt="" className="img-box-1" />
					{smallImg ? (
						<div className="welcome-one__img-box-2">
							<Image src={smallImg ? `${api.RESOURCE}${smallImg}` : "causes-one-img-1.jpg"} alt="" />
						</div>
					) : null}
				</div>
			</div>
		</Col>
	);
};

export default CharityImage;
