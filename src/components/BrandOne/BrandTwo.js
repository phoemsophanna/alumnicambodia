import brandOne from "@/data/brandOne";
import dynamic from "next/dynamic";
import React from "react";
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

const BrandTwo = ({ brandClass = "", partners = [] }) => {
	const {t} = useTranslation();
	return (
		<section className={`brand-one ${brandClass}`}>
			<Container>
				<div className="section-title text-center">
					<span className="section-title__tagline with-right">{t("general.OurPartner")}</span>
				</div>
				<Row>
                    {partners.map((item, index) => (
                        <Col xl={2} md={3} sm={4} xs={6} key={index}>
                            <div style={{ userSelect: "none" }} className="brand-one__single">
                                <div className="brand-one__img in-about-page p-6">
                                    <Image src={item?.image ? api.RESOURCE + item?.image : "/causes-one-img-1.jpg"} alt="" style={{ width: "120px" }} />
                                </div>
                            </div>
                        </Col>
                    ))}
				</Row>
			</Container>
		</section>
	);
};

export default BrandTwo;
