import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useRootContext } from "@/context/context";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const Feed = () => {
	const {t} = useTranslation();
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false); // New state for loading
	const [stopFetching, setStopFetching] = useState(false);

	const loadMoreData = async () => {
		if (!stopFetching) {
			setIsLoading(true);
			const moreData = await fetch(`${api.BASE_URL}/web/feed-list?limit=3&page=${page + 1}`).then((res) => res.json());
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

	const [donorList, setDonorList] = useState([]);
	const [donorListPage, setDonorListPage] = useState(1);
	const [isDonorListLoading, setDonorListLoading] = useState(false);
	const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true);
	const fetchDonorList = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/donation/list-all-donations?limit=6`,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				setDonorList(response.data);
			})
			.catch((e) => {
				console.error(e);
			});
	};

	const onLoanMoreDonorList = async () => {
		setDonorListLoading(true);
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/donation/list-all-donations?limit=6&page=${donorListPage + 1}`,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				setDonorList((current) => [...current, ...response.data]);
				setDonorListPage((currentPage) => currentPage + 1);
				setShowLoadMoreBtn(response.data.length > 0);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				setDonorListLoading(false);
			});
	};

	useEffect(() => {
		fetchDonorList();
		loadMoreData();
	}, []);

	return (
		<Layout pageTitle={t("header.FEED")}>
			<PageHeader pageTitle={t("header.FEED")} type="FEED_PAGE" />
			<section className="feed-container">
				<Container>
					<Row>
						<Col xl={8} lg={7}>
							<div className="feed-list">
								{data.map((feed, index) =>
									feed?.feedType == "DONATION" ? (
										<div className="feed-item" key={index}>
											<div className="feed-creator">
												<img src={feed?.creator?.image ? `${api.RESOURCE}${feed?.creator?.image}` : "/default_pfp.jpg"} alt="" />
												<div className="feed-creator__info">
													<h3>
														{feed?.creator?.name} <span className="feed-donation">{t("general.donated")} ${feed?.donation?.amount} {t("general.to")}</span>
													</h3>
												</div>
											</div>
											<Link href={`/projects/${feed?.campaign?.id}`}>
												<div className="feed-info" style={{ cursor: "pointer" }}>
													<img
														src={
															feed?.campaign?.campaignGallery?.length > 0
																? `${api.RESOURCE}${feed?.campaign?.campaignGallery[0]}`
																: "/causes-one-img-1.jpg"
														}
														alt=""
													/>
													<h2>{feed?.campaign?.campaignTile}</h2>
													<div className="feed-info__bottom">
														<span className="feed-info__date">
															<span className="icon-access_alarms"></span> {t("general.Published")}: {feed?.publishedAt}
														</span>
														<span className="feed-info__category">
															{feed?.campaign?.campaignCategory?.name} <i className="fas fa-grip-horizontal"></i>
														</span>
													</div>
												</div>
											</Link>
										</div>
									) : (
										<div className="feed-item">
											<div className="feed-creator">
												<img src={feed?.creator?.image ? `${api.RESOURCE}${feed?.creator?.image}` : "/default_pfp.jpg"} alt="" />
												<div className="feed-creator__info">
													<h3>
														{feed?.creator?.name} <span className="feed-posting">{t("general.post")}</span>{" "}
														<span className="feed-posting__title">{feed?.campaign?.campaignTile}</span>
													</h3>
													<p>
														{t("general.wasapprovedandwillstartfrom")} {feed?.campaign?.startAt} {t("general.until")} {feed?.campaign?.endAt}
													</p>
												</div>
											</div>
											<Link href={`/projects/${feed?.campaign?.id}`}>
												<div className="feed-info" style={{ cursor: "pointer" }}>
													<img
														src={
															feed?.campaign?.campaignGallery?.length > 0
																? `${api.RESOURCE}${feed?.campaign?.campaignGallery[0]}`
																: "/causes-one-img-1.jpg"
														}
														alt=""
													/>
													<h2>{feed?.campaign?.campaignTile}</h2>
													<div className="feed-info__bottom">
														<span className="feed-info__date">
															<span className="icon-access_alarms"></span> {t("general.Published")}: {feed?.publishedAt}
														</span>
														<span className="feed-info__category">
															{feed?.campaign?.campaignCategory?.name} <i className="fas fa-grip-horizontal"></i>
														</span>
													</div>
												</div>
											</Link>
										</div>
									)
								)}
							</div>
							{isLoading && <p className="text-center">Loading more images...</p>}
						</Col>
						<Col xl={4} lg={5}>
							<div className="causes-details__right">
								<div className="causes-details__donations">
									<h3 className="causes-details__donations-title">{t("general.RecentDonations")}</h3>
									<ul className="list-unstyled causes-details__donations-list">
										{donorList.map((item, index) => (
											<li key={index}>
												<div className="causes-details__donations-img">
													<Image src={item?.donor?.image ? `${api.RESOURCE}${item?.donor?.image}` : "/default_pfp.jpg"} alt="" />
												</div>
												<div className="causes-details__donations-content">
													<h4>${item?.amount?.toFixed(2)}</h4>
													<h5>
														{item?.donor?.name || "Anonymous"} <span>{item?.dayPass}</span>
													</h5>
													<p>{item?.note}</p>
												</div>
											</li>
										))}
									</ul>
									{showLoadMoreBtn ? (
										isDonorListLoading ? (
											<p className="text-center">Loading...</p>
										) : (
											<Button
												variant="outline-secondary"
												size="sm"
												style={{ borderRadius: "20px", width: "100%" }}
												onClick={() => onLoanMoreDonorList()}
											>
												Load More
											</Button>
										)
									) : null}
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</Layout>
	);
};

export default Feed;
