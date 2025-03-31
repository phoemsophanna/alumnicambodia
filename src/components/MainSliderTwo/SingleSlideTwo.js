import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SwiperSlide } from "swiper/react";

const SingleSlideTwo = ({ slide = {} }) => {
  const { bg, subTitle, title, href } = slide;

  return (
    <SwiperSlide>
      <div
        className="image-layer"
        style={{ backgroundImage: `url(${bg.src})` }}
      ></div>
      <div className="image-layer-overlay"></div>
      <Container>
        <Row>
          <Col lg={12} className="text-center">
            <div className="main-slider__content">
              <p>{subTitle}</p>
              <h2>
                {title} <br /> Helping Hand
              </h2>
              <a href={href} className="thm-btn">
                <i className="fas fa-arrow-circle-right"></i>Learn More
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </SwiperSlide>
  );
};

export default SingleSlideTwo;
