import BecomeVolunteer from "@/components/BecomeVolunteer/BecomeVolunteer";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { testimonial } from "@/data/testimonial";

const Volunteers = () => {
	return (
		<Layout pageTitle="Donors">
			<PageHeader pageTitle="Donors List" />
			<section className="donors-list">
				<Container>
					<Row>
						{testimonial.map(({ name, image, description, category }) => (
							<Col key={image} xl={4} lg={4} className="animated fadeInLeft">
								<div className="testimonial-one__single testimonial-two__single">
									<p className="testimonial-one__text">{description}</p>
									<div className="testimonial-one__client-info">
										<div className="testimonial-one__client-img">
											<Image src={image} alt="" />
											<div className="testimonial-one__quote"></div>
										</div>
										<div className="testimonial-one__client-name">
											<h3>{name}</h3>
											<p>{category}</p>
										</div>
									</div>
								</div>
							</Col>
						))}
					</Row>
				</Container>
			</section>
			<BecomeVolunteer />
		</Layout>
	);
};

export default Volunteers;
