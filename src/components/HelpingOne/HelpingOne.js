import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const HelpingOne = () => {
	return (
		<section className="helping-one">
			<Container>
				<div className="section-title text-center">
					<span className="section-title__tagline">Latest Causes</span>
					<h2 className="section-title__title">
						Find the popular cause <br />
						and donate them
					</h2>
				</div>
				<Row>
					<Col xl={6} lg={6}>
						<div className="helping-one__left">
							<h3 className="helping-one__title">We’re Helping Today. Helping Tommorow</h3>
							<p className="helping-one__text">
								There are many variations of passages of available but the majority have suffered alteration in some form, by injected humou or
								randomised words even slightly believable. All the Lorem Ipsum generators on the Internet tend.
							</p>
							<ul className="helping-one__left-list list-unstyled">
								<li>
									<div className="helping-one__left-icon">
										<i className="fas fa-arrow-circle-right"></i>
									</div>
									<div className="helping-one__left-text">
										<p>Making this the first true generator on the Internet</p>
									</div>
								</li>
								<li>
									<div className="helping-one__left-icon">
										<i className="fas fa-arrow-circle-right"></i>
									</div>
									<div className="helping-one__left-text">
										<p>Lorem Ipsum is not simply random text</p>
									</div>
								</li>
								<li>
									<div className="helping-one__left-icon">
										<i className="fas fa-arrow-circle-right"></i>
									</div>
									<div className="helping-one__left-text">
										<p>If you are going to use a passage</p>
									</div>
								</li>
							</ul>
							<div className="helping-one__left-img">
								<Image src="https://res.cloudinary.com/dufghzvge/image/upload/v1704358105/helping-one-left-img.ba69db9a_fzrttx.jpg" alt="" />
								<div className="helping-one__left-icon-box">
									<span className="icon-heart"></span>
								</div>
							</div>
						</div>
					</Col>
					<Col xl={6} lg={6}>
						<div className="helping-one__right">
							<form action="" className="helping-one__right-form">
								<Row>
									<Col lg={12}>
										<div className="helping-one__right-input-box">
											<input type="text" name="amount" placeholder="Enter Donation Amount" />
											<div className="helping-one__right-dolar-icon">
												<span>$</span>
											</div>
										</div>
									</Col>
									<Col lg={6}>
										<input type="text" name="name" placeholder="Your Name" />
									</Col>
									<Col lg={6}>
										<input type="email" name="email" placeholder="Email Address" />
									</Col>
									<Col lg={12}>
										<input type="text" name="phone" placeholder="Phone Number" />
									</Col>
									<Col lg={12}>
										<textarea name="message" placeholder="Write Message"></textarea>
									</Col>
									<Col lg={12}>
										<button type="submit" className="thm-btn helping-one__right-btn">
											<i className="fas fa-arrow-circle-right"></i>Continue Now
										</button>
									</Col>
								</Row>
							</form>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default HelpingOne;
