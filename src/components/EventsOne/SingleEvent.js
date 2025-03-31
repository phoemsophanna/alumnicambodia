import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";

const SingleEvent = ({ event = {}, eventsPage }) => {
	const { id, date, time, title, image } = event;

	return (
		<div>
			<div className="events-one__single" style={{ userSelect: eventsPage ? "unset" : "none" }}>
				<div className="events-one__img">
					<Image src={image} alt="" />
					<div className="events-one__date-box">
						<p>
							{date.split(" ").map((t, i) => (
								<span className="d-block" key={i}>
									{t}
								</span>
							))}
						</p>
					</div>
					<div className="events-one__bottom">
						<p>
							<i className="far fa-clock"></i>
							{time}
						</p>
						<h3 className="events-one__bottom-title">
							<Link href="/event-details">
								<a>
									{title.split("\n").map((t, i) => (
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
