const navItems = [
	{
		id: 1,
		name: "HOME",
		href: "/",
		subNavItems: [],
	},
	{
		id: 2,
		name: "CAMPAIGN",
		href: "/projects",
		subNavItems: [],
	},
	{
		id: 3,
		name: "RAISE_FUND",
		href: "/raise-fund",
		subNavItems: [],
	},
	{
		id: 4,
		name: "DONORS",
		href: "/donors",
		subNavItems: [],
	},
	{
		id: 5,
		name: "FEED",
		href: "/feed",
		subNavItems: [],
	},
	// {
	// 	id: 6,
	// 	name: "GALLERY",
	// 	href: "/gallery",
	// 	subNavItems: [],
	// },
	{
		id: 7,
		name: "NEWS&EVENTS",
		href: "/news-events",
		subNavItems: [
			{ id: 1, name: "NEWS", href: "/news" },
			{ id: 2, name: "EVENTS", href: "/events" },
		],
	},
	{
		id: 8,
		name: "ABOUT",
		href: "/about",
		subNavItems: [],
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
	{ icon: "fa-facebook-square", link: "facebookLink" },
	{ icon: "fa-instagram", link: "instagramLink" },
	{ icon: "fa-linkedin", link: "linkedinLink" },
	{ icon: "fa-telegram", link: "telegramLink" },
];
