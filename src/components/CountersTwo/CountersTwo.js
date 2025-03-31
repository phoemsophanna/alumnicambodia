import countersTwo from "@/data/countersTwo";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import JarallaxImage from "../Jarallax/JarallaxImage";
import axios from "axios";
import { api } from "src/config";
import { useRouter } from "next/router";
import { useRootContext } from "@/context/context";

const Jarallax = dynamic(() => import("../Jarallax/Jarallax"), { ssr: false });

const CountersTwo = ({ extraClass = "" }) => {
	const [campaignCategories, setCampaignCategories] = useState([]);
	const { toggleLogin, userProfile, lang } = useRootContext();
	const router = useRouter();
	const fetchCampaignCategory = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/category-dropdown`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((res) => {
				setCampaignCategories(res.data?.categories);
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	};
	useEffect(() => {
		fetchCampaignCategory();
		return () => {
			setCampaignCategories([]);
		};
	}, [lang]);
	return (
		<section className={`counters-two ${extraClass}`} style={{ paddingBottom: "50px" }}>
			<Jarallax className="counters-two-bg" speed={0.2} imgPosition="50% 0%">
				<JarallaxImage src="https://res.cloudinary.com/dufghzvge/image/upload/v1704273539/three-boxes-img-1.651d35b8_adwvoe.jpg" />
			</Jarallax>
			<Container>
				<Row>
					{/* <Col xl={5} lg={5}>
						<div className="counters-two__left">
							<div className="section-title text-left">
								<span className="section-title__tagline">Get Daily Updates</span>
								<h2 className="section-title__title">Check what make us different than others</h2>
							</div>
						</div>
					</Col> */}
					<Col xl={12} lg={12}>
						<div className="counters-two__right">
							<ul className="counters-two__four-boxes list-unstyled">
								{campaignCategories.map((c, i) => (
									<li
										key={i}
										style={{ cursor: "pointer" }}
										onClick={() => {
											if (userProfile) {
												router.replace("/form-campaign");
											} else {
												toggleLogin(true);
											}
										}}
									>
										<div className="counters-two__four-boxes-icon" style={{ overflow: "hidden" }}>
											<img
												src={c?.image ? `${api.RESOURCE}${c?.image}` : "/causes-one-img-1.jpg"}
												style={{ width: "100%", height: "100%", objectFit: "cover" }}
											/>
										</div>
										<h4>
											{c?.name} ({c?.countProject})
										</h4>
									</li>
								))}
							</ul>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default CountersTwo;
