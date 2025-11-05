import Layout from "@/components/Layout/Layout";
import NewsPage from "@/components/NewsPage/NewsPage";
import PageHeader from "@/components/PageHeader/PageHeader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const Event = () => {
    const [record, setRecord] = useState([]);
	const {t} = useTranslation();
	const fetchNewsEvent = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/news?type=EVENT`,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				setRecord(response.data);
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
	}, []);

	return (
		<Layout pageTitle={t("general.Event")}>
			<PageHeader pageTitle={t("general.Event")} type="EVENT_PAGE" />
			<NewsPage data={record} />
		</Layout>
	);
};

export default Event;
