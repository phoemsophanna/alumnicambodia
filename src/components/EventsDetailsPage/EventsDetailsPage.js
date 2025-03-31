import eventsDetails from "@/data/eventsDetails";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const { image, date1, title, texts, requirements, startingTime, date, category, phone, website, location } = eventsDetails;

const EventsDetailsPage = () => {
	return (
		<section className="event-details">
			<Container>
				<Row>
					<Col xl={12}>
						<div className="events-details__img">
							<Image src={image} alt="" />
							<div className="event-details__date-box">
								<p>
									{date1.split(" ").map((t, i) => (
										<span className="d-block" key={i}>
											{t}
										</span>
									))}
								</p>
							</div>
						</div>
					</Col>
				</Row>
				<Row>
					<Col xl={8} lg={7}>
						<div className="event-details__left">
							<div className="event-details__top-content">
								<h2 className="event-details__title">{title}</h2>
								{texts.map((t, i) => (
									<p className={`event-details__text-${i + 1}`} key={i}>
										{t}
									</p>
								))}
							</div>
							<div className="event-details__bottom-content">
								<h3 className="event-details__bottom-title">Event Requirements</h3>
								{requirements.map((r, i) => (
									<p key={i} className={`event-details__bottom-text-${i + 1}`}>
										{r}
									</p>
								))}
								<a href="#" className="event-details__bottom-content-btn thm-btn">
									<i className="fas fa-arrow-circle-right"></i>Register Now
								</a>
							</div>
						</div>
					</Col>
					<Col xl={4} lg={5}>
						<div className="event-details__right">
							<div className="event-details__right-sidebar">
								<div className="event-details__right-sidebar-title">
									<h4>Event Details</h4>
								</div>
								<ul className="event-details__right-sidebar-list list-unstyled">
									<li>
										<div className="left">
											<p>Starting Time:</p>
										</div>
										<div className="right">
											<h4>{startingTime}</h4>
										</div>
									</li>
									<li>
										<div className="left">
											<p>Date:</p>
										</div>
										<div className="right">
											<h4>{date}</h4>
										</div>
									</li>
									<li>
										<div className="left">
											<p>Category:</p>
										</div>
										<div className="right">
											<h4>{category}</h4>
										</div>
									</li>
									<li>
										<div className="left">
											<p>Phone:</p>
										</div>
										<div className="right">
											<h4>{phone}</h4>
										</div>
									</li>
									<li>
										<div className="left">
											<p>Website:</p>
										</div>
										<div className="right">
											<h4>{website}</h4>
										</div>
									</li>
									<li>
										<div className="left">
											<p>Location:</p>
										</div>
										<div className="right">
											<h4>
												{location.split("\n").map((t, i) => (
													<span key={i} className="d-block">
														{t}
													</span>
												))}
											</h4>
										</div>
									</li>
								</ul>
							</div>
							<div className="event-details__right-map">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4562.753041141002!2d-118.80123790098536!3d34.152323469614075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82469c2162619%3A0xba03efb7998eef6d!2sCostco+Wholesale!5e0!3m2!1sbn!2sbd!4v1562518641290!5m2!1sbn!2sbd"
									className="event-details__map-box"
									allowFullScreen
								></iframe>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default EventsDetailsPage;
