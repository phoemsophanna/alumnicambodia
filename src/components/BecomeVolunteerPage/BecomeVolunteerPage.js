import becomeVolunteerList from "@/data/becomeVolunteerList";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import VolunteerForm from "./VolunteerForm";

const BecomeVolunteerPage = () => {
	return (
		<section className="become-volunteer-page">
			<Container>
				<div className="section-title text-center">
					<span className="section-title__tagline">Register Now</span>
					<h2 className="section-title__title">
						Let’s join our community to <br /> become a volunteer
					</h2>
				</div>
				<Row>
					<Col xl={6} lg={6}>
						<div className="become-volunteer-page__left">
							<div className="become-volunteer-page__img">
								<Image src="https://res.cloudinary.com/dufghzvge/image/upload/v1704357358/become-a-volunteer.7ba5494a_rtxhvn.jpg" alt="" />
							</div>
							<h3 className="become-volunteer-page__title">Requirements</h3>
							<p className="become-volunteer-page__text">
								Aliquam hendrerit a augue insu image pellentes que id erat quis sollicitud null mattis Ipsum is simply dummy typesetting industry.
								Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in meifn pericula euripidis, hinc partem ei est. Eos ei
								nisl graecis, aperiri consequat anlorem tincidun.
							</p>
							<ul className="become-volunteer-page__list list-unstyled">
								{becomeVolunteerList.map((item, index) => (
									<li key={index}>
										<div className="icon">
											<i className="fas fa-arrow-circle-right"></i>
										</div>
										<div className="text">
											<p>{item}</p>
										</div>
									</li>
								))}
							</ul>
							<div className="become-volunteer-page__phone">
								<div className="become-volunteer-page__phone-icon">
									<span className="icon-chat"></span>
								</div>
								<div className="become-volunteer-page__phone-text">
									<p>Call Anytime</p>
									<a href="tel:92 666 888 0000">92 666 888 0000</a>
								</div>
							</div>
						</div>
					</Col>
					<Col xl={6} lg={6}>
						<div className="become-volunteer-page__right">
							<VolunteerForm />
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default BecomeVolunteerPage;
