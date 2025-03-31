import newsData from "@/data/NewsData";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import SingleNews from "./SingleNews";
import { api } from "src/config";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useRootContext } from "@/context/context";

const NewsOne = ({ data = null }) => {
	const [news, setNews] = useState(null);
	const [newsList, setNewsList] = useState([]);
	const {lang} = useRootContext();
	const {t} = useTranslation();

	const fetchNewsEvent = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/home/news-event`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang
				},
			})
			.then((response) => {
				setNews(response.data?.news);
				setNewsList(response.data?.newsList);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	useEffect(() => {
		fetchNewsEvent();
	}, [lang]);

	return (
		<section className="news-one">
			<Container>
				<Row>
					<Col xl={8} lg={8}>
						<div className="section-title text-left">
							<span className="section-title__tagline">{t("general.GetDailyUpdates")}</span>
							<h2 className="section-title__title">{data?.getDailyUpdate}</h2>
						</div>
					</Col>
					<Col xl={4} lg={4}>
						<div className="news-one__button-box">
							<Link href="/news">
								<a href="#" className="news-one__btn thm-btn">
									<i className="fas fa-arrow-circle-right"></i>{t("general.ViewMore")}
								</a>
							</Link>
						</div>
					</Col>
				</Row>
				<Row>
					<Col xl={6} lg={6}>
						<div className="news-one__left">
							<div className="news-one__img">
								<Image
									src={
										news?.image
											? api.RESOURCE + news?.image
											: "https://res.cloudinary.com/dufghzvge/image/upload/v1704270957/news-one-img-1.73796d67_cwctxo.jpg"
									}
									alt=""
								/>
								<Link href={news?.type === "NEWS" ? `/news/${news?.id}` : `/events/${news?.id}`}>
									<a>
										<i className="fa fa-plus"></i>
									</a>
								</Link>
							</div>
							<div className="news-one__bottom">
								<ul className="list-unstyled news-one__meta">
									<li>{news?.createdAt}</li>
									<li>
										<span>/</span>
									</li>
									{/* <li>
										<a href="#">0 Comments</a>
									</li> */}
								</ul>
								<h3 className="news-one__title">
									<Link href={news?.type === "NEWS" ? `/news/${news?.id}` : `/events/${news?.id}`}>
										<a>{news?.title}</a>
									</Link>
								</h3>
							</div>
						</div>
					</Col>
					<Col xl={6} lg={6}>
						<div className="news-one__right">
							{newsList.map((item, index) => (
								<SingleNews key={index} news={item} />
							))}
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default NewsOne;
