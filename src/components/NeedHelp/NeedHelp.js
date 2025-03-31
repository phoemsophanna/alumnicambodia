import React from "react";
import { Image } from "react-bootstrap";

const NeedHelp = () => {
	return (
		<section className="need-help">
			<div className="container">
				<div className="need-help__inner">
					<div className="need-help__img">
						<Image src="https://res.cloudinary.com/dufghzvge/image/upload/v1704358420/help-them-bg.49706910_ufduqz.jpg" alt="" />
					</div>
					<div className="need-help__content">
						<h4 className="need-help__title">They need your help</h4>
						<p className="need-help__text">Lorem ipsum is are many variations of pass of norms and guide an effective simply free text majority.</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NeedHelp;
