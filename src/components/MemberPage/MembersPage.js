import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import axios from "axios";
import { api } from "src/config";
import { useTranslation } from "react-i18next";

const MembersPage = () => {
	const {t} = useTranslation();
	const [record, setRecord] = useState([]);
	const fetchDonorList = async () => {
		await axios
			.get(`${api.BASE_URL}/web/members`)
			.then((res) => {
				setRecord(res.data.sort((a,b) => b.totalDonation - a.totalDonation));
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	};

	useEffect(() => {
		fetchDonorList();
	}, []);

	return (
		<section className="donors-page">
			<Container>
				<Row>
					{record.map((donor, index) => (
						<Col xl={3} lg={4} md={6} sm={6} xs={6} key={index}>
							<div style={{ userSelect: "none" }} className="testimonial-one__single">
								<div className="testimonial-one__client-info">
									<div className="testimonial-one__client-img">
										{donor?.loginBy === 3 ? <Image alt="" src={donor.image}  /> : <Image alt="" src={donor.image ? `${api.RESOURCE}${donor.image}` : "/default_pfp.jpg"} /> }
									</div>
									<div className="testimonial-one__client-name">
										<h3>{donor.name}</h3>
									</div>
									<div className="donation-detail-container" style={{justifyContent: "center"}}>
										<div className="donation-detail-item">
											<strong>{donor.location}</strong>
										</div>
									</div>
								</div>
							</div>
						</Col>
					))}
				</Row>
			</Container>
		</section>
	);
};

export default MembersPage;
