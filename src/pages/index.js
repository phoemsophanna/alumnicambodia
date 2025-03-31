import React, { useEffect, useState } from "react";
import BrandOne from "@/components/BrandOne/BrandOne";
import CausesOne from "@/components/CausesOne/CausesOne";
import Charity from "@/components/Charity/Charity";
import JoinOne from "@/components/JoinOne/JoinOne";
import Layout from "@/components/Layout/Layout";
import MainSlider from "@/components/MainSlider/MainSlider";
import NewsOne from "@/components/NewsOne/NewsOne";
import TestimonialOne from "@/components/TestimonialOne/TestimonialOne";
import axios from "axios";
import { api } from "src/config";
import { useRootContext } from "@/context/context";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import SingleBox from "@/components/ThreeBoxes/SingleBox";

export async function getStaticProps() {
	const res = await fetch(`${api.BASE_URL}/web/home/slider`);
	const response = await res.json();
	const resCampaignHome = await fetch(`${api.BASE_URL}/web/campaign/home`);
	const responseCampaignHome = await resCampaignHome.json();

	return {
		props: {
			sliders: response,
			inNeedCampaign: responseCampaignHome?.inNeedCampaign,
			latestCampaign: responseCampaignHome?.latestCampaign,
		},
		revalidate: 10, // In seconds
	};
}

const Home = (props) => {
	const { donationModal, lang } = useRootContext();
	const [mainCampaign, setMainCampaign] = useState(null);
	const [campaignList, setCampaignList] = useState([]);
	const [categories, setCategories] = useState([]);
	const [homepage, setHomepage] = useState(null);
	const { t } = useTranslation();
	const fetchCampaign = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/home`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((res) => {
				setMainCampaign(res.data?.inNeedCampaign);
				setCampaignList(res.data?.latestCampaign);
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	};

	const fetchHomePage = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/home`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((response) => {
				setHomepage(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	const fetchHomeCategories = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/home/categories`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
				},
			})
			.then((response) => {
				setCategories(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	const resetHomePage = () => {
		setCampaignList([]);
		setCategories([]);
		setMainCampaign(null);
		setHomepage(null);
	};

	useEffect(() => {
		if (props) {
			setMainCampaign(props?.inNeedCampaign);
			setCampaignList(props?.latestCampaign);
		}
	}, [props]);

	useEffect(() => {
		fetchCampaign();
		fetchHomePage();
		fetchHomeCategories();
	}, [lang]);

	return (
		<Layout pageTitle={t("header.HOME")}>
			<MainSlider sliderList={props?.sliders || []} />
			<Charity campaign={mainCampaign} />
			<CausesOne campaigns={campaignList} latestProject={homepage?.latestProject} />
			<JoinOne data={homepage} />
			<section className="three-boxes">
				<div className="container-box">
					<Row>
						{categories.map((cat, index) => (
							<SingleBox
								key={index}
								singleBox={{
									iconImage: cat?.image,
									title: cat?.name,
									description: cat?.desc,
									labelBtn: "Donate",
									link: cat?.id,
									image: cat?.thumbnail,
									className: "",
									color: cat?.color
								}}
							/>
						))}
					</Row>
				</div>
			</section>
			<TestimonialOne className="home-page" data={homepage} />
			<NewsOne data={homepage} />
			<BrandOne />
		</Layout>
	);
};

export default Home;
