import galleryPageData from "@/data/galleryPageData";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import axios from "axios";
import { api } from "src/config";
import SingleVideo from "./SingleVideo";

const VideoPage = () => {

	const [data, setData] = useState([]);

	const fetchData = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/video`,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				let videos = [];
				response.data.map((video) => {
					let embedUrl = ""; // This will store the final embed link
					const url = video.link ?? "";
					if (url.includes("youtube.com") || url.includes("youtu.be")) {
						let videoId = "";

						if (url.includes("youtube.com")) {
							let urlParams = new URL(url).searchParams;
							videoId = urlParams.get("v"); // Extract YouTube video ID
						} else if (url.includes("youtu.be")) {
							videoId = url.split("/").pop(); // Extract from short URL
						}

						if (videoId) {
							embedUrl = "https://www.youtube.com/embed/" + videoId;
						}
					} 
					else if (url.includes("facebook.com")) {
						embedUrl = "https://www.facebook.com/plugins/video.php?href=" + encodeURIComponent(url);
					}

					videos.push({link: embedUrl});
				});

				setData(videos);
			})
			.catch((e) => {
				console.error(e);
			});
	}

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className="gallery-page">
			<Container>
				<Row>
					{data.map((gallery, index) => (
						<SingleVideo key={gallery.id} video={gallery} />
					))}
				</Row>
			</Container>
		</section>
	);
};

export default VideoPage;
