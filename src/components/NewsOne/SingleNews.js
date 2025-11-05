import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";
import { api } from "src/config";

const SingleNews = ({ news = null }) => {
	return (
		<div className="news-one__right-single">
			<div className="news-one__right-img">
				<Image src={news?.image ? api.RESOURCE + news?.image : "/causes-one-img-1.jpg"} alt="" />
				<Link href={news?.type === "NEWS" ? `/news/${news?.id}` : `/events/${news?.id}`}>
					<a>
						<i className="fa fa-plus"></i>
					</a>
				</Link>
			</div>
			<div className="news-one__right-content">
				<h3 className="news-one__right-title">
					<Link href={news?.type === "NEWS" ? `/news/${news?.id}` : `/events/${news?.id}`}>
						<a>{news?.title}</a>
					</Link>
				</h3>
			 	<p>
					{ news?.summary }
				</p>
				<ul className="list-unstyled news-one__right-meta">
					<li>{news?.createdAt}</li>
					{/* <li>
						<a href="#">{0} Comments</a>
					</li> */}
				</ul>
			</div>
		</div>
	);
};

export default SingleNews;
