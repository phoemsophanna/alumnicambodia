const postList = [
	{
		id: 1,
		image: "https://halpes-nextjs.vercel.app/_next/static/media/lp-1-1.96b6c956.jpg",
		admin: "Admin",
		title: "Help Children Rise out of Poverty",
	},
	{
		id: 2,
		image: "https://halpes-nextjs.vercel.app/_next/static/media/lp-1-2.dbd441e0.jpg",
		admin: "Admin",
		title: "Help Children Rise out of Poverty",
	},
	{
		id: 3,
		image: "https://halpes-nextjs.vercel.app/_next/static/media/lp-1-2.dbd441e0.jpg",
		admin: "Admin",
		title: "Help Children Rise out of Poverty",
	},
];

const tags = ["Donation", "Charity", "Poor", "Education", "Fundraising"];

const categories = ["Charity", "Fundraising", "Donations", "Save Lives", "Health", "Education", "Food", "Water"];
export const newsDetailsPage = {
	postList,
	tags,
	categories,
};

const text1 =
	"Tliq is notm hendr erit a augue insu image pellen tes que id erat quis sollicitud. Lorem ipsum dolor sit amet, consectetur adipiscing ullam blandit hendrerit faucibus suspendisse. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.";
const text2 =
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ley of type and scrambled it to make a type specimen book.";
const text3 =
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including version.";

const newsDetails = {
	image: "https://res.cloudinary.com/dufghzvge/image/upload/v1704360766/news-details-img.f9064e8f_ce67ht.jpg",
	admin: "Admin",
	totalComments: 2,
	title: "Donation is Hope for Poor Childrens in Africa",
	textOne: text1,
	textTwo: text2,
	textThree: text3,
	tags: tags.slice(0, 3),
	author: {
		image: "https://res.cloudinary.com/dufghzvge/image/upload/v1704360832/author-1-1.f572726f_cafc63.jpg",
		name: "Kevin Martin",
		description:
			"Cursus massa at urnaaculis estie. Sed aliquamellus vitae ultrs condmentum lightly believable. If you are going to use a of you need to be sure there isn't anything embarrassing.",
	},
	comments: [
		{
			id: 1,
			image: "https://halpes-nextjs.vercel.app/_next/static/media/lp-1-2.dbd441e0.jpg",
			message:
				"Sending love. My nephews Nick and Anthony Salaber are your teammates, so I know the caliber person you are. Our whole family is sending our best to you and your family.",
			sender: "David Marks",
			time: "3 hours ago",
		},
		{
			id: 2,
			image: "https://halpes-nextjs.vercel.app/_next/static/media/comment-1-2.97e8e4be.jpg",
			message:
				"Sending love. My nephews Nick and Anthony Salaber are your teammates, so I know the caliber person you are. Our whole family is sending our best to you and your family.",
			sender: "Christine Eve",
			time: "3 hours ago",
		},
	],
};

export default newsDetails;
