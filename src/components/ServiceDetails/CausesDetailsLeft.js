import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Placeholder, Row, Spinner } from "react-bootstrap";
import { useRootContext } from "@/context/context";
import { api } from "src/config";
import Countdown from "react-countdown";
import ModalVideo from "react-modal-video";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Cookies from "js-cookie";

const CausesDetailsLeft = ({ campaign = null }) => {

	return (
		<div className="causes-details__left-bar" style={{ fontWeight: "500" }}>
			<div className="causes-details__img">
				<div className="causes-details__img-box">
					<Image src={campaign?.image ? `${api.RESOURCE}${campaign?.image}` : "/causes-one-img-1.jpg"} alt="" />
				</div>
			</div>
			<div className="causes-details__text-box">
				{campaign ? (
					<h3>{campaign?.title}</h3>
				) : (
					<Placeholder as="h3" animation="glow">
						<Placeholder xs={5} />
					</Placeholder>
				)}
				<div className="causes-details__text-box--detail" dangerouslySetInnerHTML={{ __html: campaign?.des }}></div>
			</div>
		</div>
	);
};

export default CausesDetailsLeft;
