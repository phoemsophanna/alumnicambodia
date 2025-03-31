import causesData from "@/data/causesData";
import dynamic from "next/dynamic";
import React from "react";
import { Col, Row } from "react-bootstrap";
import CausesSingle from "../CausesOne/CausesSingle";
const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });

const settings = {
  lazyload: true,
  nav: true,
  mouseDrag: true,
  items: 1,
  autoplay: true,
  autoHeight: true,
  controls: false,
  navPosition: "bottom",
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
    1200: {
      items: 4,
      gutter: 30,
    },
  },
};

const CausesTwo = () => {
  return (
    <section className="causes-two">
      <div className="container-box">
        <div className="section-title text-center">
          <span className="section-title__tagline">Latest Causes</span>
          <h2 className="section-title__title">
            Find the popular cause <br /> and donate them
          </h2>
        </div>
        <Row>
          <Col xl={12}>
            <div className="causes-two__carousel">
              <TinySlider settings={settings}>
                {causesData.map((cause) => (
                  <CausesSingle cause={cause} key={cause.id} />
                ))}
              </TinySlider>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default CausesTwo;
