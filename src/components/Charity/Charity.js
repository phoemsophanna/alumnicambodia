import React from "react";
import { Container, Row } from "react-bootstrap";
import CharityContent from "./CharityContent";
import CharityImage from "./CharityImage";

const Charity = ({ campaign = null }) => {
	return campaign ? (
		<section className="welcome-one">
			<Container>
				<Row>
					<CharityImage
						mainImg={campaign?.thumbnailTwo ? campaign?.thumbnailTwo : null}
						// smallImg={campaign?.thumbnailTwo ? campaign?.thumbnailTwo : null}
					/>
					<CharityContent campaignInfo={campaign} />
				</Row>
			</Container>
		</section>
	) : null;
};

export default Charity;
