import { useRootContext } from "@/context/context";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Col } from "react-bootstrap";
import { api } from "src/config";

const SingleBox = ({ singleBox }) => {
	const { onSelectCategory } = useRootContext();
	const { icon = null, iconImage = null, title, description, labelBtn, link, image, className, col = 4, color = "" } = singleBox;
	const router = useRouter();
	return (
		<Col xl={col}>
			<div className={`three-boxes__single ${className}`}>
				<div className="overlay-bg" style={{ backgroundColor: color }}></div>
				<div
					className="three-boxes__single-bg"
					style={{
						backgroundImage: `url(${
							image ? api.RESOURCE + image : "https://res.cloudinary.com/dufghzvge/image/upload/v1704273482/three-boxes-img-1.651d35b8_mqfsx8.jpg"
						})`,
					}}
				></div>
				<div className={`three-boxes__content ${col === 12 ? "container" : ""}`}>
					<div className="three-boxes__icon">
						{icon ? <span className={icon}></span> : null}
						{iconImage ? <img src={api.RESOURCE + iconImage} alt="" /> : null}
					</div>
					<div className="three-boxes__text-box">
						<h2>{title}</h2>
						<p className="three-boxes__text">{description}</p>
						<a
							href="#"
							className="three-boxes__btn"
							onClick={() => {
								onSelectCategory(link);
								router.push("/campaign-category");
							}}
						>
							<i className="fa fa-heart"></i>
							{labelBtn ? labelBtn : "DONATE"}{" "}
						</a>
					</div>
				</div>
			</div>
		</Col>
	);
};

export default SingleBox;
