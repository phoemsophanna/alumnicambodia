import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useRootContext } from "@/context/context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const TermsCondition = () => {
	const {t} = useTranslation();
	const {lang} = useRootContext();
	const [term, setTerm] = useState(null);
	const fetchTerm = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/term-condition`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang
				},
			})
			.then((response) => {
				setTerm(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	useEffect(() => {
		fetchTerm();
	}, [lang]);

	return (
		<Layout pageTitle={t("general.Term&Condition")}>
			<PageHeader pageTitle={t("general.Term&Condition")} type="TERM_CONDITION" />
			<div className="blog-section" style={{ marginTop: "5rem" }}>
				<div className="container">
					<div className="fs-16 fw-5 text-gray mb-4 pb-lg-2" dangerouslySetInnerHTML={{__html: term?.description}}></div>
				</div>
			</div>
		</Layout>
	);
};

export default TermsCondition;
