import { social } from "@/data/NavItems";
import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useRootContext } from "@/context/context";
import { api } from "src/config";
import Countdown from "react-countdown";
import ModalVideo from "react-modal-video";

const CausesDetailsLeftLoading = () => {
	return (
		<div className="causes-details__left-bar">
			<div className="causes-details__img">
				<div className="causes-details__img-box">
					<Image src={campaign?.campaignGallery?.length > 0 ? `${api.RESOURCE}${campaign?.campaignGallery[0]}` : "/causes-one-img-1.jpg"} alt="" />
					<div className="causes-details__category">
						<span>{campaign?.campaignCategory?.name}</span>
					</div>
					{campaign?.videoLink ? (
						<button className="causes-details__play" onClick={() => setOpen(true)}>
							<i className="fab fa-youtube"></i> Play YouTube
						</button>
					) : null}
					{campaign?.videoFile ? (
						<button className="causes-details__play" onClick={() => setOpenMP4(true)}>
							<i className="fas fa-video"></i> Play Video
						</button>
					) : null}

					<div className="causes-details__timer">
						<p className="causes-details__timer-title"> Campaign Expired On </p>
						<Countdown date={Date.parse(campaign?.endDate)} renderer={renderer} />
					</div>
				</div>
				<div className="causes-details__progress">
					<div className="bar">
						<div
							className="bar-inner count-bar"
							style={{ width: (raisedNumber / goalNumber) * 100 > 100 ? "100%" : percent, opacity: 1 }}
							data-percent={(raisedNumber / goalNumber) * 100 > 100 ? "100%" : percent}
						>
							<div style={{ opacity: 1 }} className="count-text">
								{percent}
							</div>
						</div>
					</div>
					<div className="causes-details__goals">
						<p>
							<span>${raisedNumber}</span> Raised
						</p>
						<p>
							<span>${goalNumber}</span> Goal
						</p>
					</div>
					<button className="thm-btn donation-detail-button" onClick={() => toggleDonation(true, campaign?.id)}>
						<i className="fas fa-donate"></i> DONATE
					</button>
				</div>
			</div>
			<div className="causes-details__text-box">
				<h3>{campaign?.campaignTile}</h3>
				<p>
					<em>Reference Link: </em>
					<a href={campaign?.referenceLink} target="_blank" rel="noreferrer">
						{campaign?.referenceLink}
					</a>
				</p>
				<div className="causes-details__text-box--detail" dangerouslySetInnerHTML={{ __html: campaign?.fullStory }}></div>
			</div>
			<div className="causes-details__images-box">
				<Row>
					{campaign?.campaignGallery?.slice(1).map((image, index) => (
						<Col xl={6} lg={6} key={index}>
							<div className="causes-details__images-single mb-3">
								<Image src={api.RESOURCE + image} alt="" />
							</div>
						</Col>
					))}
				</Row>
			</div>
			<div className="causes-details__share">
				<div className="causes-details__share-social">
					{social.map(({ icon, link }, index) => (
						<a href={link} key={index}>
							<i className={`fab ${icon}`}></i>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default CausesDetailsLeftLoading;
