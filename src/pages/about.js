import AboutPage from "@/components/AboutPage/AboutPage";
import BrandTwo from "@/components/BrandOne/BrandTwo";
import Counters from "@/components/Counters/Counters";
import JoinOne from "@/components/JoinOne/JoinOne";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import TeamOne from "@/components/TeamOne/TeamOne";
import TestimonialOne from "@/components/TestimonialOne/TestimonialOne";
import { useRootContext } from "@/context/context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const About = () => {
	const {lang} = useRootContext();
	const [about, setAbout] = useState(null);
	const [partners, setPartners] = useState([]);
	const {t} = useTranslation();
	const fetchAbout = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/about`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang
				},
			})
			.then((response) => {
				setAbout(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};
	const fetchPartners = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/home/partner`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang
				},
			})
			.then((response) => {
				setPartners(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	useEffect(() => {
		fetchAbout();
		fetchPartners();
		return () => setAbout([]);
	}, [lang]);

	return (
		<Layout pageTitle={t("header.ABOUT")}>
			<PageHeader pageTitle={t("header.ABOUT")} type="ABOUT_PAGE" />
			<AboutPage data={about} />
			<TestimonialOne className="about-page-testimonial" data={about} />
			<JoinOne className="join-one__about" data={about} />
			<Counters className="about-page-counter" data={about} />
			<TeamOne professionalVolunteer={about?.professionalVolunteer} />
			<BrandTwo partners={partners} />
		</Layout>
	);
};

export default About;
