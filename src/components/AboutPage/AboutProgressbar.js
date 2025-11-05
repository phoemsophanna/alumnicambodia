import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AboutProgressbar = ({ progress = {} }) => {
	const { percentage, title } = progress;

	return (
		<div className="about-five__progress">
			<div className="about-five__progress-box">
				<div style={{ width: 138, height: 138 }}>
					<CircularProgressbar
						strokeWidth={2.2}
						value={percentage}
						text={`${percentage}%`}
						styles={{
							path: {
								stroke: "#04735b",
								strokeLinecap: "butt",
							},
							text: {
								fill: "black",
								fontWeight: 900,
								fontSize: 16,
							},
							trail: {
								stroke: "#e5eeec",
							},
						}}
					/>
				</div>
			</div>
			<div className="about-five__progress-content">
				<h3>{title}</h3>
			</div>
		</div>
	);
};

export default AboutProgressbar;
