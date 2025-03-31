import galleryPageData from "@/data/galleryPageData";
import React from "react";
import { Container, Row } from "react-bootstrap";
import SingleGallery from "./SingleGallery";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

const GalleryPage = () => {
	const [index, setIndex] = React.useState(-1);
	const [slides, setSlides] = React.useState([]);

	React.useEffect(() => {
		const slideResult = galleryPageData.map((photo) => {
			return {
				src: photo.image,
			};
		});
		setSlides(slideResult);
	}, []);

	const handleImagePopUp = (index) => {
		setIndex(index);
	};

	return (
		<section className="gallery-page">
			<Container>
				<Row>
					{galleryPageData.map((gallery, index) => (
						<SingleGallery key={gallery.id} gallery={gallery} onClick={() => handleImagePopUp(index)} />
					))}
					<Lightbox index={index} slides={slides} open={index >= 0} close={() => setIndex(-1)} />
				</Row>
			</Container>
		</section>
	);
};

export default GalleryPage;
