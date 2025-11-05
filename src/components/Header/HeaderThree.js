import { useRootContext } from "@/context/context";
import navItems, { social } from "@/data/NavItems";
import useScroll from "@/hooks/useScroll";
import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";
import NavItem from "./NavItem";

const HeaderThree = () => {
	const { scrollTop } = useScroll(130);
	const { toggleMenu, toggleSearch } = useRootContext();

	return (
		<header className="main-header-three clearfix">
			<div className="main-header-three__menu-box clearfix">
				<nav
					className={
						scrollTop
							? "stricky-header stricked-menu main-menu main-menu-three stricky-fixed slideInDown animated clearfix"
							: "main-menu main-menu-three slideIn animated clearfix"
					}
				>
					<div className="main-menu-three__container clearfix">
						<div className="main-menu-three__logo">
							<Link href="/">
								<a>
									<Image src="https://res.cloudinary.com/dufghzvge/image/upload/v1704357971/logo-3.cc7cfb92_zb2htn.png" alt="" />
								</a>
							</Link>
						</div>
						<div className="main-menu-three__inner-upper clearfix">
							<div className="main-menu-three__btn">
								<Link href="/causes-details">
									<a className="main-menu-three__donate-btn">
										<i className="fa fa-heart"></i>DONATE
									</a>
								</Link>
							</div>
							<div className={scrollTop ? "sticky-header__content main-menu-three__inner clearfix" : "main-menu-three__inner clearfix"}>
								<span onClick={() => toggleMenu()} className="mobile-nav__toggler">
									<i className="fa fa-bars"></i>
								</span>
								<ul className="main-menu__list">
									{navItems.map((navItem) => (
										<NavItem key={navItem.id} navItem={navItem} />
									))}
								</ul>
							</div>
						</div>
						<div className="main-menu__right main-menu__right-three">
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
				</nav>
			</div>
		</header>
	);
};

export default HeaderThree;
