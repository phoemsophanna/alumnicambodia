import CausesPage from "@/components/CausesPage/CausesPage";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import React, { useEffect, useState } from "react";
import { Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import axios from "axios";
import { api } from "src/config";
import { useRootContext } from "@/context/context";
import { useTranslation } from "react-i18next";


const CampaignCategory = () => {
	const { t } = useTranslation();
	const { donationModal, selectCategoryId, lang } = useRootContext();
	const [isGrid, setIsGrid] = useState(false);
	const [showAllOrganization, setShowAllOrganization] = useState(true);
	const [openOrganizationDropdown, setOpenOrganizationDropdown] = useState(false);

	const [campaignList, setCampaignList] = useState([]);
	const [organizationList, setOrganizationList] = useState([]);
	const [locations, setLocations] = useState([]);
	const [isFetchingCampaign, setFetchingCampaign] = useState(false);
	const fetchCampaign = async () => {
		setFetchingCampaign(true);
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/project?category=${selectCategoryId}`,
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

	
	const handleSortBy = async (sort) => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/project?category=${selectCategoryId}&sortBy=${sort}`,
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
				url: `${api.BASE_URL}/web/campaign/project?category=${selectCategoryId}&organization=${orgId}`,
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
				url: `${api.BASE_URL}/web/campaign/project?category=${selectCategoryId}&location=${location}`,
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
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [donationModal, lang, selectCategoryId]);

	return (
		<Layout pageTitle={t("header.PROJECT")}>
			<PageHeader pageTitle={t("header.PROJECT")} type="CAMPAIGN_PAGE" />
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

export default CampaignCategory;
