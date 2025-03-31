import { useRootContext } from "@/context/context";
import navItems, { social } from "@/data/NavItems";
import useScroll from "@/hooks/useScroll";
import Link from "next/link";
import React from "react";
import { Container, Image } from "react-bootstrap";
import NavItem from "./NavItem";

const HeaderTwo = () => {
	const { scrollTop } = useScroll(130);
	const { toggleMenu, toggleSearch } = useRootContext();

	return (
		<header className="main-header-two clearfix">
			<div className="main-header-two__inner">
				<Container>
					<div className="main-header-two__top clearfix">
						<div className="main-header-two__logo">
							<Link href="/">
								<a>
									<Image src="https://res.cloudinary.com/dufghzvge/image/upload/v1704357972/logo-2.4765251b_rap1wh.png" alt="" />
								</a>
							</Link>
						</div>
						<div className="main-header-two__contact-info">
							<ul className="main-header-two__contact-list list-unstyled">
								<li>
									<div className="main-header-two__contact-icon">
										<span className="icon-chat"></span>
									</div>
									<div className="main-header-two__contact-text">
										<p>Call Anytime</p>
										<a href="tel:92 666 888 0000">92 666 888 0000</a>
									</div>
								</li>
								<li>
									<div className="main-header-two__contact-icon">
										<span className="icon-message"></span>
									</div>
									<div className="main-header-two__contact-text">
										<p>Send Email</p>
										<a href="mailto:needhelp@company.com">needhelp@company.com</a>
									</div>
								</li>
								<li>
									<div className="main-header-two__contact-icon">
										<span className="icon-address"></span>
									</div>
									<div className="main-header-two__contact-text">
										<p>Visit Office</p>
										<h5>80 broklyn golden street</h5>
									</div>
								</li>
							</ul>
							<div className="main-header-two__btn">
								<Link href="/causes-details">
									<a className="main-header-two__donate-btn">
										<i className="fa fa-heart"></i>DONATE{" "}
									</a>
								</Link>
							</div>
						</div>
					</div>
				</Container>
			</div>
			<div className="main-header-two__bottom">
				<nav
					className={
						scrollTop
							? "stricky-header stricked-menu main-menu main-menu__two stricky-fixed slideInDown animated"
							: "main-menu main-menu__two slideIn animated"
					}
				>
					<Container>
						<div className={scrollTop ? "sticky-header__content main-menu__inner clearfix" : "main-menu__inner clearfix"}>
							<span onClick={() => toggleMenu()} className="mobile-nav__toggler">
								<i className="fa fa-bars"></i>
							</span>
							<ul className="main-menu__list">
								{navItems.map((navItem) => (
									<NavItem key={navItem.id} navItem={navItem} />
								))}
							</ul>
							<div className="main-menu__right">
								<div className="main-menu__right-social">
									{social.map(({ icon, link }, index) => (
										<a href={link} key={index}>
											<i className={`fab ${icon}`}></i>
										</a>
									))}
								</div>
								<span onClick={toggleSearch} style={{ cursor: "pointer" }} className="main-menu__search search-toggler icon-magnifying-glass"></span>
								<a href="#" className="main-menu__cart icon-shopping-cart  "></a>
							</div>
						</div>
					</Container>
				</nav>
			</div>
		</header>
	);
};

export default HeaderTwo;
