import { useRootContext } from "@/context/context";
import navItems, { social } from "@/data/NavItems";
import useScroll from "@/hooks/useScroll";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import NavItem from "./NavItem";
import EnglishFlag from "../../assets/images/eng-flag.png";
import KhmerFlag from "../../assets/images/khm-flag.png";
import ChinaFlag from "../../assets/images/ch.png";
import brandLogo from "../../assets/images/LOGO-CAA New.png";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { api } from "src/config";

const HeaderOne = () => {
	const { toggleLogin, userProfile, toggleDonation, onSelectLang, lang, toggleMenu, contact, toggleSearch } = useRootContext();
	const { scrollTop } = useScroll(130);
	const [mainCampaign, setMainCampaign] = useState(null);
	const [dropdown, setDropdown] = useState(false);
	const {t} = useTranslation();

	function dropdownMenu(){
		setDropdown(!dropdown);		
	}

	const fetchMainCampaignPage = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/getMainCampaign`,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				setMainCampaign(response.data.item);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	useEffect(()=>{
		if(mainCampaign == null){
			fetchMainCampaignPage();
		}

		const handleClick = (e) => {
			if(e.target.offsetParent){
				if(e.target.offsetParent.className != "dropdown"){
					setDropdown(false);	
				}
			}
		};
		window.addEventListener("click", handleClick);
	},[]);

	return (
		<header className="main-header clearfix">
			{/* <div className="main-header__logo">
				<Link href="/">
					<a>
						<Image src={brandLogo.src} alt="Alumni Logo" />
					</a>
				</Link>
			</div> */}
			<div className="main-menu-wrapper">
				<div className="main-menu-wrapper__top">
					<div className="main-menu-wrapper__top-inner">
						<div className="main-menu-wrapper__left">
							<div className="main-menu-wrapper__left-content">
								{/* {contact?.phoneNumber1 ? (
									<div className="main-menu-wrapper__left-email-box" style={{ marginLeft: "0" }}>
										<div className="icon">
											<i className="fas fa-phone-alt"></i>
										</div>
										<div className="email">
											<a href={`tel:${contact?.phoneNumber1}`}>{contact?.phoneNumber1}</a>
										</div>
									</div>
								) : null} */}

								<div className="main-menu-wrapper__left-email-box" style={{ marginLeft: "0" }}>
									<div className="email">
										<a href={`#`}>Cambodia Alumni Association</a>
									</div>
								</div>

								{/* <span style={{ cursor: "pointer" }} className="main-menu__search search-toggler icon-magnifying-glass" onClick={() => toggleSearch()}></span>

								{lang === "KHM" ? (
									<a href="#" className="main-menu__lang" onClick={() => onSelectLang("ENG")}>
										<Image src={EnglishFlag.src} alt="" />
									</a>
								) : (
									<a href="#" className="main-menu__lang" onClick={() => onSelectLang("KHM")}>
										<Image src={KhmerFlag.src} alt="" />
									</a>
								)} */}
								{/* {contact?.phoneNumber2 ? (
									<div className="main-menu-wrapper__left-email-box">
										<div className="icon">
											<i className="fas fa-phone-alt"></i>
										</div>
										<div className="email">
											<a href={`tel:${contact?.phoneNumber2}`}>{contact?.phoneNumber2}</a>
										</div>
									</div>
								) : null}*/}
								{/* {contact?.email1 ? (
									<div className="main-menu-wrapper__left-email-box">
										<div className="icon">
											<i className="fas fa-envelope"></i>
										</div>
										<div className="email">
											<a href={`mailto:${contact?.email1}`}>{contact?.email1}</a>
										</div>
									</div>
								) : null} */}
							</div>
						</div>
						<div className="main-menu-wrapper__right">
							<div className="main-menu-wrapper__right-social">
								<span style={{ cursor: "pointer" }} className="main-menu__search search-toggler icon-magnifying-glass" onClick={() => toggleSearch()}></span>
								{/* {lang === "KHM" ? (
									<a href="#" className="main-menu__lang" onClick={() => onSelectLang("ENG")}>
										<Image src={EnglishFlag.src} alt="" />
									</a>
								) : (
									<a href="#" className="main-menu__lang" onClick={() => onSelectLang("KHM")}>
										<Image src={KhmerFlag.src} alt="" />
									</a>
								)} */}
								<div class="dropdown">
									<button class="btn btn-secondary dropdown-toggle d-flex align-items-center" onClick={() => dropdownMenu()} style={{marginRight: "10px", padding: "5px",border: "none",background: "transparent"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
										<Image src={lang === "KHM" ? (lang === "CH" ? ChinaFlag.src : KhmerFlag.src) : (lang === "CH" ? ChinaFlag.src : EnglishFlag.src)} alt="" style={{width: "25px",height: "25px"}} />
									</button>
									<ul class={`dropdown-menu ${dropdown ? 'show' : ''}`} style={{padding: ".5rem",minWidth: "auto",width: "100px"}}>
										<li style={{marginBottom: "10px"}}>
											<a style={{display: "flex",width: "100%",alignItems: "center",gap: "5px",justifyContent: "start",paddingLeft: "0"}} class="dropdown-item d-flex align-items-center" href="#" onClick={() => onSelectLang("KHM")}>
												<div>
													<Image src={KhmerFlag.src} alt="" style={{width: "25px",height: "25px"}} />
												</div>
												<div style={{color: "#292d96",fontWeight: "700"}}>
													{t('general.khmer')}
												</div>
											</a>
										</li>
										<li style={{marginBottom: "10px"}}>
											<a style={{display: "flex",width: "100%",alignItems: "center",gap: "5px",justifyContent: "start",paddingLeft: "0"}} class="dropdown-item d-flex align-items-center" href="#" onClick={() => onSelectLang("ENG")}>
												<div className="image">
													<Image src={EnglishFlag.src} alt="" style={{width: "25px",height: "25px"}} />
												</div>
												<div style={{color: "#292d96",fontWeight: "700"}}>
													{t('general.english')}
												</div>
											</a>
										</li>
										<li>
											<a style={{display: "flex",width: "100%",alignItems: "center",gap: "5px",justifyContent: "start",paddingLeft: "0"}} class="dropdown-item d-flex align-items-center" href="#" onClick={() => onSelectLang("CH")}>
												<div>
													<Image src={ChinaFlag.src} alt="" style={{width: "25px",height: "25px"}} />
												</div>
												<div style={{color: "#292d96",fontWeight: "700"}}>
													{t('general.chinese')}
												</div>
											</a>
										</li>
									</ul>
								</div>
								<span className="split_search">|</span>
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
										<Image src={brandLogo.src} alt="Alumni Logo" />
									</a>
								</Link>
							</div>
							<div className="main-header__logo-mobile d-md-block d-none">
								<Link href="/">
									<a>
										<Image src={brandLogo.src} alt="Alumni Logo" />
									</a>
								</Link>
							</div>
							{/* {scrollTop ? (
								<div className="main-header__logo-mobile d-block">
									<Link href="/">
										<a>
											<Image src={brandLogo.src} alt="Alumni Logo" />
										</a>
									</Link>
								</div>
							) : null} */}

							{scrollTop ? (
								<ul className="main-menu__list">
									{/* {navItems.slice(1).map((navItem) => (
										<NavItem key={navItem.id} navItem={navItem} />
									))} */}
									{navItems.map((navItem) => (
										<NavItem key={navItem.id} navItem={navItem} />
									))}
								</ul>
							) : (
								<ul className="main-menu__list">
									{/* {navItems.slice(1).map((navItem) => (
										<NavItem key={navItem.id} navItem={navItem} />
									))} */}
									{navItems.map((navItem) => (
										<NavItem key={navItem.id} navItem={navItem} />
									))}
								</ul>
							)}

							<div className="main-menu__right">
								{/* <span style={{ cursor: "pointer" }} className="main-menu__search search-toggler icon-magnifying-glass" onClick={() => toggleSearch()}></span> */}

								{/* {lang === "KHM" ? (
									<a href="#" className="main-menu__lang" onClick={() => onSelectLang("ENG")}>
										<Image src={EnglishFlag.src} alt="" />
									</a>
								) : (
									<a href="#" className="main-menu__lang" onClick={() => onSelectLang("KHM")}>
										<Image src={KhmerFlag.src} alt="" />
									</a>
								)} */}

								{/* <a href="#" className="main-menu__cart" onClick={() => toggleLogin()}>
									<i className="far fa-user"></i>
								</a> */}

								{!userProfile ? (
									<button className="main-menu__donate-btn" style={{ border: "none",whiteSpace: "nowrap" }} onClick={() => toggleLogin()}>
										{/* <i className="far fa-user"></i> Login */}
										<i className="far fa-user"></i> {t("general.MEMBER")}
									</button>
								) : (
									<Link href="/dashboard">
										<a className="main-menu__donate-btn" style={{ border: "none" }}>
											<i className="far fa-user"></i> {userProfile?.firstName} {userProfile?.lastName}
										</a>
									</Link>
								)}

								<button className="main-menu__donate-btn" style={{ border: "none",marginLeft: "10px",whiteSpace: "nowrap" }} onClick={() => toggleDonation(true, mainCampaign?.id)}>
									<i class="fas fa-dollar-sign"></i> {t("general.DONATION")}
								</button>

								<span onClick={() => toggleMenu()} className="mobile-nav__toggler">
									<i className="fa fa-bars"></i>
								</span>

								{/* <button className="main-menu__donate-btn" style={{ border: "none" }} onClick={() => toggleDonation()}>
									<i className="fa fa-heart"></i> Login
								</button> */}
							</div>
						</div>

						<div className={scrollTop ? "sticky-header__content mobile-menu main-menu__inner" : "main-menu__inner mobile-menu"}>
							<div className="main-header__logo-mobile d-md-none d-block">
								<Link href="/">
									<a>
										<Image src={brandLogo.src} alt="Alumni Logo" />
									</a>
								</Link>
							</div>

							<div className="main-menu__center">
								{!userProfile ? (
									<button className="main-menu__donate-btn" style={{ border: "none",whiteSpace: "nowrap" }} onClick={() => toggleLogin()}>
										{/* <i className="far fa-user"></i> Login */}
										<i className="far fa-user"></i> {t("general.MEMBER")}
									</button>
								) : (
									<Link href="/dashboard">
										<a className="main-menu__donate-btn" style={{ border: "none" }}>
											<i className="far fa-user"></i> {userProfile?.firstName} {userProfile?.lastName}
										</a>
									</Link>
								)}

								<button className="main-menu__donate-btn" style={{ border: "none",marginLeft: "0px",whiteSpace: "nowrap" }} onClick={() => toggleDonation(true, mainCampaign?.id)}>
									<i class="fas fa-dollar-sign"></i> {t("general.DONATION")}
								</button>

								<div class="dropdown" style={{alignItems: "center",marginTop: "5px"}}>
									<button class="btn btn-secondary dropdown-toggle d-flex align-items-center" onClick={() => dropdownMenu()} style={{marginRight: "10px", padding: "5px",border: "1px solid #fff",background: "transparent",borderRadius: "20px"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
										<Image src={lang === "KHM" ? (lang === "CH" ? ChinaFlag.src : KhmerFlag.src) : (lang === "CH" ? ChinaFlag.src : EnglishFlag.src)} alt="" style={{width: "20px",height: "20px"}} />
									</button>
									<ul class={`dropdown-menu ${dropdown ? 'show' : ''}`} style={{padding: ".5rem",minWidth: "auto",width: "100px"}}>
										<li>
											<a style={{display: "flex",width: "100%",alignItems: "center",gap: "5px",justifyContent: "start",paddingLeft: "0"}} class="dropdown-item d-flex align-items-center" href="#" onClick={() => onSelectLang("KHM")}>
												<div>
													<Image src={KhmerFlag.src} alt="" style={{width: "20px",height: "20px"}} />
												</div>
												<div style={{color: "#292d96",fontWeight: "700"}}>
													{t('general.khmer')}
												</div>
											</a>
										</li>
										<li>
											<a style={{display: "flex",width: "100%",alignItems: "center",gap: "5px",justifyContent: "start",paddingLeft: "0"}} class="dropdown-item d-flex align-items-center" href="#" onClick={() => onSelectLang("ENG")}>
												<div className="image">
													<Image src={EnglishFlag.src} alt="" style={{width: "20px",height: "20px"}} />
												</div>
												<div style={{color: "#292d96",fontWeight: "700"}}>
													{t('general.english')}
												</div>
											</a>
										</li>
										<li>
											<a style={{display: "flex",width: "100%",alignItems: "center",gap: "5px",justifyContent: "start",paddingLeft: "0"}} class="dropdown-item d-flex align-items-center" href="#" onClick={() => onSelectLang("CH")}>
												<div>
													<Image src={ChinaFlag.src} alt="" style={{width: "20px",height: "20px"}} />
												</div>
												<div style={{color: "#292d96",fontWeight: "700"}}>
													{t('general.chinese')}
												</div>
											</a>
										</li>
									</ul>
								</div>
							</div>	

							<div className="main-menu__right">
								<span onClick={() => toggleMenu()} className="mobile-nav__toggler">
									<i className="fa fa-bars"></i>
								</span>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default HeaderOne;
