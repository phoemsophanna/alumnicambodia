import brandOne from "@/data/brandOne";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { api } from "src/config";
const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });

const settings = {
	lazyload: true,
	nav: false,
	mouseDrag: true,
	items: 2,
	autoplay: true,
	autoHeight: true,
	controls: false,
	gutter: 0,
	responsive: {
		576: {
			items: 2,
			gutter: 10,
		},
		768: {
			items: 3,
			gutter: 15,
		},
		992: {
			items: 4,
			gutter: 15,
		},
		1200: {
			items: 5,
			gutter: 20,
		},
	},
};

const BrandOne = ({ brandClass = "" }) => {
	const [partners, setPartners] = useState([]);
	const {t} = useTranslation();

	const fetchPartners = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/home/partner`,
				headers: {
					"Content-Type": "application/json"
				},
			})
			.then((response) => {
				setPartners(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	useEffect(() => {
		fetchPartners();
	}, []);

	return (
		<section className={`brand-one ${brandClass}`}>
			<Container>
				<div className="section-title text-center">
					<span className="section-title__tagline with-right">{t("general.OurPartner")}</span>
				</div>
				<Row>
					<Col xl={12}>
						<TinySlider settings={settings} className="brand-one__carousel">
							{partners.map((partner, index) => (
								<div key={index}>
									<div style={{ userSelect: "none" }} className="brand-one__single">
										<div className="brand-one__img p-6">
											<Image src={partner?.image ? api.RESOURCE + partner?.image : "/causes-one-img-1.jpg"} alt="" style={{ width: "120px" }} />
										</div>
									</div>
								</div>
							))}
						</TinySlider>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default BrandOne;
