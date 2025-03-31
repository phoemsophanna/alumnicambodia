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
						mainImg={campaign?.campaignGallery?.length > 0 ? campaign?.campaignGallery[0] : null}
						smallImg={campaign?.campaignGallery?.length > 1 ? campaign?.campaignGallery[1] : null}
					/>
					<CharityContent campaignInfo={campaign} />
				</Row>
			</Container>
		</section>
	) : null;
};

export default Charity;
