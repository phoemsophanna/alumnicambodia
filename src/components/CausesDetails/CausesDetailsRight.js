import { useRootContext } from "@/context/context";
import axios from "axios";
import Cookies from "js-cookie";
import { FacebookShareButton, TelegramShareButton, TwitterShareButton } from "next-share";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Modal } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

function downloadBlob(blob, filename) {
	const objectUrl = URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = objectUrl;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}

const CausesDetailsRight = ({ creator = null, campaignId = null, detail = null }) => {
	const {t} = useTranslation();
	const { toggleLogin, userProfile } = useRootContext();
	const [countLike, setCountLike] = useState(0);
	const [countShare, setCountShare] = useState(0);
	const [modalShow, setModalShow] = useState(false);
	const [qrCodeModalShow, setQrCodeModalShow] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const [record, setRecord] = useState([]);
	const [isCopy, setCopied] = useState(false);
	const [qrCode, setQrCode] = useState(null);
	const svgRef = useRef();

	const fetchDonorList = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/donor-list/${campaignId}`,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				setRecord(response.data);
			})
			.catch((e) => {
				console.error(e);
			});
	};
	const fetchQRCode = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/generate-qr-code/${campaignId}`,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				console.log(response);
			})
			.catch((e) => {
				console.error(e);
			});
	};

	const fetchCheckUserLike = async (cId, uId) => {
		const token = await Cookies.get("TOKEN");
		if (token) {
			await axios
				.request({
					method: "get",
					maxBodyLength: Infinity,
					url: `${api.BASE_URL}/web/campaign/user/user-like`,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					params: {
						campaignId: cId,
						userId: uId,
					},
				})
				.then((response) => {
					if (response.data === 1) {
						setIsFavorite(true);
					} else {
						setIsFavorite(false);
					}
				})
				.catch((e) => {
					console.error(e);
				});
		} else {
			setIsFavorite(false);
		}
	};

	const handleShareCampaign = async (shareWith) => {
		const token = await Cookies.get("TOKEN");
		if (token) {
			await axios
				.request({
					method: "post",
					maxBodyLength: Infinity,
					url: `${api.BASE_URL}/web/campaign/user/share`,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					data: {
						campaignId: campaignId,
						shareWith: shareWith,
					},
				})
				.then((response) => {
					if (response.data?.status === "success") {
						setCountShare((cur) => cur + 1);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			console.log("Share not count");
		}
	};

	const handleLikeCampaign = async () => {
		if (userProfile) {
			const token = await Cookies.get("TOKEN");
			if (token) {
				await axios
					.request({
						method: "post",
						maxBodyLength: Infinity,
						url: `${api.BASE_URL}/web/campaign/user/like`,
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						data: {
							campaignId: campaignId,
							isLike: !isFavorite,
						},
					})
					.then((response) => {
						if (response.data?.status === "success") {
							setCountLike((cur) => (!isFavorite ? cur + 1 : cur - 1));
							setIsFavorite((cur) => !cur);
						}
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				console.log("Share not count");
			}
		} else {
			toggleLogin(true);
		}
	};

	const downloadSVG = useCallback(() => {
		const svg = svgRef.current.innerHTML;

		const blob = new Blob([svg], { type: "image/svg+xml" });
		downloadBlob(blob, `myimage.svg`);
	}, []);

	useEffect(() => {
		if (campaignId && userProfile) {
			fetchCheckUserLike(campaignId, userProfile?.id);
		}
		if (campaignId) {
			fetchDonorList();
		}
	}, [campaignId]);

	useEffect(() => {
		setCountLike(detail?.likeCount);
		setCountShare(detail?.shareCount);
		fetch(`https://api.cdafund.org/api/web/campaign/view-qr-code?qrcode=${detail?.qrCode}`)
			.then((res) => res.text())
			.then((res) => {
				setQrCode(res);
			});
	}, [detail]);

	return (
		<div className="causes-details__right">
			<Modal
				show={modalShow}
				onHide={() => {
					setModalShow(false);
					setCopied(false);
				}}
				size="sm"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter" style={{ width: "100%", margin: "0", padding: "0", lineHeight: "1", fontSize: "1.25rem" }}>
						{t("general.Shareon")}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FacebookShareButton
						url={`https://demo.cdafund.org/projects/${campaignId}`}
						quote={"CDA FUND Share"}
						hashtag={"#CDAFUND"}
						style={{ width: "100%" }}
						onClick={() => handleShareCampaign("FACEBOOK")}
					>
						<button type="button" className="btn-share" style={{ background: "#1877F2", color: "#fff" }}>
							<i className="fab fa-facebook-f"></i>Facebook
						</button>
					</FacebookShareButton>
					<TwitterShareButton
						url={`https://demo.cdafund.org/projects/${campaignId}`}
						title={detail?.title || ""}
						style={{ width: "100%" }}
						onClick={() => handleShareCampaign("TWITTER")}
					>
						<button type="button" className="btn-share" style={{ background: "#1DA1F2", color: "#fff", marginTop: "8px" }}>
							<i className="fab fa-twitter"></i>Twitter
						</button>
					</TwitterShareButton>
					<TelegramShareButton
						url={`https://demo.cdafund.org/projects/${campaignId}`}
						title={detail?.title || ""}
						style={{ width: "100%" }}
						onClick={() => handleShareCampaign("TELEGRAM")}
					>
						<button type="button" className="btn-share" style={{ background: "#24A1DE", color: "#fff", marginTop: "8px" }}>
							<i className="fab fa-telegram-plane"></i>Telegram
						</button>
					</TelegramShareButton>
					<CopyToClipboard
						text={`https://demo.cdafund.org/projects/${campaignId}`}
						onCopy={() => setCopied(true)}
						onClick={() => handleShareCampaign("COPY_LINK")}
					>
						<button type="button" className="btn-copy-link">
							<p>{isCopy ? "Link is copied" : `https://demo.cdafund.org/projects/${campaignId}`}</p>
							{isCopy ? <i className="fas fa-clipboard-check"></i> : <i className="fas fa-clipboard"></i>}
						</button>
					</CopyToClipboard>
				</Modal.Body>
			</Modal>

			<Modal
				show={qrCodeModalShow}
				onHide={() => {
					setQrCodeModalShow(false);
				}}
				size="sm"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter" style={{ width: "100%", margin: "0", padding: "0", lineHeight: "1", fontSize: "1.25rem" }}>
						QR Code
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="qr-code-container">
						<div
							className="qr-code-image"
							ref={svgRef}
							dangerouslySetInnerHTML={{
								__html: qrCode,
							}}
						></div>
						<button type="button" onClick={downloadSVG}>
							Download SVG
						</button>
					</div>
				</Modal.Body>
			</Modal>
			<div className="causes-details__author">
				<div className="author__info">
					<img src={creator?.image ? `${api.RESOURCE}${creator?.image}` : "/default_pfp.jpg"} alt="author-cda-image" />
					<div className="author__info--desc">
						<h3>{creator?.name || "Loading..."}</h3>
						<p>Joint: {creator?.joinAt || "Loading..."}</p>
					</div>
				</div>
				<div className="author__action">
					<button className={`author__action--btn ${isFavorite ? "active" : null}`} onClick={() => handleLikeCampaign()}>
						<div className="icon">
							<i className="fas fa-hand-holding-heart"></i>
						</div>
						{countLike}
					</button>
					<div className="h-line"></div>
					<button className="author__action--btn" onClick={() => setModalShow(true)}>
						<div className="icon">
							<i className="fas fa-share-alt"></i>
						</div>
						{countShare}
					</button>
					<div className="h-line"></div>
					<button className="author__action--btn" onClick={() => setQrCodeModalShow(true)}>
						<div className="icon">
							<i className="fas fa-qrcode"></i>
						</div>
						QR Code
					</button>
				</div>
			</div>
			<div className="causes-details__donations">
				<h3 className="causes-details__donations-title">{t("general.TotalDonations")}: {record.length}</h3>
				<ul className="list-unstyled causes-details__donations-list">
					{record.map((item, index) => (
						<li key={index}>
							<div className="causes-details__donations-img">
								<Image src={item?.donor?.image ? `${api.RESOURCE}${item?.donor?.image}` : "/default_pfp.jpg"} alt="" />
							</div>
							<div className="causes-details__donations-content">
								<h4>${item?.amount?.toFixed(2)}</h4>
								<h5>
									{item?.donor?.name || "Anonymous"} <span>{item?.dayPass}</span>
								</h5>
								<p>{item?.note}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default CausesDetailsRight;
