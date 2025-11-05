import Layout from "@/components/Layout/Layout";
import EventsPage from "@/components/EventsPage/EventsPage";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useRootContext } from "@/context/context";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const Portfolios = () => {
	const {t} = useTranslation();
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false); // New state for loading
	const [stopFetching, setStopFetching] = useState(false);
	const { lang } = useRootContext();

	const loadMoreData = async () => {
		setIsLoading(true);
		await axios
		.request({
			method: "get",
			maxBodyLength: Infinity,
			url: `${api.BASE_URL}/web/portfolios`,
			headers: {
				"Content-Type": "application/json",
				"Accept-Language": lang,
			},
		})
		.then((res) => {
			setData(res.data);
		})
		.catch((e) => {
			console.error(e);
		});
		setIsLoading(false);
	};

	useEffect(() => {
		loadMoreData();
	}, [lang]);

	return (
		<Layout pageTitle={t("header.Projects")}>
			<PageHeader pageTitle={t("header.Projects")} type="PROJECT_PAGE" />
      		<EventsPage moreData={data} />
		</Layout>
	);
};

export default Portfolios;
