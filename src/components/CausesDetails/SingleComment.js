import React from "react";
import { Image } from "react-bootstrap";
import { api } from "src/config";

const SingleComment = ({ comment = {} }) => {
	const { image, message, sender, time } = comment;

	return (
		<div className="comment-one__single">
			<div className="comment-one__image">
				<Image src={api.RESOURCE + image} alt="" />
			</div>
			<div className="comment-one__content">
				<h3>
					{sender} <span>{time}</span>
				</h3>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default SingleComment;
