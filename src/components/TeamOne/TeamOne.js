import React, { useEffect, useState } from "react";
import { Button, Container, Image, Modal, Row } from "react-bootstrap";
import SingleTeamOne from "./SingleTeamOne";
import axios from "axios";
import { api } from "src/config";
import { useRootContext } from "@/context/context";
import { useTranslation } from "react-i18next";

const TeamOne = ({ className = "" , professionalVolunteer = ""}) => {
	const { lang } = useRootContext();
	const [team, setTeam] = useState([]);
	const { t } = useTranslation();
	const [modalShow, setModalShow] = React.useState(false);
	const [teamDetail, setTeamDetail] = useState(null);
	const fetchAbout = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/about/teams`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((response) => {
				setTeam(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	const selectTeam = async (detail) => {
		setTeamDetail(detail);
		setModalShow(true);
	};

	const onCloseModal = () => {
		setTeamDetail(null);
		setModalShow(false);
	}

	useEffect(() => {
		fetchAbout();
	}, [lang]);

	return (
		<section className={`team-one ${className}`}>
			<Container>
				{!className && (
					<div className="section-title text-center">
						<span className="section-title__tagline">{t("general.OurTeam")}</span>
						<h2 className="section-title__title" dangerouslySetInnerHTML={{__html: professionalVolunteer}}></h2>
					</div>
				)}
				<Row>
					{team.map((it) => (
						<SingleTeamOne key={it.id} team={it} onSelectTeam={() => selectTeam(it)} />
					))}
					<Modal show={modalShow} onHide={() => onCloseModal()} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
						<Modal.Header closeButton>
							<h5>Our Team Detail</h5>
						</Modal.Header>
						<Modal.Body>
							<div className="team-detail-container">
								<div className="team-detail-info">
									<div className="team-one__single">
										<div className="team-one__img-box">
											<div className="team-one__img">
											<Image src={teamDetail?.image ? api.RESOURCE + teamDetail?.image : "causes-one-img-1.jpg"} alt="" />
											</div>
										</div>
										<div className="team-one__content">
											<h4 className="team-one__member-title">{teamDetail?.name}</h4>
											<p className="team-one__text-box">{teamDetail?.position}</p>
										</div>
										<div className="team-one__social">
											{teamDetail?.facebookLink ? (
												<a href={teamDetail?.facebookLink}>
													<i className={`fab fa-facebook-square`}></i>
												</a>
											) : null}
											{teamDetail?.instagramLink ? (
												<a href={teamDetail?.instagramLink}>
													<i className={`fab fa-instagram`}></i>
												</a>
											) : null}
											{teamDetail?.linkedinLink ? (
												<a href={teamDetail?.linkedinLink}>
													<i className={`fab fa-linkedin`}></i>
												</a>
											) : null}
											{teamDetail?.telegramLink ? (
												<a href={teamDetail?.telegramLink}>
													<i className={`fab fa-telegram`}></i>
												</a>
											) : null}
										</div>
									</div>
								</div>
								<div className="team-detail-content" dangerouslySetInnerHTML={{ __html: teamDetail?.desc }}></div>
							</div>
						</Modal.Body>
					</Modal>
				</Row>
			</Container>
		</section>
	);
};

export default TeamOne;
