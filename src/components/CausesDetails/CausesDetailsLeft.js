import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Placeholder, Row, Spinner } from "react-bootstrap";
import { useRootContext } from "@/context/context";
import { api } from "src/config";
import Countdown from "react-countdown";
import ModalVideo from "react-modal-video";
import { useTranslation } from "react-i18next";
import SingleComment from "./SingleComment";
import axios from "axios";
import Cookies from "js-cookie";

const CausesDetailsLeft = ({ campaign = null }) => {
	const { t } = useTranslation();
	const [isOpen, setOpen] = useState(false);
	const [isOpenMP4, setOpenMP4] = useState(false);
	const { toggleDonation, toggleLogin } = useRootContext();
	const raisedNumber = campaign ? +campaign?.totalRaised : 0;
	const goalNumber = campaign ? +campaign?.goal : 0;
	const percent = Math.round((raisedNumber / goalNumber) * 100) + "%";
	const [comment, setComment] = useState("");
	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a complete state
			return <span>Expired</span>;
		} else {
			// Render a countdown
			return (
				<div className="causes-details__timer-wrapper">
					<div className="causes-details__timer-box">
						<span className="causes-details__timer-number">{String(days).padStart(2, "0")}</span>
						<span className="causes-details__timer-label">D</span>
					</div>
					<span className="causes-details__timer-comma">:</span>
					<div className="causes-details__timer-box">
						<span className="causes-details__timer-number">{String(hours).padStart(2, "0")}</span>
						<span className="causes-details__timer-label">H</span>
					</div>
					<span className="causes-details__timer-comma">:</span>
					<div className="causes-details__timer-box">
						<span className="causes-details__timer-number">{String(minutes).padStart(2, "0")}</span>
						<span className="causes-details__timer-label">MIN</span>
					</div>
					<span className="causes-details__timer-comma">:</span>
					<div className="causes-details__timer-box">
						<span className="causes-details__timer-number">{String(seconds).padStart(2, "0")}</span>
						<span className="causes-details__timer-label">SEC</span>
					</div>
				</div>
			);
		}
	};

	function youtubeParse(link) {
		var video_id = link.split("v=")[1];
		var ampersandPosition = video_id?.indexOf("&");
		if (ampersandPosition != -1) {
			video_id = video_id?.substring(0, ampersandPosition);
		}
		return video_id;
	}

	const [commentList, setCommentList] = useState([]);
	const [commentListPage, setCommentListPage] = useState(1);
	const [isCommentListLoading, setCommentListLoading] = useState(false);
	const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true);
	const fetchCommentList = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/comment-list/${campaign?.id}?limit=6`,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				setCommentList(response.data);
				setCommentListPage(1);
				setShowLoadMoreBtn(true);
			})
			.catch((e) => {
				console.error(e);
			});
	};

	const onLoanMoreCommentList = async () => {
		setCommentListLoading(true);
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/comment-list/${campaign?.id}?limit=6&page=${commentListPage + 1}`,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				setCommentList((current) => [...current, ...response.data]);
				setCommentListPage((currentPage) => currentPage + 1);
				setShowLoadMoreBtn(response.data.length > 0);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				setCommentListLoading(false);
			});
	};

	const [isPostingComment, setIsPostingComment] = useState(false);
	const handleCommentCampaign = async () => {
		setIsPostingComment(true);
		const token = await Cookies.get("TOKEN");
		if (token) {
			await axios
				.request({
					method: "post",
					maxBodyLength: Infinity,
					url: `${api.BASE_URL}/web/campaign/user/comment`,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					data: {
						campaignId: campaign?.id,
						comment: comment,
					},
				})
				.then((response) => {
					if (response.data?.status === "success") {
						fetchCommentList();
						setComment("");
					}
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setIsPostingComment(false);
				});
		} else {
			console.log("Cannot Comment");
			toggleLogin(true);
			setIsPostingComment(false);
			setComment("");
		}
	};

	useEffect(() => {
		fetchCommentList();
	}, [campaign]);

	return (
		<div className="causes-details__left-bar" style={{ fontWeight: "500" }}>
			{campaign?.videoLink && (
				<ModalVideo
					channel="youtube"
					isOpen={isOpen}
					videoId={youtubeParse(campaign?.videoLink)}
					youtube={{ mute: 0, autoplay: 1 }}
					onClose={() => setOpen(false)}
				/>
			)}
			{campaign?.videoFile && (
				<ModalVideo channel="custom" isOpen={isOpenMP4} url={api.RESOURCE + campaign?.videoFile} onClose={() => setOpenMP4(false)} />
			)}

			<div className="causes-details__img">
				<div className="causes-details__img-box">
					<Image src={campaign?.campaignGallery?.length > 0 ? `${api.RESOURCE}${campaign?.campaignGallery[0]}` : "/causes-one-img-1.jpg"} alt="" />
					<div className="causes-details__category">
						<span>{campaign?.campaignCategory?.name}</span>
					</div>

					{campaign?.videoLink ? (
						<button className="causes-details__play" onClick={() => setOpen(true)}>
							<i className="fab fa-youtube"></i> {t("general.PlayYouTube")}
						</button>
					) : null}
					{campaign?.videoFile ? (
						<button className="causes-details__play" onClick={() => setOpenMP4(true)}>
							<i className="fas fa-video"></i> {t("general.PlayVideo")}
						</button>
					) : null}

					<div className="causes-details__timer">
						<p className="causes-details__timer-title"> {t("general.CampaignExpiredOn")} </p>
						{campaign?.endDate ? <Countdown date={Date.parse(campaign?.endDate)} renderer={renderer} /> : null}
					</div>
				</div>
				{campaign ? (
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
								<span>${raisedNumber}</span> {t("general.Raised")}
							</p>
							<p>
								<span>${goalNumber}</span> {t("general.Goal")}
							</p>
						</div>
						<button className="thm-btn donation-detail-button" onClick={() => toggleDonation(true, campaign?.id)}>
							<i className="fas fa-donate"></i> {t("general.DONATE")}
						</button>
					</div>
				) : null}
			</div>
			<div className="causes-details__text-box">
				{campaign ? (
					<h3>{campaign?.campaignTile}</h3>
				) : (
					<Placeholder as="h3" animation="glow">
						<Placeholder xs={5} />
					</Placeholder>
				)}
				{campaign ? (
					<p className="text-truncate">
						<em>Reference Link: </em>
						<a href={campaign?.referenceLink} target="_blank" rel="noreferrer">
							{campaign?.referenceLink}
						</a>
					</p>
				) : (
					<Placeholder as="p" animation="glow">
						<Placeholder xs={8} size="sm" />
					</Placeholder>
				)}
				{campaign ? (
					<div className="causes-details__text-box--detail" dangerouslySetInnerHTML={{ __html: campaign?.fullStory }}></div>
				) : (
					<div className="causes-details__text-box--detail">
						<Placeholder as="p" animation="glow">
							<Placeholder xs={12} size="sm" />
							<Placeholder xs={10} size="sm" />
							<Placeholder xs={11} size="sm" />
							<Placeholder xs={12} size="sm" />
							<Placeholder xs={6} size="sm" />
						</Placeholder>
						<Placeholder as="p" animation="glow">
							<Placeholder xs={12} size="sm" />
							<Placeholder xs={10} size="sm" />
							<Placeholder xs={11} size="sm" />
							<Placeholder xs={12} size="sm" />
							<Placeholder xs={6} size="sm" />
						</Placeholder>
						<Placeholder as="p" animation="glow">
							<Placeholder xs={12} size="sm" />
							<Placeholder xs={10} size="sm" />
							<Placeholder xs={11} size="sm" />
							<Placeholder xs={12} size="sm" />
							<Placeholder xs={6} size="sm" />
						</Placeholder>
					</div>
				)}
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
			{/* <div className="comment-one">
				<h3 className="comment-one__title">Comments</h3>
				<div className="comment-form_wrapper">
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Control as="textarea" rows={2} placeholder="Comment here ..." value={comment} onChange={(e) => setComment(e.target.value)} />
					</Form.Group>
					<button className="comment-form__send" onClick={() => handleCommentCampaign()}>
						{isPostingComment ? (
							<>
								<Spinner animation="border" size="sm" /> Sending...
							</>
						) : (
							<>
								<i className="fas fa-paper-plane"></i> Send
							</>
						)}
					</button>
				</div>
				{commentList.map((comment) => (
					<SingleComment key={comment.id} comment={comment} />
				))}
				{showLoadMoreBtn ? (
					isCommentListLoading ? (
						<p className="text-center">Loading...</p>
					) : (
						<Button variant="outline-secondary" size="sm" style={{ borderRadius: "20px", width: "100%" }} onClick={() => onLoanMoreCommentList()}>
							Load More
						</Button>
					)
				) : null}
			</div> */}
		</div>
	);
};

export default CausesDetailsLeft;
