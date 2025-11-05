import footerData from "@/data/footerData";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import brandLogo from "../../assets/images/LOGO-CAA New.png";
import accept from "../../assets/images/accept-payment.svg";
import { useRootContext } from "@/context/context";
import { useTranslation } from "react-i18next";
import { api } from "src/config";
import axios from "axios";
const { exploreList, social, email, tel, officeAddress, about, link, copyrightYear, footerBg } = footerData;

const SiteFooter = () => {
	const { t } = useTranslation();
	const { contact, lang } = useRootContext();
	const [homepage, setHomepage] = useState(null);

	const fetchHomePage = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/home`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((response) => {
				setHomepage(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	useEffect(() => {
		fetchHomePage();
	}, [lang]);

	useEffect(() => {
		about = contact?.pageDescription;
		tel = contact?.phoneNumber1;
		email = contact?.email1;
		officeAddress = contact?.address;
	}, [contact]);
	return (
		<footer className="site-footer">
			<div className="site-footer-bg" style={{ backgroundImage: `url(${homepage?.thumbnailSix ? api.RESOURCE + homepage?.thumbnailSix : footerBg})` }}></div>
			<Container>
				<div className="site-footer__top">
					<Row>
						<Col xl={3} lg={6} md={6} className="fadeInUp">
							<div className="footer-widget__column footer-widget__about">
								<h3 className="footer-widget__title">{t("general.About")}</h3>
								<p className="footer-widget__text">
									{homepage?.footerDesc ? homepage?.footerDesc : "Funding to support child care providers with obtaining their Alumni® (Alumni) Credential™ from the Council for Professional Recognition."}
								</p>
							</div>
						</Col>
						<Col xl={2} lg={6} md={6} className="wow fadeInUp" data-wow-delay="200ms">
							<div className="footer-widget__column footer-widget__explore clearfix">
								<h3 className="footer-widget__title">{t("general.Explore")}</h3>
								<ul className="footer-widget__explore-list list-unstyled">
									{exploreList.slice(0, 7).map(({ id, title, href }) => (
										<li key={id}>
											<Link href={href}>
												<a href="#" style={{textTransform: "capitalize"}}>{t(`header.${title}`)}</a>
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
												<span>{t("general.CallAnytime")}</span>
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
												<span>{t("general.SendEmail")}</span>
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
												<span>{t("general.VisitOffice")}</span>
												{officeAddress}
											</p>
										</div>
									</li>
									<li>
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
									</li>
								</ul>
							</div>
						</Col>
						{/* <Col xl={3} lg={6} md={6} className="wow fadeInUp" data-wow-delay="400ms">
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
						</Col> */}
						<Col xl={4} lg={6} md={6} className="wow fadeInUp" data-wow-delay="400ms">
							<div className="footer-widget__column footer-widget__newsletter">
								<h3 className="footer-widget__title">Facebook Page</h3>
								<iframe
								src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100069908061589&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
								width="100%"
								height="270"
								style={{ border: "none", overflow: "hidden" }}
								allowFullScreen={true}
								scrolling="no"frameBorder="0"
								title="facebook-page"
								/>
							</div>
						</Col>
						{/* <Col lg={4}>
							<div dangerouslySetInnerHTML={{ __html: `
								<a href="https://info.flagcounter.com/4Qig">
									<img src="https://s11.flagcounter.com/count2/4Qig/bg_FFFFFF/txt_000000/border_CCCCCC/columns_3/maxflags_120/viewers_0/labels_1/pageviews_1/flags_0/" 
										alt="Flag Counter" border="0">
								</a>
							`}} />
						</Col> */}
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
								</div>
								<div className="site-footer__bottom-copy-right">
									<p className="text-center text-lg-left">
										 Copyright © {copyrightYear} CAA . All Rights Reserved | Designed by{" "}
										<a target="_blank" rel="noreferrer" href={`https://${link}`}>
											{link}
										</a>
									</p>
								</div>
								<div className="site-footer__bottom-copy-right">
									<p className="text-center text-lg-left">
										We Accept:
										<Image style={{marginLeft: "10px"}} src={accept.src} alt="#" height="20px" />
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
