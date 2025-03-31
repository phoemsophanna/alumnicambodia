import causesThree from "@/data/causesThree";
import dynamic from "next/dynamic";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CausesSingle from "../CausesOne/CausesSingle";

const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });

const settings = {
  lazyload: true,
  nav: false,
  mouseDrag: true,
  items: 1,
  autoplay: true,
  autoHeight: true,
  controls: false,
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

const CausesThree = () => {
  return (
    <section className="causes-three">
      <Container>
        <div className="causes-three__top">
          <div className="causes-three__top-title">
            <div className="section-title text-left">
              <span className="section-title__tagline">Latest Causes</span>
              <h2 className="section-title__title">
                Find the popular cause <br /> and donate them
              </h2>
            </div>
          </div>
          <div className="causes-three__top-btn-box">
            <a href="#" className="causes-three__top-btn thm-btn">
              <i className="fas fa-arrow-circle-right"></i>View More
            </a>
          </div>
        </div>
        <Row>
          <Col xl={12}>
            <div className="causes-three__carousel owl-theme owl-carousel">
              <TinySlider settings={settings}>
                {causesThree.map((cause) => (
                  <CausesSingle cause={cause} key={cause.id} />
                ))}
              </TinySlider>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CausesThree;
