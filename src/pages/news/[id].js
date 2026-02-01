import Layout from "@/components/Layout/Layout";
import NewsDetailsPage from "@/components/NewsDetailsPage/NewsDetailsPage";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useRootContext } from "@/context/context";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const NewsDetails = ({ record, lang }) => {
//   const {query: { id }} = useRouter();
  const {t} = useTranslation();
//   const [record, setRecord] = useState(null);
//   const { lang } = useRootContext();

//   const fetchDetail = async (id) => {
// 		await axios
// 			.request({
// 				method: "get",
// 				maxBodyLength: Infinity,
// 				url: `${api.BASE_URL}/web/news/${id}`,
// 				headers: {
// 					"Content-Type": "application/json",
// 					"Accept-Language": lang,
// 				},
// 			})
// 			.then((response) => {
// 				setRecord(response.data);
// 			})
// 			.catch((e) => {
// 				console.error(e);
// 			})
// 			.finally(() => {
// 				// setLoading(false);
// 			});
// 	};

//   useEffect(() => {
//     fetchDetail(id);
//   }, [id])

	const pageTitle = record?.title || t("general.NewsDetails");
	const pageDescription = record?.summary || t("general.NewsSummary");
	const pageImage = record?.image ? `${api.RESOURCE}${record.image}` : "/default-image.png";
	const pageUrl = typeof process.env.NEXT_PUBLIC_BASE_URL !== "undefined" 
		? `${process.env.NEXT_PUBLIC_BASE_URL}/news/${record?.id}` 
		: "";

  return (
    <Layout pageTitle={t("general.NewsDetails")}>
		<Head>
			{/* Open Graph / Facebook */}
			<meta property="og:type" content="article" />
			<meta property="og:title" content={pageTitle} />
			<meta property="og:description" content={pageDescription} />
			<meta property="og:image" content={pageImage} />
			<meta property="og:url" content={pageUrl} />
			<meta property="og:site_name" content="YourSiteName" />

			{/* Twitter Card */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={pageTitle} />
			<meta name="twitter:description" content={pageDescription} />
			<meta name="twitter:image" content={pageImage} />
      	</Head>
      <PageHeader pageTitle={t("general.NewsDetails")}  type="NEWS_PAGE" />
      <NewsDetailsPage data={record} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const lang = context.locale || "en";

  let record = null;

  try {
    const res = await fetch(`${api.BASE_URL}/web/news/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
    });

    if (res.ok) {
      record = await res.json();
    }
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return {
    props: {
      record,
      lang,
    },
  };
}

export default NewsDetails;
