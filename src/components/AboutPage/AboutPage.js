import aboutProgress from "@/data/aboutProgress";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import AboutProgressbar from "./AboutProgressbar";
import { api } from "src/config";
import { useTranslation } from "react-i18next";
import { remark } from "remark";
import html from "remark-html";

const AboutPage = ({ data = null }) => {
	const { t } = useTranslation();
	const [content1, setContent1] = useState(null);
	const convertMarkdownToHtml1 = async () => {
		// const processedContent = await remark().use(html).process(data?.cardDesc1);
		// setContent1(processedContent.toString());
		setContent1(data?.cardDesc1);
	};
	const [content2, setContent2] = useState(null);
	const convertMarkdownToHtml2 = async () => {
		// const processedContent = await remark().use(html).process(data?.cardDesc2);
		// setContent2(processedContent.toString());
		setContent2(data?.cardDesc2);
	};
	const [content3, setContent3] = useState(null);
	const convertMarkdownToHtml3 = async () => {
		// const processedContent = await remark().use(html).process(data?.cardDesc3);
		// setContent3(processedContent.toString());
		setContent3(data?.cardDesc3);
	};

	function readmore(id) {
		const content = document.querySelectorAll(".about-page__performance_content");
		const element = `#read-more-${id}`;
		const item = document.querySelector(element);
		content.forEach((q)=>{
			if(q.attributes[0].value == id){
				if(q.classList.contains("show")){
					q.classList.remove("show");
					item.innerHTML = `${t("general.Hide")}`;
				} else {
					q.classList.add('show');
					item.innerHTML = `${t("general.READMORE")}`;	
				}
			}
		});
	}

	useEffect(() => {
		convertMarkdownToHtml1();
		convertMarkdownToHtml2();
		convertMarkdownToHtml3();
	}, [data]);
	return (
		<section className="about-page p-bottom-0">
			<Container>
				<Row>
					<Col xl={6}>
						<div className="about-page__left">
							<div className="about-page__img">
								<Image
									src={
										data?.thumbnailTwo
											? api.RESOURCE + data?.thumbnailTwo
											: "https://res.cloudinary.com/dufghzvge/image/upload/v1704357238/about-page-img-1.7d4e6700_eeuspu.jpg"
									}
									alt=""
								/>
								{/* <div className="about-page__trusted">
									<h3>
										{t("general.WeAreTrustedBy")} <span>{data?.donorTrusted}</span> {t("general.donors")}
									</h3>
								</div> */}
							</div>
						</div>
					</Col>
					<Col xl={6}>
						<div className="about-page__right">
							<div className="section-title text-left">
								<h2 style={{color: "var(--thm-primary)"}} className="section-title__title">{data?.introTitle}</h2>
								<span className="section-title__tagline">{t("general.OurIntroductions")}</span>
							</div>
							<p className="about-page__right-text" dangerouslySetInnerHTML={{ __html: data?.introDesc }}></p>
							{/* <h3 className="about-page__right-title">{data?.introHighlight}</h3>
							<div className="about-five__progress-wrap">
								<AboutProgressbar
									progress={{
										percentage: data?.successfulCampaign,
										title: t("general.SuccessfulCampaign"),
									}}
								/>
								<AboutProgressbar
									progress={{
										percentage: data?.amazingDonors,
										title: t("general.AmazingDonors"),
									}}
								/>
							</div> */}
						</div>
					</Col>
				</Row>
			</Container>
			<div className="about-page__performance">
				<Container>
					<Row>
						<Col lg={4}>
							<div className="about-page__performance--item">
								<h2>{data?.cardTitle1}</h2>
								<i className={data?.cardIcon1}></i>
								<div data-id="1" className="about-page__performance_content show" dangerouslySetInnerHTML={{ __html: content1 }}></div>
								<button onClick={() => readmore(1)} id="read-more-1">{t('general.READMORE')}</button>
							</div>
						</Col>
						<Col lg={4}>
							<div className="about-page__performance--item">
								<h2>{data?.cardTitle2}</h2>
								<i className={data?.cardIcon2}></i>
								<div data-id="2" className="about-page__performance_content show" dangerouslySetInnerHTML={{ __html: content2 }}></div>
								<button onClick={() => readmore(2)} id="read-more-2">{t('general.READMORE')}</button>
							</div>
						</Col>
						<Col lg={4}>
							<div className="about-page__performance--item">
								<h2>{data?.cardTitle3}</h2>
								<i className={data?.cardIcon3}></i>
								<div data-id="3" className="about-page__performance_content show" dangerouslySetInnerHTML={{ __html: content3 }}></div>
								<button onClick={() => readmore(3)} id="read-more-3">{t('general.READMORE')}</button>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</section>
	);
};

export default AboutPage;
