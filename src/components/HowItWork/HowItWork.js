import { useRootContext } from "@/context/context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const HowItWork = ({ extraClass = "" }) => {
	const {t} = useTranslation();
	const [howItWork, setHowItWork] = useState([]);
	const { lang } = useRootContext();

	const fetchHowItWork = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/how-it-work`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang
				},
			})
			.then((response) => {
				setHowItWork(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	useEffect(() => {
		fetchHowItWork();
	}, [lang]);

	return (
		<section className={`how-it-work ${extraClass}`}>
			<Container>
				<h1>{t("general.HowItWorks")}</h1>
				<Row>
					{howItWork.map((item, index) => (
						<Col lg={3} md={6} key={index}>
							<div className="how-it-work__wrapper">
								<div className="how-it-work__img">
									<img src={item?.image ? api.RESOURCE + item?.image : "/causes-one-img-1.jpg"} alt="" />
									<span className="how-it-work__counter">{index + 1}</span>
								</div>
								<h3>{item?.title}</h3>
								<p>{item?.description}</p>
							</div>
						</Col>
					))}
				</Row>
			</Container>
		</section>
	);
};

export default HowItWork;
