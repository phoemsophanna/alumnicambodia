import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CausesDetailsLeft from "./CausesDetailsLeft";

const CausesDetailsPage = ({ detail = null }) => {
	return (
		<section className="causes-details">
			<Container>
				<Row>
					<Col lg={12}>
						<CausesDetailsLeft campaign={detail} />
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default CausesDetailsPage;
