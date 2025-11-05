import { useRootContext } from "@/context/context";
import Link from "next/link";
import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReactVisibilitySensor from "react-visibility-sensor";
import { api } from "src/config";

const CausesSingle = ({ cause = null, causePage = null}) => {
	const {t} = useTranslation();
	const { toggleDonation } = useRootContext();
	const [countStart, setCountStart] = useState(false);

	const onVisibilityChange = (isVisible) => {
		if (isVisible) {
			setCountStart(true);
		}
	};

	// const { image, category, title, description, raised, goal } = cause;
	const raisedNumber = +cause?.totalRaised;
	const goalNumber = +cause?.goal;
	const percent = Math.round(((raisedNumber / goalNumber) * 100)*100) / 100;

	return (
		<div className={causePage ? "" : "my-4"}>
			<div style={causePage ? {} : { userSelect: "none" }} className="causes-one__single animated fadeInLeft">
				<div className="causes-one__img">
					<div className="causes-one__img-box">
						<Link href={`/projects/${cause?.id}`}>
							<Image src={cause?.campaignGallery?.length > 0 ? `${api.RESOURCE}${cause?.campaignGallery[0]}` : "causes-one-img-1.jpg"} alt="" style={{ cursor: "pointer" }} />
						</Link>
					</div> 
					{cause?.campaignCategory ? <div className="causes-one__category">
						<span>{cause?.campaignCategory?.name}</span>
					</div> : null}
				</div>
				<div className="causes-one__content">
					<h3 className="causes-one__title">
						<Link href={`/projects/${cause?.id}`}>{cause?.campaignTile}</Link>
					</h3>
					<span className="causes-one__date">{t("general.Posted")}:{" "}<strong>{cause?.createdAt}</strong>{" "}<span className="icon-access_alarms"></span>{" "}{cause?.daysLeft} {t("general.daysleft")}</span>
					<p className="causes-one__text">{cause?.involvement}</p>
				</div>
				<div className="causes__progress-contain">
					<div className="causes-one__progress">
						<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
							<div className="bar">
								<div
									className="bar-inner count-bar"
									data-percent={`${countStart ? (percent > 100 ? 100 : percent) : 0}%`}
									style={{ width: `${countStart ? (percent > 100 ? 100 : percent) : 0}%`, opacity: 1 }}
								>
									<div className="count-text" style={{ opacity: 1 }}>
										{countStart ? percent : 0}%
									</div>
								</div>
							</div>
						</ReactVisibilitySensor>
						<div className="causes-one__goals">
							<p>
								<span>${raisedNumber}</span> {t("general.Raised")}
							</p>
							<p>
								<span>${goalNumber}</span> {t("general.Goal")}
							</p>
						</div>
					</div>
				</div>
				<div className="causes-single-btn__contain">
					<button className="thm-btn" onClick={() => toggleDonation(true, cause?.id)}>
						<i className="fas fa-donate"></i> {t("general.DONATE")}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CausesSingle;
