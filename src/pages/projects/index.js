import CausesPage from "@/components/CausesPage/CausesPage";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import React, { useEffect, useState } from "react";
import JarallaxImage from "../../components/Jarallax/JarallaxImage";
import dynamic from "next/dynamic";
import countersTwo from "@/data/countersTwo";
import { Col, Container, Dropdown, DropdownButton, Image, Row } from "react-bootstrap";
import axios from "axios";
import { api } from "src/config";
import { useRootContext } from "@/context/context";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const Jarallax = dynamic(() => import("../../components/Jarallax/Jarallax"), { ssr: false });

const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });

const settings = {
	lazyload: false,
	nav: false,
	loop: false,
	mouseDrag: true,
	items: 8,
	autoplay: false,
	autoHeight: true,
	controls: true,
	gutter: 5,
	controlsContainer: "#testimonial-one-carousel-nav",
	responsive: {
		1200: {
			items: 8,
			gutter: 30,
			controls: true,
		},
		768: {
			items: 4,
			gutter: 30,
			controls: true,
		},
		320: {
			items: 5,
			gutter: 5,
			controls: false,
		},
	},
};

const Projects = () => {
	const { t } = useTranslation();
	const { lang } = useRootContext();
	const { donationModal } = useRootContext();
	const [isGrid, setIsGrid] = useState(false);
	const [showAllOrganization, setShowAllOrganization] = useState(true);
	const [openOrganizationDropdown, setOpenOrganizationDropdown] = useState(false);

	const [campaignList, setCampaignList] = useState([]);
	const [campaignCategories, setCampaignCategories] = useState([]);
	const [organizationList, setOrganizationList] = useState([]);
	const [locations, setLocations] = useState([]);
	const [selectCategory, setSelectCategory] = useState([]);
	const [isFetchingCampaign, setFetchingCampaign] = useState(false);
	const fetchCampaign = async () => {
		setFetchingCampaign(true);
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/project`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((res) => {
				setCampaignList(res.data?.campaignList);
			})
			.catch((err) => {
				console.error("Error:", err);
			})
			.finally(() => {
				setFetchingCampaign(true);
			});
	};

	const fetchCampaignCategory = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/category-dropdown`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((res) => {
				setCampaignCategories(res.data?.categories);
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	};

	const fetchOrganizationList = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/dropdown`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((res) => {
				setOrganizationList(res.data?.organizations);
				setLocations(res.data?.location);
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	};

	const handleSelectCategory = async (id) => {
		const exitId = selectCategory.find((el) => el == id);
		if (exitId) {
			selectCategory = selectCategory.filter((el) => el != id);
		} else {
			selectCategory.push(id);
		}
		setSelectCategory(selectCategory);

		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/project?category=${selectCategory.join(",")}`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((res) => {
				setCampaignList(res.data?.campaignList);
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	};

	const handleSortBy = async (sort) => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/project?sortBy=${sort}`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((res) => {
				setCampaignList(res.data?.campaignList);
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	};

	const handleOrg = async (orgId) => {
		setOpenOrganizationDropdown(false);
		setShowAllOrganization(false);
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/project?organization=${orgId}`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((res) => {
				setCampaignList(res.data?.campaignList);
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	};

	const showAllCampaign = () => {
		setOpenOrganizationDropdown(false);
		setShowAllOrganization(true);
		fetchCampaign();
	};

	const handleSelectLocation = async (location) => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/project?location=${location}`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((res) => {
				setCampaignList(res.data?.campaignList);
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	};

	useEffect(() => {
		fetchOrganizationList();
	}, []);

	useEffect(() => {
		fetchCampaign();
		fetchCampaignCategory();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [donationModal, lang]);

	// useEffect(() => {
	// 	const categoryId = localStorage.getItem("homeCategoryId");
	// 	if (categoryId) {
	// 		console.log(categoryId);
	// 		setTimeout(() => handleSelectCategory(categoryId), 300);
	// 	}
	// }, []);

	return (
		<Layout pageTitle={t("header.CAMPAIGN")}>
			<PageHeader pageTitle={t("header.CAMPAIGN")} type="CAMPAIGN_PAGE" />
			<section className={`counters-two in-page-campaign slide-mode`}>
				<Jarallax className="counters-two-bg" speed={0.2} imgPosition="50% 0%">
					<JarallaxImage src="https://res.cloudinary.com/dufghzvge/image/upload/v1704273539/three-boxes-img-1.651d35b8_adwvoe.jpg" />
				</Jarallax>
				<Container>
					<Row>
						<Col xl={12} lg={12}>
							<div className="counters-two__right owl-theme owl-carouse">
								<ul className="counters-two__four-boxes list-unstyled">
									<TinySlider settings={settings}>
										{campaignCategories.map((category, index) => (
											<li
												key={index}
												onClick={() => {
													localStorage.removeItem("homeCategoryId");
													handleSelectCategory(category?.id);
												}}
											>
												<div
													className={
														selectCategory.includes(category?.id) ? "counters-two__four-boxes-icon active" : "counters-two__four-boxes-icon"
													}
													style={{ overflow: "hidden", height: "120px" }}
												>
													<img
														src={category?.image ? `${api.RESOURCE}${category?.image}` : "/causes-one-img-1.jpg"}
														style={{ width: "100%", height: "100%", objectFit: "cover" }}
													/>
												</div>
												<h4>
													{category?.name} ({category?.countProject})
												</h4>
											</li>
										))}
									</TinySlider>
								</ul>
								<div id="testimonial-one-carousel-nav" className="owl-nav">
									<button className="owl-prev me-2">
										<span className="icon-arrow_forward_ios left"></span>
									</button>
									<button className="owl-next">
										<span className="icon-arrow_forward_ios"></span>
									</button>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<section className="causes-one causes-page pb-0">
				<Container>
					<Row className="justify-content-between">
						<Col lg={4}>
							<div className="filter">
								<div className="cam-dropdown-image">
									<button
										type="button"
										className="btn organization-btn-dropdown"
										onClick={() => setOpenOrganizationDropdown(!openOrganizationDropdown)}
									>
										{t("general.Organization")} <i className="fas fa-caret-down"></i>
									</button>
									<div className={openOrganizationDropdown ? `cam-dropdown-wrapper open` : `cam-dropdown-wrapper`}>
										<div className="cam-dropdown-option">
											<button
												type="button"
												className={showAllOrganization ? `btn-select-all active` : `btn-select-all`}
												onClick={() => showAllCampaign()}
											>
												{t("general.All")} (12)
											</button>
											<button type="button" className="btn-change-list-type" onClick={() => setIsGrid(!isGrid)}>
												{isGrid ? <i className="fas fa-th"></i> : <i className="fas fa-list-ul"></i>}
											</button>
										</div>
										<div className={isGrid ? `cam-dropdown-list list-grid` : `cam-dropdown-list`}>
											{organizationList.map((org) => (
												<div className="cam-dropdown-item" key={org.id} onClick={() => handleOrg(org.id)}>
													<a className="organization-card">
														<img src={org?.image ? `${api.RESOURCE}${org?.image}` : "/causes-one-img-1.jpg"} alt="" />
														<p>{org?.name}</p>
													</a>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col lg={4}>
							<div className="filter filter-end">
								<DropdownButton id="dropdown-basic-button2" title={t("general.Location")} variant="light">
									{locations.map((location, index) => (
										<Dropdown.Item key={index} onClick={() => handleSelectLocation(location.city)}>
											{location.city}
										</Dropdown.Item>
									))}
								</DropdownButton>
								<DropdownButton id="dropdown-basic-button3" title={t("general.SortBy")} variant="light">
									<Dropdown.Item onClick={() => handleSortBy("trending")}>{t("general.Trending")}</Dropdown.Item>
									<Dropdown.Item onClick={() => handleSortBy("ending")}>{t("general.EndingSoon")}</Dropdown.Item>
								</DropdownButton>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<CausesPage campaignList={campaignList} />
		</Layout>
	);
};

export default Projects;
