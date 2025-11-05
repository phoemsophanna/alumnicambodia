import contactData from "@/data/contactData";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import ContactForm from "./ContactForm";
import { api } from "src/config";
import { useTranslation } from "react-i18next";

const ContactPage = ({data = null}) => {
	const {t} = useTranslation();
	return (
		<section className="contact-page">
			<Container>
				<div className="section-title text-center">
					<span className="section-title__tagline">{t("general.ContactWithUs")}</span>
					<h2 className="section-title__title" dangerouslySetInnerHTML={{__html: data?.pageTitle}}></h2>
				</div>
				<Row>
					<Col xl={6} lg={6}>
						<div className="contact-page__left">
							<div className="contact-page__img">
								<Image src={data?.thumbnail ? api.RESOURCE + data?.thumbnail : "/causes-one-img-1.jpg"} alt="" />
							</div>
							<p className="contact-page__text">{data?.pageDescription}</p>
							<div className="contact-page__contact-info">
								<ul className="contact-page__contact-list list-unstyled">
									<li>
										<div className="icon">
											<span className="icon-chat"></span>
										</div>
										<div className="text">
											<p>{t("general.CallAnytime")}</p>
											{data?.phoneNumber1 ? <a href={`tel:${data?.phoneNumber1}`}>{data?.phoneNumber1}</a> : null}
											{data?.phoneNumber1 && data?.phoneNumber2 ? " / " : null}
											{data?.phoneNumber2 ? <a href={`tel:${data?.phoneNumber2}`}>{data?.phoneNumber2}</a> : null}
										</div>
									</li>
									<li>
										<div className="icon">
											<span className="icon-message"></span>
										</div>
										<div className="text">
											<p>{t("general.SendEmail")}</p>
											{data?.email1 ? <a href={`mailto:${data?.email1}`}>{data?.email1}</a> : null}
											{data?.email1 && data?.email2 ? " / " : null}
											{data?.email2 ? <a href={`mailto:${data?.email2}`}>{data?.email2}</a> : null}
										</div>
									</li>
									<li>
										<div className="icon">
											<span className="icon-address"></span>
										</div>
										<div className="text">
											<p>{t("general.VisitOffice")}</p>
											<h5>{data?.address}</h5>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</Col>
					<Col xl={6} lg={6}>
						<ContactForm />
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default ContactPage;
