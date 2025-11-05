import React from "react";

const GoogleMap = ({data = null}) => {
	return (
		<section className="contact-page-google-map">
			<div className="fs-16 fw-5 text-gray mb-4 pb-lg-2" dangerouslySetInnerHTML={{__html: data?.embedMap}}></div>
		</section>
	);
};
export default GoogleMap;
