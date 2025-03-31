import preloader from "../assets/images/loader.png";
import React from "react";
import { Image } from "react-bootstrap";

const Preloader = ({ loading }) => {
	return (
		<div style={{ opacity: loading ? 1 : 0, transition: "1s ease", zIndex: 0 }} className="preloader">
			<Image className="preloader__image" width="60" src={preloader.src} alt="" />
		</div>
	);
};

export default Preloader;
