import causesData from "@/data/causesData";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CausesSingle from "./CausesSingle";

import dynamic from "next/dynamic";
const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });
// import "tiny-slider/dist/tiny-slider.css";
import { useTranslation } from "react-i18next";

const CausesOne = ({ campaigns = [], latestProject = "" }) => {
	const { t } = useTranslation();
	const [record, setRecord] = useState([]);

	useEffect(() => {
		setRecord(campaigns);
	}, [campaigns]);

	return (
		<section className="causes-one">
			<Container>
				<div className="section-title text-center">
					<span className="section-title__tagline">{t("general.LatestProjects")}</span>
					<h2 className="section-title__title" dangerouslySetInnerHTML={{__html: latestProject}}></h2>
				</div>
				<Row>
					<Col xl={12}>
						<div className="causes-one__carousel">
							{record.length > 0 ? (
								<TinySlider
									settings={{
										lazyload: true,
										nav: true,
										mouseDrag: true,
										items: 3,
										autoplay: true,
										autoHeight: true,
										controls: false,
										navPosition: "bottom",
										gutter: 0,
										responsive: {
											320: {
												items: 1
											},
											768: {
												items: 2,
												gutter: 20,
											},
											992: {
												items: 3,
												gutter: 30,
											},
										},
									}}
								>
									{record.map((campaign, index) => (
										<CausesSingle cause={campaign} key={index} />
									))}
								</TinySlider>
							) : null}
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default CausesOne;
