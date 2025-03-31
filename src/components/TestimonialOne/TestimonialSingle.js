import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { api } from "src/config";

const TestimonialSingle = ({ singleTestimonial }) => {
	const [errorImage, setErrorImage] = useState(false);
	return (
		<div>
			{singleTestimonial.map((donor, index) => (
				<div key={index} style={{ userSelect: "none", marginBottom: 30 }} className="testimonial-one__single">
					{/* <p className="testimonial-one__text">{description}</p> */}
					<div className="testimonial-one__client-info">
						<div className="testimonial-one__client-img">
							{errorImage ? (
								<Image alt="" src={"/default_pfp.jpg"} />
							) : (
								<Image
									alt=""
									src={
										donor?.image
											? donor?.loginWith === 1 || donor?.loginWith === 2
												? api.RESOURCE + donor?.image
												: donor?.image
											: "/default_pfp.jpg"
									}
									onError={() => {
										setErrorImage(true);
									}}
								/>
							)}
							{/* <div className="testimonial-one__quote"></div> */}
						</div>
						<div className="testimonial-one__client-name">
							<h3>{donor?.name}</h3>
							<p>${donor?.totalDonation?.toFixed(2)}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default TestimonialSingle;
