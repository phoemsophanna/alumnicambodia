import CausesDetailsPage from "@/components/ServiceDetails/CausesDetails";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useRootContext } from "@/context/context";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const ServiceDetail = (props) => {
	const {t} = useTranslation();
	const { donationModal, lang } = useRootContext();
	const [record, setRecord] = useState(null);
	const {query: { id }} = useRouter();

	const fetchCampaignDetail = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/services/${id}`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang
				},
			})
			.then(async (response) => {
				setRecord(response.data);
				window.scrollTo({ top: 0, behavior: "smooth" });
			})
			.catch((e) => {
				console.error(e);
				router.replace(`/services/${router.query.id}`);
			});
	};

	const resetDate = () => {
		setRecord(null);
	};

	useEffect(() => {
		fetchCampaignDetail();
		return () => {
			resetDate(null);
		};
	}, [donationModal]);

	useEffect(() => {
		if (lang) {
			fetchCampaignDetail();
		}
	}, [lang]);

	return (
		<Layout pageTitle={t("general.campaignDetail")}>
			{/* <NextSeo
				openGraph={{
					title: props?.project?.campaignTile,
					description: props?.project?.fullStory,
					url: `${api.WEBSITE}/projects/${props?.project?.id}`,
					type: "project",
					article: {
						publishedTime: props?.project?.created_at,
						section: "CDA Fund Project",
						authors: ["CDA FUND"],
						tags: ["raised fund", "donation", "children", "cambodia"],
					},
					images: [
						{
							url: props?.project?.campaignGallery?.length > 0 ? `${api.RESOURCE}${props?.project?.campaignGallery[0]}` : "/causes-one-img-1.jpg",
							width: 850,
							height: 650,
							alt: props?.project?.campaignTile
						},
					],
				}}
			/> */}
			<PageHeader pageTitle={t("general.serviceDetail")} type="CAMPAIGN_PAGE" />
			<CausesDetailsPage detail={record} />
		</Layout>
	);
};

export async function getStaticProps({ params }) {
	const res = await axios.get(`${api.BASE_URL}/web/campaign/project-meta/${params?.id}`);
	const response = res.data;
	return {
	  props: {
		project: response
	  },
	  // Next.js will attempt to re-generate the page:
	  // - When a request comes in
	  // - At most once every 10 seconds
	  revalidate: 10, // In seconds
	}
}
   
export async function getStaticPaths() {
	const res = await axios.request({
		method: "get",
		maxBodyLength: Infinity,
		url: `${api.BASE_URL}/web/campaign/project-id-paths`,
		headers: {
			"Content-Type": "application/json",
		}
	})
	const paths = res.data?.campaignList?.map((post) => ({
	  params: { id: post.id.toString() },
	}))
	return { paths, fallback: true }
}

export default ServiceDetail;
