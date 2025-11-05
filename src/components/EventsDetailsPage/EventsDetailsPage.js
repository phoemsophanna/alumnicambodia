import eventsDetails from "@/data/eventsDetails";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { api } from "src/config";

const EventsDetailsPage = ({detail = null}) => {
	return (
		<section className="event-details">
			<Container>
				<Row>
					<Col xl={12}>
						<div className="events-details__img">
							<Image src={api.RESOURCE + detail?.image} alt="" />
							<div className="event-details__date-box">
								<p>
									{detail?.datetime.split(" ").map((t, i) => (
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
								<h2 className="event-details__title">{detail?.title_content}</h2>
								<div className="causes-details__text-box--detail" dangerouslySetInnerHTML={{ __html: detail?.des }}></div>
							</div>
						</div>
					</Col>
					<Col xl={4} lg={5}>
						<div className="event-details__right">
							<div className="event-details__right-sidebar">
								<div className="event-details__right-sidebar-title">
									<h4>Project Details</h4>
								</div>
								<ul className="event-details__right-sidebar-list list-unstyled">
									<li>
										<div className="left">
											<p>Date:</p>
										</div>
										<div className="right">
											<h4>{detail?.fromDate}</h4>
										</div>
									</li>
									
									<li style={detail?.location ? "" : {display: "none"}}>
										<div className="left">
											<p>Location:</p>
										</div>
										<div className="right">
											<h4>
												{detail?.location}
											</h4>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default EventsDetailsPage;
