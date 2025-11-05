import React from "react";
import { Col, Image } from "react-bootstrap";
import { api } from "src/config";

const SingleTeamOne = ({ team = {}, onSelectTeam }) => {
	const { image, name, position, facebookLink, telegramLink, instagramLink, linkedinLink } = team;

	return (
		<Col xl={4} lg={4}>
			<div className="team-one__single" onClick={onSelectTeam}>
				<div className="team-one__img-box">
					<div className="team-one__img">
						<Image src={image ? api.RESOURCE + image : "causes-one-img-1.jpg"} alt="" />
					</div>
					{/* <div className="team-one__member-name">
						<h2>{name}</h2>
					</div> */}
				</div>
				<div className="team-one__content">
					<h4 className="team-one__member-title">{name}</h4>
					<p className="team-one__text-box">{position}</p>
				</div>
				{/* <div className="team-one__social">
					{facebookLink ? (
						<a href={facebookLink}>
							<i className={`fab fa-facebook-square`}></i>
						</a>
					) : null}
					{instagramLink ? (
						<a href={instagramLink}>
							<i className={`fab fa-instagram`}></i>
						</a>
					) : null}
					{linkedinLink ? (
						<a href={linkedinLink}>
							<i className={`fab fa-linkedin`}></i>
						</a>
					) : null}
					{telegramLink ? (
						<a href={telegramLink}>
							<i className={`fab fa-telegram`}></i>
						</a>
					) : null}
				</div> */}
			</div>
		</Col>
	);
};

export default SingleTeamOne;
