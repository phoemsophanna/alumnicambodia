import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import context from "./context";
import Cookies from "js-cookie";
import axios from "axios";
import { api } from "src/config";
import { useTranslation } from "react-i18next";

const ContextProvider = ({ children }) => {
	const {i18n} = useTranslation();
	const [users, setUsers] = useState([
		{
			firstName: "Admin",
			lastName: "User",
			phoneNumber: "012345678",
			email: "admin.user@gmail.com",
			password: "123456",
			createAt: "20 April 2024",
			profile: "https://res.cloudinary.com/dufghzvge/image/upload/v1719182746/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158_hyq2qt.webp"
		}
	]);


	const { pathname } = useRouter();

	const [menuStatus, setMenuStatus] = useState(false);
	const toggleMenu = (value) => {
		setMenuStatus((preMenuStatus) => (value === undefined ? !preMenuStatus : typeof value === "boolean" ? value : !!value));
	};

	const [openSearch, setOpenSearch] = useState(false);
	const toggleSearch = () => {
		setOpenSearch((preSearch) => !preSearch);
	};

	const [donationModal, setDonationModal] = useState(false);
	const [donationDetail, setDonationDetail] = useState(null);
	const toggleDonation = async (value, campaignId) => {
		console.log(value, campaignId);
		setDonationModal((preDonationModal) => (value === undefined ? !preDonationModal : typeof value === "boolean" ? value : !!value));
		if(campaignId) {
			const response = await axios.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/campaign/project/${campaignId}`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			setDonationDetail(response.data);
		}
	};

	const [loginModal, setLoginModal] = useState(false);
	const toggleLogin = (value) => {
		setLoginModal((preLoginModal) => (value === undefined ? !preLoginModal : typeof value === "boolean" ? value : !!value));
	};

	const [loginSuccess, setLoginSuccess] = useState(false);
	const [userProfile, setUserProfile] = useState(null);
	const toggleLoginSuccess = (value) => {
		setLoginSuccess(value);
	};

	const updateUserCache = (user) => {
		setUserProfile(user);
	}

	const [lang, setLang] = useState("ENG");
	const onSelectLang = (val) => {
		Cookies.set("LANG_APP", val);
		setLang(val);
		i18n.changeLanguage(val);
		fetchContact();
	}

	const [contact, setContact] = useState(null);
	const fetchContact = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/contact`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": Cookies.get("LANG_APP") ? Cookies.get("LANG_APP") : "ENG"
				},
			})
			.then((response) => {
				setContact(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	useEffect(() => {
		setLang(Cookies.get("LANG_APP") ? Cookies.get("LANG_APP") : "ENG");
		i18n.changeLanguage(Cookies.get("LANG_APP") ? Cookies.get("LANG_APP") : "ENG");
		toggleMenu(false);
		toggleDonation(false, null);
		updateUserCache(Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null);
	}, [pathname]);

	useEffect(() => {
		if (!contact) {
			fetchContact();
		}
	}, [lang]);

	const [selectCategoryId, setSelectCategoryId] = useState("");
	const onSelectCategory = (id) => {
		setSelectCategoryId(id);
	}

	const value = {
		menuStatus,
		openSearch,
		toggleMenu,
		toggleSearch,
		donationModal,
		donationDetail,
		toggleDonation,
		loginModal,
		toggleLogin,
		loginSuccess,
		toggleLoginSuccess,
		userProfile,
		users,
		updateUserCache,
		lang,
		onSelectLang,
		fetchContact,
		contact,
		selectCategoryId,
		onSelectCategory
	};
	return <context.Provider value={value}>{children}</context.Provider>;
};

export default ContextProvider;
