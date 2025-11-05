import React from "react";
import { Row } from "react-bootstrap";
import SingleBox from "./SingleBox";

const ThreeBoxes = ({ data = null }) => {
	return (
		<section className="three-boxes">
			<div className="container-box">
				<Row>
					{data?.cardIsShow1 ? (
						<SingleBox
							singleBox={{
								icon: data?.cardIcon1,
								title: data?.cardTitle1,
								description: data?.cardDesc1,
								labelBtn: data?.cardLabel1,
								link: data?.cardLinkTo1,
								image: data?.thumbnailTwo,
								className: "",
								col: data?.cardIsShow2 && data?.cardIsShow3 ? 4 : data?.cardIsShow2 || data?.cardIsShow3 ? 6 : 12,
							}}
						/>
					) : null}
					{data?.cardIsShow2 ? (
						<SingleBox
							singleBox={{
								icon: data?.cardIcon2,
								title: data?.cardTitle2,
								description: data?.cardDesc2,
								labelBtn: data?.cardLabel2,
								link: data?.cardLinkTo2,
								image: data?.thumbnailThree,
								className: "three-boxes__single-item-two",
								col: data?.cardIsShow1 && data?.cardIsShow3 ? 4 : data?.cardIsShow1 || data?.cardIsShow3 ? 6 : 12,
							}}
						/>
					) : null}
					{data?.cardIsShow3 ? (
						<SingleBox
							singleBox={{
								icon: data?.cardIcon3,
								title: data?.cardTitle3,
								description: data?.cardDesc3,
								labelBtn: data?.cardLabel3,
								link: data?.cardLinkTo3,
								image: data?.thumbnailFour,
								className: "three-boxes__single-item-three",
								col: data?.cardIsShow2 && data?.cardIsShow1 ? 4 : data?.cardIsShow2 || data?.cardIsShow1 ? 6 : 12,
							}}
						/>
					) : null}
				</Row>
			</div>
		</section>
	);
};

export default ThreeBoxes;
