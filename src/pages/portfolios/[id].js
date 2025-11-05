import EventsDetailsPage from "@/components/EventsDetailsPage/EventsDetailsPage";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useRootContext } from "@/context/context";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const PortfolioDetail = (props) => {
	const {t} = useTranslation();
	const { donationModal, lang } = useRootContext();
	const [record, setRecord] = useState(null);
	const {query: { id }} = useRouter();

	const fetchCampaignDetail = async () => {
		console.log(id);
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/portfolios/${id}`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang
				},
			})
			.then(async (response) => {
				setRecord(response.data);
				window.scrollTo({ top: 0, behavior: "smooth" });
			})
			.catch((e) => {
				console.error(e);
				router.replace(`/services/${router.query.id}`);
			});
	};

	// const resetDate = () => {
	// 	setRecord(null);
	// };

	// useEffect(() => {
	// 	fetchCampaignDetail();
	// 	return () => {
	// 		resetDate(null);
	// 	};
	// }, [donationModal]);

	useEffect(() => {
		if (lang) {
			fetchCampaignDetail();
		}
	}, [lang]);

	return (
		<Layout pageTitle={t("header.ProjectDetail")}>
			<PageHeader pageTitle={t("header.ProjectDetail")} type="PROJECT_PAGE" />
			<EventsDetailsPage detail={record} />
		</Layout>
	);
};

export default PortfolioDetail;
