import whyChoose from "@/data/whyChoose";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const { tagline, title, description, signature, listIcon, urgentTitle, urgentDescription, raised, goal, category, list } = whyChoose;

const WhyChoose = () => {
	return (
		<section className="why-choose">
			<div
				className="why-choose-bg"
				style={{ backgroundImage: `url('https://res.cloudinary.com/dufghzvge/image/upload/v1704360441/why-choose-bg.558b812a_fw1zx8.jpg')` }}
			></div>
			<Container>
				<Row>
					<Col xl={8}>
						<div className="why-choose__left">
							<div className="section-title text-left">
								<span className="section-title__tagline">{tagline}</span>
								<h2 className="section-title__title">
									{title.split("\n").map((t, i) => (
										<span className="d-block" key={i}>
											{t}
										</span>
									))}
								</h2>
							</div>
							<div className="why-choose__left-bottom">
								<div className="why-choose__left-text-box">
									<p className="why-choose__left-text">{description}</p>
									<h2 className="why-choose__left-signature">{signature}</h2>
								</div>
								<div className="why-choose__left-list-box">
									<ul className="why-choose__left-list list-unstyled">
										{list.map((item, index) => (
											<li key={index}>
												<div className="icon">
													<i className={`fas ${listIcon}`}></i>
												</div>
												<div className="text">
													<h5>{item}</h5>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</Col>
					<Col xl={4}>
						<div className="why-choose__right">
							<div className="why-choose__urgent">
								<h3 className="why-choose__urgent-title">{urgentTitle}</h3>
								<p className="why-choose__urgent-text">{urgentDescription}</p>
								<div className="why-choose__progress">
									<div className="bar">
										<div className="bar-inner count-bar" style={{ width: "36%" }} data-percent="36%">
											<div className="count-text opacity-100">36%</div>
										</div>
									</div>
									<div className="why-choose__goals">
										<p>
											<span>${raised}</span> Raised
										</p>
										<p>
											<span>${goal}</span> Goal
										</p>
									</div>
								</div>
								<Link href="/projects-details">
									<a className="why-choose__right-btn">
										<i className="fa fa-heart"></i>Donate
									</a>
								</Link>
								<div className="why-choose__right-category">
									<span>{category}</span>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default WhyChoose;
