import MembersPage from "@/components/MemberPage/MembersPage";
import EventsPage from "@/components/EventsPage/EventsPage";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import React from "react";
import { useTranslation } from "react-i18next";

const Donors = () => {
	const {t} = useTranslation();
	return (
		<Layout pageTitle={t("general.MembersList")}>
			<PageHeader pageTitle={t("general.MembersList")} type="MEMBER_PAGE" />
			{/* <EventsPage /> */}
			<MembersPage />
		</Layout>
	);
};

export default Donors;
