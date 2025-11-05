import DonorsPage from "@/components/DonorPage/DonorsPage";
import EventsPage from "@/components/EventsPage/EventsPage";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import React from "react";
import { useTranslation } from "react-i18next";

const Donors = () => {
	const {t} = useTranslation();
	return (
		<Layout pageTitle={t("general.DonorsList")}>
			<PageHeader pageTitle={t("general.DonorsList")} type="DONORS_PAGE" />
			{/* <EventsPage /> */}
			<DonorsPage />
		</Layout>
	);
};

export default Donors;
