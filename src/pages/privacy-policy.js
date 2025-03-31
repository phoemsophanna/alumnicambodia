import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useRootContext } from "@/context/context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const PrivacyPolicy = () => {
	const {t} = useTranslation();
	const {lang} = useRootContext();
	const [pp, setPP] = useState(null);
	const fetchPP = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/privacy-policy`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang
				},
			})
			.then((response) => {
				setPP(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	useEffect(() => {
		fetchPP();
	}, [lang]);
	return (
		<Layout pageTitle={t("general.PrivacyPolicy")}>
			<PageHeader pageTitle={t("general.PrivacyPolicy")} type="PRIVACY_POLICY" />
			<div className="blog-section" style={{marginTop: "5rem"}}>
				<div className="container">
					<div className="fs-16 fw-5 text-gray mb-4 pb-lg-2" dangerouslySetInnerHTML={{__html: pp?.description}}></div>
				</div>
			</div>
		</Layout>
	);
};

export default PrivacyPolicy;
