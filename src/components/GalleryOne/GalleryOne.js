import galleryData from "@/data/galleryData";
import dynamic from "next/dynamic";
import React from "react";
import { Image } from "react-bootstrap";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });

const settings = {
	lazyload: true,
	nav: false,
	// mouseDrag: true,
	items: 1,
	autoplay: true,
	autoHeight: true,
	controls: false,
	gutter: 0,
	rewind: true,
	responsive: {
		768: {
			items: 2,
			gutter: 15,
		},
		992: {
			items: 3,
			gutter: 15,
		},
		1200: {
			items: 5,
			gutter: 20,
		},
	},
};

const GalleryOne = ({ className = "" }) => {
	const [index, setIndex] = React.useState(-1);
	const [slides, setSlides] = React.useState([]);

	React.useEffect(() => {
		const slideResult = galleryData.map((photo) => {
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
		<section className={`gallery-one ${className}`}>
			<div className="gallery-one__container-box clearfix">
				<TinySlider settings={settings} className="gallery-one__carousel">
					{galleryData.map(({ id, image, title, subTitle }, index) => (
						<div key={index} style={{ cursor: "pointer" }}>
							<div style={{ userSelect: "none" }} className="gallery-one__single">
								<div className="gallery-one__img-box" onClick={() => handleImagePopUp(index)}>
									<Image src={image} alt="" style={{ height: "310px", objectFit: "cover" }} />
									<div className="gallery-one__hover-content-box">
										<h2>{title}</h2>
										{/* <p>{subTitle}</p> */}
									</div>
								</div>
							</div>
						</div>
					))}
				</TinySlider>
				<Lightbox index={index} slides={slides} open={index >= 0} close={() => setIndex(-1)} />
			</div>
		</section>
	);
};

export default GalleryOne;
