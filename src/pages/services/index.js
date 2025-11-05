import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useRootContext } from "@/context/context";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const Services = () => {
	const {t} = useTranslation();
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false); // New state for loading
	const [stopFetching, setStopFetching] = useState(false);
	const { lang } = useRootContext();

	const loadMoreData = async () => {
		if (!stopFetching) {
			setIsLoading(true);
			const moreData = await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/services?limit=3&page=${page + 1}`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((res) => res.data)
			.catch((e) => {
				console.error(e);
			});
			
			setData((currentData) => [...currentData, ...moreData]);
			setPage((currentPage) => currentPage + 1);
			setStopFetching(moreData.length === 0);
			setIsLoading(false);
		}
	};

	const onScroll = useCallback(async () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 560 && !isLoading) {
			await loadMoreData();
		}
	}, [isLoading, page]); // Dependencies

	useEffect(() => {
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [onScroll]);

	useEffect(() => {
		loadMoreData();
	}, [lang]);

	return (
		<Layout pageTitle={t("header.SERVICE")}>
			<PageHeader pageTitle={t("header.SERVICE")} type="FEED_PAGE" />
			<section className="feed-container">
				<Container>
					<Row>
						{data.map((feed, index) =>
							<Col xl={6} lg={6}> 
								<div className="feed-list">
									<div className="feed-item" key={index}>
										<Link href={`/services/${feed?.id}`}>
											<div className="feed-info" style={{ cursor: "pointer" }}>
												<img
													src={
														feed?.image
															? `${api.RESOURCE}${feed?.image}`
															: "/causes-one-img-1.jpg"
													}
													alt=""
												/>
												<h2>{feed?.title}</h2>
											</div>
										</Link>
									</div>
								</div>
							</Col>
						)}
					</Row>
				</Container>
			</section>
		</Layout>
	);
};

export default Services;
