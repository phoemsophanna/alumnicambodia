import { contact } from "./contactData";

const footerData = {
	...contact,
	link: "www.camgotech.com",
	copyrightYear: new Date().getFullYear(),
	about: "Lorem ipsum dolor sit ame consect etur pisicing elit sed do eiusmod tempor incididunt ut labore.",
	bottomLogo: "https://res.cloudinary.com/dufghzvge/image/upload/v1704359302/footer-logo.ca0ed00f_xnwhus.jpg",
	footerBg: "https://res.cloudinary.com/dufghzvge/image/upload/v1704270956/footer-bg.666d06b7_w3eoe4.jpg",
	social: [
		{ icon: "fa-facebook-square", link: "facebookLink" },
		{ icon: "fa-instagram", link: "instagramLink" },
		{ icon: "fa-linkedin", link: "linkedinLink" },
		{ icon: "fa-telegram", link: "telegramLink" },
	],
	exploreList: [
		{
			id: 1,
			href: "/projects",
			title: "Campaign",
		},
		{
			id: 2,
			href: "/raise-fund",
			title: "Raise Fund",
		},
		{
			id: 3,
			href: "/feed",
			title: "Feed",
		},
		{
			id: 4,
			href: "/donors",
			title: "Doors",
		},
	],
};

export default footerData;
