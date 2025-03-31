import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const PageHeader = ({ pageTitle = "", type = "" }) => {
	const {t} = useTranslation();
	const [thumbnail, setThumbnail] = useState(null);
	const fetchThumbnail = async (pageType) => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/page-banner?type=${pageType}`,
				headers: {
					"Content-Type": "application/json"
				},
			})
			.then((response) => {
				setThumbnail(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	useEffect(() => {
		if(type) {
			fetchThumbnail(type);
		}
	}, [type]);

	return (
		<section className="page-header">
			<div
				className="page-header__bg"
				style={{ backgroundImage: `url('${api.RESOURCE + thumbnail}')` }}
			></div>
			<div className="container">
				<h2>{pageTitle}</h2>
				<ul className="thm-breadcrumb list-unstyled">
					<li>
						<Link href="/">{t("header.HOME")}</Link>
					</li>
					<li className="color-thm-gray">/</li>
					<li>
						<span>{pageTitle}</span>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default PageHeader;
