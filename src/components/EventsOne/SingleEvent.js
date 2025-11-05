import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";
import { api } from "src/config";

const SingleEvent = ({ event = {}, eventsPage }) => {
	const { id, title_content, datetime, image } = event;

	return (
		<div>
			<div className="events-one__single" style={{ userSelect: eventsPage ? "unset" : "none" }}>
				<div className="events-one__img">
					<Image src={api.RESOURCE + image} alt="" />
					<div className="events-one__date-box">
						<p>
							<span className="d-block">
								{datetime.split(" ").map((t, i) => (
									t + (i == 0 ? "-" : "")
								))}
							</span>
							
						</p>
					</div>
					<div className="events-one__bottom">
						<h3 className="events-one__bottom-title">
							<Link href={`/portfolios/${id}`}>
								<a>
									{title_content.split("\n").map((t, i) => (
										<span className="d-block" key={i}>
											{t}
										</span>
									))}
								</a>
							</Link>
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleEvent;
