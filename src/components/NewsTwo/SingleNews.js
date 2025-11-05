import Link from "next/link";
import React from "react";
import { Col, Image } from "react-bootstrap";
import { api } from "src/config";

const SingleNews = ({ news = null }) => {

	return (
		<Col xl={4} lg={4} className="animated fadeInUp">
			<div className="news-two__single">
				<div className="news-two__img-box">
					<div className="news-two__img">
						<Image src={news?.image ? api.RESOURCE + news?.image : "/"} alt="" />
						<Link href={news?.type === "NEWS" ? `/news/${news?.id}` : `/events/${news?.id}`}>
							<a>
								<i className="fa fa-plus"></i>
							</a>
						</Link>
					</div>
					<div className="news-two__date">
						<p>{news?.createdAt}</p>
					</div>
				</div>
				<div className="news-two__content">
					{/* <ul className="list-unstyled news-two__meta">
						<li>
							<a href="#">
								<i className="far fa-user-circle"></i> {""}
							</a>
						</li>
						<li>
							<span>/</span>
						</li>
						<li>
							<a href="#">
								<i className="far fa-comments"></i> {0} Comments
							</a>
						</li>
					</ul> */}
					<h3>
						<Link href={news?.type === "NEWS" ? `/news/${news?.id}` : `/events/${news?.id}`}>{news?.title}</Link>
					</h3>
					<p className="news-two__text">{news?.summary}</p>
				</div>
			</div>
		</Col>
	);
};

export default SingleNews;
