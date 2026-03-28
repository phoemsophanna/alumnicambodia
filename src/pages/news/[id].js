import Layout from "@/components/Layout/Layout";
import NewsDetailsPage from "@/components/NewsDetailsPage/NewsDetailsPage";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useRootContext } from "@/context/context";
import axios from "axios";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const NewsDetails = () => {
  const {query: { id }} = useRouter();
  const {t} = useTranslation();
  const [record, setRecord] = useState(null);
  const { lang } = useRootContext();

  const fetchDetail = async (id) => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/news/${id}`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang,
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
  }, [id, lang])

	const pageTitle = record?.title || t("general.NewsDetails");
	const pageDescription = record?.summary || t("general.NewsSummary");
	const pageImage = record?.image ? `${api.RESOURCE}${record.image}` : "/default-image.png";
	const pageUrl = typeof process.env.NEXT_PUBLIC_BASE_URL !== "undefined" 
		? `${process.env.NEXT_PUBLIC_BASE_URL}/news/${record?.id}` 
		: "";

  return (
    <Layout pageTitle={t("general.NewsDetails")}>
      <NextSeo
          openGraph={{
            title: pageTitle,
            description: pageDescription,
            url: `${api.WEBSITE}/news/${record?.id}`,
            type: "article",
            article: {
              publishedTime: record?.created_at,
              section: "Cambodia Alumni Project",
              authors: ["Cambodia Alumni"],
              tags: ["raised fund", "donation", "children", "cambodia"],
            },
            images: [
              {
                url: pageImage,
                width: 850,
                height: 650,
                alt: pageTitle
              },
            ],
          }}
        />
      <PageHeader pageTitle={t("general.NewsDetails")}  type="NEWS_PAGE" />
      <NewsDetailsPage data={record} />
    </Layout>
  );
};

// export async function getServerSideProps(context) {
//   const { id } = context.query;
//   const lang = context.locale || "en";

//   let record = null;

//   try {
//     const res = await fetch(`${api.BASE_URL}/web/news/${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         "Accept-Language": lang,
//       },
//     });

//     if (res.ok) {
//       record = await res.json();
//     }
//   } catch (error) {
//     console.error("Error fetching news:", error);
//   }

//   return {
//     props: {
//       record,
//       lang,
//     },
//   };
// }

export default NewsDetails;
