import { useRootContext } from "@/context/context";
import { newsDetailsPage } from "@/data/newsDetails";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const { postList, tags, categories } = newsDetailsPage;

const Sidebar = ({ type = null, id = null }) => {
	const {lang} = useRootContext();
	const {t} = useTranslation();
	const [relatedNews, setRelatedNews] = useState([]);

	const handleSubmit = (e) => {
		e.placeholder();
		const formData = new FormData(e.target);
		console.log(formData.get("search"));
	};

	const fetchListRelated = async (t) => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/news/list-related?type=${t || "NEWS"}&id=${id}`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang
				},
			})
			.then((response) => {
				setRelatedNews(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	useEffect(() => {
		fetchListRelated(type);
	}, [type]);

	return (
		<div className="sidebar">
			{/* <div className="sidebar__single sidebar__search">
				<form onSubmit={handleSubmit} className="sidebar__search-form">
					<input name="search" type="search" placeholder="Search" />
					<button type="submit">
						<i className="icon-magnifying-glass"></i>
					</button>
				</form>
			</div> */}
			<div className="sidebar__single sidebar__post">
				<h3 className="sidebar__title">{t("general.RelatedPosts")}</h3>
				<ul className="sidebar__post-list list-unstyled">
					{relatedNews.map((el, index) => (
						<li key={index}>
							<div className="sidebar__post-image">
								<Image src={el?.image ? api.RESOURCE + el?.image : "/causes-one-img-1.jpg"} alt="" />
							</div>
							<div className="sidebar__post-content">
								<h3>
									<a href="#" className="sidebar__post-content_meta">
										<i className="far fa-clock"></i> {el?.createdAt}
									</a>
									<a href={el?.type === "NEWS" ? `/news/${el?.id}` : `/events/${el?.id}`} className="text-2-line-truncate">
										{el?.title}
									</a>
								</h3>
							</div>
						</li>
					))}
				</ul>
			</div>
			{/* <div className="sidebar__single sidebar__category">
				<h3 className="sidebar__title">Categories</h3>
				<ul className="sidebar__category-list list-unstyled">
					{categories.map((category, index) => (
						<li key={index}>
							<a href="#">
								<i className="fas fa-arrow-circle-right"></i>
								{category}
							</a>
						</li>
					))}
				</ul>
			</div> */}
			{/* <div className="sidebar__single sidebar__tags">
				<h3 className="sidebar__title">Popular Tags</h3>
				<div className="sidebar__tags-list">
					{tags.map((tag, index) => (
						<a key={index} href="#">
							{tag}
						</a>
					))}
				</div>
			</div> */}
		</div>
	);
};

export default Sidebar;
