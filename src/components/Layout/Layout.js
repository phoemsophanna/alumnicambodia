import Header from "@/components/Header/Header";
import Preloader from "@/components/Preloader";
import { useRootContext } from "@/context/context";
import useScroll from "@/hooks/useScroll";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import MobileMenu from "../MobileMenu/MobileMenu";
import Search from "../Search/Search";
import SiteFooter from "../SiteFooter/SiteFooter";
import DonationModal from "../Donation/DonationModal";
import LoginModal from "../Account/LoginModal";

const Layout = ({ children, pageTitle }) => {
	const [loading, setLoading] = useState(false);
	const { menuStatus } = useRootContext();
	const { scrollTop } = useScroll(70);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 600);
	}, []);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{pageTitle} | Children Development Association (CDA)</title>
			</Head>
			<Preloader loading={loading} />
			<main id="wrapper" style={{ opacity: loading ? 0 : 1 }} className="page-wrapper">
				<Header pageTitle={pageTitle} />
				{children}
				<SiteFooter />
			</main>
			{menuStatus && <MobileMenu />}
			<Search />
			<DonationModal />
			<LoginModal />
			{scrollTop && (
				<ScrollLink
					to="wrapper"
					smooth={true}
					duration={500}
					id="backToTop"
					style={{ cursor: "pointer" }}
					className="scroll-to-target scroll-to-top fadeIn animated"
				>
					<i className="fa fa-angle-up"></i>
				</ScrollLink>
			)}
		</>
	);
};

export default Layout;
