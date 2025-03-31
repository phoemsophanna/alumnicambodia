import { social } from "@/data/NavItems";
import React from "react";
import { Image } from "react-bootstrap";
import { api } from "src/config";
import { useTranslation } from "react-i18next";

const NewsDetailsLeft = ({ data = null }) => {
	const {t} = useTranslation();
	return (
		<div className="news-details__left">
			<div className="news-details__img">
				<Image src={data?.image ? api.RESOURCE + data?.image : "/causes-one-img-1.jpg"} alt="" />
			</div>
			<div className="news-details__content">
				{/* <ul className="list-unstyled news-details__meta">
					<li>
						<a href="#">
							<i className="far fa-user-circle"></i> by {admin}
						</a>
					</li>
					<li>
						<span>/</span>
					</li>
					<li>
						<a href="#">
							<i className="far fa-comments"></i> {totalComments} Comments
						</a>
					</li>
				</ul> */}
				<h3 className="news-details__title">{data?.title}</h3>
				<div className="news-details__text-one" dangerouslySetInnerHTML={{ __html: data?.content }}></div>
			</div>
			<div className="news-details__bottom">
				<p className="news-details__tags">
					<span>{t("general.Type")}: </span>
					<a href="#">{data?.type}</a>
				</p>
				<div className="news-details__social-list">
					{social.map(({ icon, href }, index) => (
						<a href={href} key={index}>
							<i className={`fab ${icon}`}></i>
						</a>
					))}
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
