import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CausesSingle from "../CausesOne/CausesSingle";

const CausesPage = ({ campaignList = [],  split = 0 }) => {

	return (
		<section className="causes-one causes-page pt-0">
			<Container>
				<Row>
					{campaignList.map((cause) => (
						<Col xl={4} lg={6} md={6} key={cause.id}>
							<CausesSingle cause={cause} />
						</Col>
					))}
				</Row>
			</Container>
		</section>
	);
};

export default CausesPage;
