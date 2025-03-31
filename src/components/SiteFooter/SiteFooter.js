import footerData from "@/data/footerData";
import Link from "next/link";
import React, { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import brandLogo from "../../assets/images/cda-logo.png";
import { useRootContext } from "@/context/context";
import { useTranslation } from "react-i18next";
const { exploreList, social, email, tel, officeAddress, about, link, copyrightYear, footerBg } = footerData;

const SiteFooter = () => {
	const { t } = useTranslation();
	const { contact } = useRootContext();
	useEffect(() => {
		about = contact?.pageDescription;
		tel = contact?.phoneNumber1;
		email = contact?.email1;
		officeAddress = contact?.address;
	}, [contact]);
	return (
		<footer className="site-footer">
			<div className="site-footer-bg" style={{ backgroundImage: `url(${footerBg})` }}></div>
			<Container>
				<div className="site-footer__top">
					<Row>
						<Col xl={3} lg={6} md={6} className="fadeInUp">
							<div className="footer-widget__column footer-widget__about">
								<h3 className="footer-widget__title">{t("general.About")}</h3>
								<p className="footer-widget__text">
									Funding to support child care providers with obtaining their Child Development Associate® (CDA) Credential™ from the Council for
									Professional Recognition.
								</p>
							</div>
						</Col>
						<Col xl={3} lg={6} md={6} className="wow fadeInUp" data-wow-delay="200ms">
							<div className="footer-widget__column footer-widget__explore clearfix">
								<h3 className="footer-widget__title">{t("general.Explore")}</h3>
								<ul className="footer-widget__explore-list list-unstyled">
									{exploreList.slice(0, 5).map(({ id, title, href }) => (
										<li key={id}>
											<Link href={href}>
												<a href="#">{title}</a>
											</Link>
										</li>
									))}
									<li>
										<Link href="/terms-conditions">
											<a href="#">{t("general.Term&Condition")}</a>
										</Link>
									</li>
									<li>
										<Link href="/privacy-policy">
											<a href="#">{t("general.PrivacyPolicy")}</a>
										</Link>
									</li>
								</ul>
							</div>
						</Col>
						<Col xl={3} lg={6} md={6} className="fadeInUp">
							<div className="footer-widget__column footer-widget__contact">
								<h3 className="footer-widget__title">{t("general.Contact")}</h3>
								<ul className="list-unstyled footer-widget__contact-list">
									<li>
										<div className="icon">
											<i className="icon-chat"></i>
										</div>
										<div className="text">
											<p>
												<span>Call Anytime</span>
												<a href={`tel:${tel}`}>{tel}</a>
											</p>
										</div>
									</li>
									<li>
										<div className="icon">
											<i className="icon-message"></i>
										</div>
										<div className="text">
											<p>
												<span>Send Email</span>
												<a href={`mailto:${email}`}>{email}</a>
											</p>
										</div>
									</li>
									<li>
										<div className="icon">
											<i className="icon-address"></i>
										</div>
										<div className="text">
											<p>
												<span>Visit Office</span>
												{officeAddress}
											</p>
										</div>
									</li>
								</ul>
							</div>
						</Col>
						<Col xl={3} lg={6} md={6} className="wow fadeInUp" data-wow-delay="400ms">
							<div className="footer-widget__column footer-widget__newsletter">
								<h3 className="footer-widget__title">Newsletter</h3>
								<p className="footer-widget__newsletter-text">Join our mailing to receive the latest news and updates from out team.</p>
								<form className="footer-widget__newsletter-form">
									<input type="email" placeholder={t("general.Emailaddress")} name="email" />
									<button type="submit" className="footer-widget__newsletter-btn">
										<i className="fas fa-arrow-circle-right"></i>
										{t("general.Send")}
									</button>
								</form>
							</div>
						</Col>
					</Row>
				</div>
				<div className="site-footer__bottom">
					<Row>
						<Col xl={12}>
							<div className="site-footer__bottom-inner">
								<div className="site-footer__bottom-logo-social">
									<div className="site-footer__bottom-logo" style={{ padding: "10px 16px" }}>
										<Link href="/">
											<a>
												<Image src={brandLogo.src} alt="CDA Logo - Children Cambodia Association Logo" width="114" />
											</a>
										</Link>
									</div>
									<div className="site-footer__bottom-social">
										{social.map(({ icon, link }, index) => (
											<a
												href={
													link === "facebookLink"
														? contact?.facebookLink
														: link === "linkedinLink"
														? contact?.linkedinLink
														: link === "instagramLink"
														? contact?.instagramLink
														: link === "telegramLink"
														? contact?.telegramLink
														: null
												}
												key={index}
												target="_blank"
												rel="noreferrer"
											>
												<i className={`fab ${icon}`}></i>
											</a>
										))}
									</div>
								</div>
								<div className="site-footer__bottom-copy-right">
									<p>
										© Copyright {copyrightYear} Children Development Association | Designed by{" "}
										<a target="_blank" rel="noreferrer" href={`https://${link}`}>
											{link}
										</a>
									</p>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</Container>
		</footer>
	);
};

export default SiteFooter;
