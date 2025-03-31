import { useRootContext } from "@/context/context";
import navItems, { social } from "@/data/NavItems";
import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";
import NavItem from "./NavItem";
import brandLogo from "../../assets/images/cda-logo.png";

const MobileMenu = () => {
	const { toggleMenu, menuStatus } = useRootContext();

	return (
		<div className={`mobile-nav__wrapper  animated fadeInLeft${menuStatus ? " expanded" : ""}`}>
			<div onClick={() => toggleMenu()} className="mobile-nav__overlay mobile-nav__toggler"></div>
			<div className="mobile-nav__content">
				<span onClick={() => toggleMenu()} className="mobile-nav__close mobile-nav__toggler">
					<i className="fa fa-times"></i>
				</span>

				<div className="logo-box">
					<Link href="/">
						<a aria-label="logo image">
							<Image src={brandLogo.src} alt="CDA Logo - Children Cambodia Association Logo" width="114" />
						</a>
					</Link>
				</div>
				<div className="mobile-nav__container">
					<ul className="main-menu__list">
						{navItems.map(({ id, ...item }) => (
							<NavItem key={id} item={item} />
						))}
					</ul>
				</div>

				<ul className="mobile-nav__contact list-unstyled">
					<li>
						<i className="fa fa-envelope"></i>
						<a href="mailto:info@cdafund.org">info@cdafund.org</a>
					</li>
					<li>
						<i className="fa fa-phone-alt"></i>
						<a href="tel:+855884886422">+855 88 488 6422</a>
					</li>
					<li>
						<i className="fa fa-phone-alt"></i>
						<a href="tel:+85512637686">+85512637686</a>
					</li>
				</ul>
				<div className="mobile-nav__top">
					<div className="mobile-nav__social">
						{social.map(({ icon, link }, index) => (
							<a key={index} href={link} className={`fab ${icon}`}></a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileMenu;
