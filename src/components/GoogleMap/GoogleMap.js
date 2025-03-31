import React from "react";

const GoogleMap = ({data = null}) => {
	return (
		<section className="contact-page-google-map">
			<iframe
				src={data?.embedMap}
				className="contact-page-google-map__one"
				allowFullScreen
			></iframe>
		</section>
	);
};
export default GoogleMap;
