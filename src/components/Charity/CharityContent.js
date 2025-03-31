import { useRootContext } from "@/context/context";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReactVisibilitySensor from "react-visibility-sensor";

const CharityContent = ({ campaignInfo = null }) => {
	const {t} = useTranslation();
	const [percent, setPercent] = useState(0);
	const { toggleDonation } = useRootContext();
	const [countStart, setCountStart] = useState(false);

	const onVisibilityChange = (isVisible) => {
		if (isVisible) {
			setCountStart(true);
		}
	};

	useEffect(() => {
		if (campaignInfo) {
			setPercent((campaignInfo?.totalRaised / campaignInfo?.goal) * 100);
		}
	}, [campaignInfo]);

	return (
		<Col xl={6} lg={6}>
			<div className="welcome-one__right">
				<div className="section-title text-left">
					<span className="section-title__tagline">{t("main.sectionTitleTagline1")}</span>
					<h2 className="section-title__title">{campaignInfo?.campaignTile}</h2>
				</div>
				<p className="welcome-one__right-text">{campaignInfo?.involvement}</p>
				<div className="welcome-one__progress">
					<div className="welcome-one__progress-single">
						<h4 className="welcome-one__progress-title mb-5">{t("general.Donation")}</h4>
						<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
							<div className="bar">
								<div
									className="bar-inner count-bar"
									data-percent={`${countStart ? Math.round(percent) : 0}%`}
									style={{
										width: `${countStart ? Math.round(percent) : 0}%`,
										opacity: 1,
									}}
								>
									<div className="count-text" style={{ opacity: countStart ? 1 : 0 }}>
										{countStart ? Math.round(percent) : 0}%
									</div>
								</div>
							</div>
						</ReactVisibilitySensor>
						<div className="causes-one__goals">
							<p>
								<span>${campaignInfo?.totalRaised?.toFixed(2)}</span> {t("general.Raised")}
							</p>
							<p>
								<span>${campaignInfo?.goal?.toFixed(2)}</span> {t("general.Goal")}
							</p>
						</div>
					</div>
				</div>
				<button className="welcome-one__btn thm-btn" onClick={() => toggleDonation(true, campaignInfo?.id)}>
					<i className="fa fa-heart"></i>{t("general.DONATENOW")}
				</button>
			</div>
		</Col>
	);
};

export default CharityContent;
