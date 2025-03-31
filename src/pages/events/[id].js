import Layout from "@/components/Layout/Layout";
import NewsDetailsPage from "@/components/NewsDetailsPage/NewsDetailsPage";
import PageHeader from "@/components/PageHeader/PageHeader";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const EventsDetails = () => {
	const {t} = useTranslation();
	const {
		query: { id },
	} = useRouter();
	const [record, setRecord] = useState(null);

	const fetchDetail = async (id) => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/news/${id}`,
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
		fetchDetail(id);
	}, [id]);
	return (
		<Layout pageTitle={t("general.EventDetails")}>
			<PageHeader pageTitle={t("general.EventDetails")} type="EVENT_PAGE" />
			<NewsDetailsPage data={record} />
		</Layout>
	);
};

export default EventsDetails;
