import CountersTwo from "@/components/CountersTwo/CountersTwo";
import HowItWork from "@/components/HowItWork/HowItWork";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import React from "react";
import { useTranslation } from "react-i18next";

const RaiseFund = () => {
	const {t} = useTranslation();
	return (
		<Layout pageTitle={t("header.RAISE_FUND")}>
			<PageHeader pageTitle={t("header.RAISE_FUND")} type="RAISE_FUND_PAGE" />
			<CountersTwo extraclassName="in-page-campaign" />
			<HowItWork />
		</Layout>
	);
};

export default RaiseFund;
