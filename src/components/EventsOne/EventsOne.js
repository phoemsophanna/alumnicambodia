import events from "@/data/events";
import dynamic from "next/dynamic";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleEvent from "./SingleEvent";

const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });

const settings = {
  lazyload: true,
  nav: false,
  mouseDrag: true,
  items: 1,
  autoplay: true,
  autoHeight: true,
  controlsContainer: "#events-one-nav",
  gutter: 0,
  responsive: {
    768: {
      items: 2,
      gutter: 20,
    },
    992: {
      items: 3,
      gutter: 30,
    },
  },
};

const EventsOne = () => {
  return (
    <section className="events-one">
      <Container>
        <Row>
          <Col xl={4}>
            <div className="events-one__left">
              <div className="section-title text-left">
                <span className="section-title__tagline">Upcoming Events</span>
                <h2 className="section-title__title">
                  Check latest upcoming events
                </h2>
              </div>
              <p className="events-one__text">
                There are many variations of passages of lorem ipsum available
                but the majority have suffered.
              </p>
              <a href="#" className="events-one__btn thm-btn">
                <i className="fas fa-arrow-circle-right"></i>Learn More
              </a>
            </div>
          </Col>
          <Col xl={8}>
            <div className="events-one__right">
              <div className="events-one__carousel owl-theme owl-carousel">
                <TinySlider settings={settings}>
                  {events.map((event) => (
                    <SingleEvent event={event} key={event.id} />
                  ))}
                </TinySlider>
                <div id="events-one-nav" className="owl-nav">
                  <button
                    type="button"
                    role="presentation"
                    className="owl-prev me-2"
                  >
                    <span className="icon-right-arrow left"></span>
                  </button>
                  <button
                    type="button"
                    role="presentation"
                    className="owl-next"
                  >
                    <span className="icon-right-arrow"></span>
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EventsOne;
