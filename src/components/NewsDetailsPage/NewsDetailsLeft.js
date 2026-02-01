import { social } from "@/data/NavItems";
import React from "react";
import { Image } from "react-bootstrap";
import { api } from "src/config";
import { useTranslation } from "react-i18next";

const NewsDetailsLeft = ({ data = null }) => {
	const {t} = useTranslation();
	console.log(social);
	return (
		<div className="news-details__left">
			<div className="news-details__img">
				<Image src={data?.image ? api.RESOURCE + data?.image : "/causes-one-img-1.jpg"} alt="" />
			</div>
			<div className="news-details__content">
				<h3 className="news-details__title">{data?.title}</h3>
				<div className="news-details__text-one" dangerouslySetInnerHTML={{ __html: data?.content }}></div>
			</div>
			<div className="news-details__bottom">
				<p className="news-details__tags">
					<span>{t("general.Type")}: </span>
					<a href="#">{data?.type}</a>
				</p>
				<div className="news-details__social-list">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
							`https://cambodiaalumni.org/news/${data?.id}`
						)}`}
					>
						<i className="fab fa-facebook-f"></i>
					</a>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={`https://t.me/share/url?url=${encodeURIComponent(
							`https://cambodiaalumni.org/news/${data?.id}`
						)}&text=${encodeURIComponent(data?.title || "")}`}
					>
						<i className="fab fa-telegram"></i>
					</a>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
							`https://cambodiaalumni.org/news/${data?.id}`
						)}`}
					>
						<i className="fab fa-linkedin-in"></i>
					</a>
				</div>
			</div>
			{/* <div className="author-one">
				<div className="author-one__image">
					<Image src={authorImage} alt="" />
				</div>
				<div className="author-one__content">
					<h3>{name}</h3>
					<p>{description}</p>
				</div>
			</div>
			<div className="comment-one">
				<h3 className="comment-one__title">Comments</h3>
				{comments.map((comment) => (
					<SingleComment key={comment.id} comment={comment} />
				))}
			</div> */}
			{/* <CommentForm /> */}
		</div>
	);
};

export default NewsDetailsLeft;
