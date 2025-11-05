import Layout from "@/components/Layout/Layout";
import NewsPage from "@/components/NewsPage/NewsPage";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useRootContext } from "@/context/context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const News = () => {
	const {t} = useTranslation();
	const [record, setRecord] = useState([]);
	const { lang } = useRootContext();

	const fetchNewsEvent = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/news?type=NEWS`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
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
		<Layout pageTitle={t("general.News")}>
			<PageHeader pageTitle={t("general.News")} type="NEWS_PAGE" />
			<NewsPage data={record} />
		</Layout>
	);
};

export default News;
