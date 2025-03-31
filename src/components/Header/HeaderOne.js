import { useRootContext } from "@/context/context";
import navItems, { social } from "@/data/NavItems";
import useScroll from "@/hooks/useScroll";
import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";
import NavItem from "./NavItem";
import EnglishFlag from "../../assets/images/eng-flag.png";
import KhmerFlag from "../../assets/images/khm-flag.png";
import brandLogo from "../../assets/images/cda-logo.png";

const HeaderOne = () => {
	const { toggleLogin, userProfile, onSelectLang, lang, toggleMenu, contact, toggleSearch } = useRootContext();
	const { scrollTop } = useScroll(130);

	return (
		<header className="main-header clearfix">
			<div className="main-header__logo">
				<Link href="/">
					<a>
						<Image src={brandLogo.src} alt="CDA Logo - Children Cambodia Association Logo" />
					</a>
				</Link>
			</div>
			<div className="main-menu-wrapper">
				<div className="main-menu-wrapper__top">
					<div className="main-menu-wrapper__top-inner">
						<div className="main-menu-wrapper__left">
							<div className="main-menu-wrapper__left-content">
								{contact?.phoneNumber1 ? (
									<div className="main-menu-wrapper__left-email-box" style={{ marginLeft: "0" }}>
										<div className="icon">
											<i className="fas fa-phone-alt"></i>
										</div>
										<div className="email">
											<a href={`tel:${contact?.phoneNumber1}`}>{contact?.phoneNumber1}</a>
										</div>
									</div>
								) : null}
								{contact?.phoneNumber2 ? (
									<div className="main-menu-wrapper__left-email-box">
										<div className="icon">
											<i className="fas fa-phone-alt"></i>
										</div>
										<div className="email">
											<a href={`tel:${contact?.phoneNumber2}`}>{contact?.phoneNumber2}</a>
										</div>
									</div>
								) : null}
								{contact?.email1 ? (
									<div className="main-menu-wrapper__left-email-box">
										<div className="icon">
											<i className="fas fa-envelope"></i>
										</div>
										<div className="email">
											<a href={`mailto:${contact?.email1}`}>{contact?.email1}</a>
										</div>
									</div>
								) : null}
							</div>
						</div>
						<div className="main-menu-wrapper__right">
							<div className="main-menu-wrapper__right-social">
								{social.map(({ icon, link }, index) => (
									<a
										href={
											link === "facebookLink"
												? contact?.facebookLink
												: link === "linkedinLink"
												? contact?.linkedinLink
												: link === "instagramLink"
												? contact?.instagramLink
												: link === "telegramLink"
												? contact?.telegramLink
												: null
										}
										key={index}
										target="_blank"
									>
										<i className={`fab ${icon}`}></i>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="main-menu-wrapper__bottom">
					<nav className={scrollTop ? "stricky-header stricked-menu main-menu stricky-fixed slideInDown animated" : "main-menu slideIn animated"}>
						<div className={scrollTop ? "sticky-header__content main-menu__inner" : "main-menu__inner"}>
							<div className="main-header__logo-mobile d-md-none d-block">
								<Link href="/">
									<a>
										<Image src={brandLogo.src} alt="CDA Logo - Children Cambodia Association Logo" />
									</a>
								</Link>
							</div>
							{scrollTop ? (
								<div className="main-header__logo-mobile d-block">
									<Link href="/">
										<a>
											<Image src={brandLogo.src} alt="CDA Logo - Children Cambodia Association Logo" />
										</a>
									</Link>
								</div>
							) : null}

							{scrollTop ? (
								<ul className="main-menu__list">
									{navItems.slice(1).map((navItem) => (
										<NavItem key={navItem.id} navItem={navItem} />
									))}
								</ul>
							) : (
								<ul className="main-menu__list">
									{navItems.slice(1).map((navItem) => (
										<NavItem key={navItem.id} navItem={navItem} />
									))}
								</ul>
							)}

							<div className="main-menu__right">
								<span style={{ cursor: "pointer" }} className="main-menu__search search-toggler icon-magnifying-glass" onClick={() => toggleSearch()}></span>

								{lang === "KHM" ? (
									<a href="#" className="main-menu__lang" onClick={() => onSelectLang("ENG")}>
										<Image src={EnglishFlag.src} alt="" />
									</a>
								) : (
									<a href="#" className="main-menu__lang" onClick={() => onSelectLang("KHM")}>
										<Image src={KhmerFlag.src} alt="" />
									</a>
								)}

								{/* <a href="#" className="main-menu__cart" onClick={() => toggleLogin()}>
									<i className="far fa-user"></i>
								</a> */}
								{!userProfile ? (
									<button className="main-menu__donate-btn" style={{ border: "none" }} onClick={() => toggleLogin()}>
										<i className="far fa-user"></i> Login
									</button>
								) : (
									<Link href="/dashboard">
										<a className="main-menu__donate-btn" style={{ border: "none" }}>
											<i className="far fa-user"></i> {userProfile?.firstName} {userProfile?.lastName}
										</a>
									</Link>
								)}

								<span onClick={() => toggleMenu()} className="mobile-nav__toggler">
									<i className="fa fa-bars"></i>
								</span>

								{/* <button className="main-menu__donate-btn" style={{ border: "none" }} onClick={() => toggleDonation()}>
									<i className="fa fa-heart"></i> Login
								</button> */}
							</div>
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default HeaderOne;
