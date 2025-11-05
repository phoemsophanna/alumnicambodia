import newsTwo from "@/data/newsTwo";
import dynamic from "next/dynamic";
import React from "react";
import { Container, Row } from "react-bootstrap";
import JarallaxImage from "../Jarallax/JarallaxImage";
import SingleNews from "./SingleNews";
const Jarallax = dynamic(() => import("../Jarallax/Jarallax"), { ssr: false });

const NewsTwo = () => {
	return (
		<section className="news-two">
			<Jarallax className="news-two-bg" speed={0.2} imgPosition="50% 0%">
				<JarallaxImage src="https://res.cloudinary.com/dufghzvge/image/upload/v1704358420/help-them-bg.49706910_ufduqz.jpg" />
				<div className="news-two-bg-overlay"></div>
			</Jarallax>
			<Container>
				<div className="section-title text-center">
					<span className="section-title__tagline">Get Daily Updates</span>
					<h2 className="section-title__title">
						Latest news & articles directly <br /> coming from the blog
					</h2>
				</div>
				<Row>
					{newsTwo.map((news) => (
						<SingleNews key={news.id} news={news} />
					))}
				</Row>
			</Container>
		</section>
	);
};

export default NewsTwo;
