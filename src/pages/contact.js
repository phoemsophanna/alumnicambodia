import BecomeVolunteer from "@/components/BecomeVolunteer/BecomeVolunteer";
import ContactPage from "@/components/ContactPage/ContactPage";
import GoogleMap from "@/components/GoogleMap/GoogleMap";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useRootContext } from "@/context/context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const Contact = () => {
	const {contact} = useRootContext();
	const {t} = useTranslation();

	return (
		<Layout pageTitle={t("general.ContactUs")}>
			<PageHeader pageTitle={t("general.ContactUs")} type="CONTACT_PAGE" />
			<ContactPage data={contact} />
			<GoogleMap data={contact} />
		</Layout>
	);
};

export default Contact;
