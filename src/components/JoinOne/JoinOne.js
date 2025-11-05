import dynamic from "next/dynamic";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import JarallaxImage from "../Jarallax/JarallaxImage";
import { api } from "src/config";
import Link from "next/link";
import { useRootContext } from "@/context/context";
const Jarallax = dynamic(() => import("../Jarallax/Jarallax"), { ssr: false });

const JoinOne = ({ className = "", data = null }) => {
	const { toggleLogin,userProfile } = useRootContext();
	return (
		<section className={`join-one ${className}`}>
			<Jarallax className="join-one-bg" speed={0.2} imgPosition="50% 0%">
				<JarallaxImage src={ data?.thumbnail ? `${api.RESOURCE}${data?.thumbnail}` : `https://res.cloudinary.com/dufghzvge/image/upload/v1704270957/join-one-bg.18ca67da_p8bwds.jpg`} />
			</Jarallax>
			<Container>
				<Row>
					<Col xl={12}>
						<div className="join-one__inner">
							<h2 className="join-one__title" style={{color:"#fe0000",marginBottom:"0px"}}>Membership</h2>
							<h2 className="join-one__title" dangerouslySetInnerHTML={{__html: data?.bannerDesc}}></h2>
								{!userProfile ? (
								<a href="#" onClick={() => toggleLogin()} className="join-one__btn thm-btn">
									<i className="fas fa-arrow-circle-right"></i> {data?.bannerLabel}
								</a>) : "" }
							{/* <Link href={`${data?.bannerLinkTo}`}> */}
							{/* </Link> */}
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default JoinOne;
