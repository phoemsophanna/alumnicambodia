const text1 =
	"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.";
const text2 =
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

const summaryText =
	"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.";

const causesDetails = {
	raised: "25,270",
	goal: "30,000",
	category: "Medical",
	title: "Raise Fund for Clean & Healthy Water",

	images: [
		"https://res.cloudinary.com/dufghzvge/image/upload/v1704359061/causes-details-img.56ee3bf1_ikzpfi.jpg",
		"https://res.cloudinary.com/dufghzvge/image/upload/v1704359060/causes-details-images-1.4ff36974_ikvkgi.jpg",
		"https://res.cloudinary.com/dufghzvge/image/upload/v1704359060/causes-details-images-2.7675ffe9_dslimr.jpg",
	],
	texts: [text1, text2],
	summaryText,
	summaryList: [
		"Making this first true generator",
		"Many desktop publish packages",
		"Lorem Ipsum is not simply",
		"If you are going to passage",
		"It has roots in a piece",
	],
	comments: [
		{
			id: 1,
			image: "comment-1-1.jpg",
			message:
				"Sending love. My nephews Nick and Anthony Salaber are your teammates, so I know the caliber person you are. Our whole family is sending our best to you and your family.",
			sender: "David Marks",
			time: "3 hours ago",
		},
		{
			id: 2,
			image: "comment-1-2.jpg",
			message:
				"Sending love. My nephews Nick and Anthony Salaber are your teammates, so I know the caliber person you are. Our whole family is sending our best to you and your family.",
			sender: "Christine Eve",
			time: "3 hours ago",
		},
	],
};

export default causesDetails;
