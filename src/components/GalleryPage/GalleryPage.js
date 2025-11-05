import galleryPageData from "@/data/galleryPageData";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import SingleGallery from "./SingleGallery";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import axios from "axios";
import { api } from "src/config";

const GalleryPage = () => {
	const [index, setIndex] = React.useState(-1);
	const [slides, setSlides] = React.useState([]);

	const [data, setData] = useState([]);

	const fetchData = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/gallery`,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				setData(response.data);
				const slideResult = response.data.map((photo) => {
					return {
						src: `${api.RESOURCE}` + photo.image,
					};
				});
				setSlides(slideResult);
			})
			.catch((e) => {
				console.error(e);
			});
	}

	React.useEffect(() => {
		fetchData();
	}, []);

	const handleImagePopUp = (index) => {
		setIndex(index);
	};

	return (
		<section className="gallery-page">
			<Container>
				<Row>
					{data.map((gallery, index) => (
						<SingleGallery key={gallery.id} gallery={gallery} onClick={() => handleImagePopUp(index)} />
					))}
					<Lightbox index={index} slides={slides} open={index >= 0} close={() => setIndex(-1)} />
				</Row>
			</Container>
		</section>
	);
};

export default GalleryPage;
