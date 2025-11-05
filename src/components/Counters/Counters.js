import counter from "@/data/counter";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import ReactVisibilitySensor from "react-visibility-sensor";

const Counters = ({ className = "", data = null }) => {
	const [countStart, setCountStart] = useState(false);
	const {t} = useTranslation();

	const onVisibilityChange = (isVisible) => {
		if (isVisible) {
			setCountStart(true);
		}
	};

	return (
		<section className={`counters-one ${className}`}>
			<Container>
				<ul className="counters-one__box list-unstyled">
					<li className="counter-one__single">
						<h3 className="odometer d-flex align-items-center justify-content-center">
							<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
								<CountUp start={0} end={countStart ? data?.totalDonation : 0} duration={2} />
							</ReactVisibilitySensor>
							{/* {data?.totalDonation && (
                  <span className="counter-one__letter">{letter}</span>
                )} */}
						</h3>

						<p className="counter-one__text">{t("general.TotalDonation")}</p>
					</li>
					<li className="counter-one__single">
						<h3 className="odometer d-flex align-items-center justify-content-center">
							<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
								<CountUp start={0} end={countStart ? data?.projectClosed : 0} duration={2} />
							</ReactVisibilitySensor>
							{/* {data?.totalDonation && (
                  <span className="counter-one__letter">{letter}</span>
                )} */}
						</h3>

						<p className="counter-one__text">{t("general.ProjectClosed")}</p>
					</li>
					
					<li className="counter-one__single">
						<h3 className="odometer d-flex align-items-center justify-content-center">
							<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
								<CountUp start={0} end={countStart ? data?.happyPeople : 0} duration={2} />
							</ReactVisibilitySensor>
							{/* {data?.totalDonation && (
                  <span className="counter-one__letter">{letter}</span>
                )} */}
						</h3>

						<p className="counter-one__text">{t("general.HappyPeople")}</p>
					</li>
          <li className="counter-one__single">
						<h3 className="odometer d-flex align-items-center justify-content-center">
							<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
								<CountUp start={0} end={countStart ? data?.ourVolunteer : 0} duration={2} />
							</ReactVisibilitySensor>
							{/* {data?.totalDonation && (
                  <span className="counter-one__letter">{letter}</span>
                )} */}
						</h3>

						<p className="counter-one__text">{t("general.OurVolunteers")}</p>
					</li>
				</ul>
			</Container>
		</section>
	);
};

export default Counters;
