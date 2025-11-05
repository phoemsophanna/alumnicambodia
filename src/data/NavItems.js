const navItems = [
	{
		id: 1,
		name: "HOME",
		href: "/",
		subNavItems: [],
	},
	{
		id: 2,
		name: "ABOUT",
		href: "/about",
		subNavItems: [],
	},
	{
		id: 4,
		name: "PROJECT",
		href: "/projects",
		subNavItems: [],
	},
	// {
	// 	id: 3,
	// 	name: "RAISE_FUND",
	// 	href: "/raise-fund",
	// 	subNavItems: [],
	// },
	{
		id: 5,
		name: "DONORS",
		href: "/donors",
		subNavItems: [],
	},
	// {
	// 	id: 5,
	// 	name: "FEED",
	// 	href: "/feed",
	// 	subNavItems: [],
	// },
	// {
	// 	id: 6,
	// 	name: "PROJECT",
	// 	href: "/portfolios",
	// 	subNavItems: [],
	// },
	{
		id: 7,
		name: "MEMBER",
		href: "/member",
		subNavItems: [],
	},
	// {
	// 	id: 6,
	// 	name: "GALLERY",
	// 	href: "/gallery",
	// 	subNavItems: [],
	// },
	{
		id: 8,
		name: "activities",
		href: "#",
		subNavItems: [
			{ id: 1, name: "GALLERY", href: "/gallery" },
			{ id: 2, name: "video", href: "/video" },
		],
	},
	{
		id: 8,
		name: "NEWS&EVENTS",
		href: "/news-events",
		subNavItems: [
			// { id: 1, name: "NEWS", href: "/news" },
			// { id: 2, name: "EVENTS", href: "/events" },
		],
	},
	{
		id: 9,
		name: "CONTACT",
		href: "/contact",
		subNavItems: [],
	},
];

export default navItems;

export const social = [
	{ icon: "fa-brands fa-facebook-f", link: "facebookLink" },
	{ icon: "fa-instagram", link: "instagramLink" },
	{ icon: "fa-brands fa-linkedin-in", link: "linkedinLink" },
	{ icon: "fa-telegram", link: "telegramLink" },
];
