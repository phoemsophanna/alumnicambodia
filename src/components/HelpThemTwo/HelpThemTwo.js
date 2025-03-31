import helpThemTwo from "@/data/helpThemTwo";
import React, { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import VideoModal from "../HelpThem/VideoModal";

const {
  image,
  image2,
  background,
  videoId,
  tagline,
  title,
  bottomTitle,
  bottomDescription,
  list,
} = helpThemTwo;

const HelpThemTwo = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <section className="help-them-two">
        <Container>
          <Row>
            <Col xl={6}>
              <div className="help-them-two__left">
                <div
                  className="help-them-two-bg"
                  style={{ backgroundImage: `url(${background.src})` }}
                ></div>
                <div className="help-them-two__img">
                  <Image src={image.src} alt="" />
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpen(true)}
                    className="help-them-two__video-btn video-popup"
                  >
                    <i className="fa fa-play"></i>
                  </span>
                </div>
              </div>
            </Col>
            <Col xl={6}>
              <div className="help-them-two__right">
                <div className="section-title text-left">
                  <span className="section-title__tagline">{tagline}</span>
                  <h2 className="section-title__title">
                    {title.split("\n").map((t, i) => (
                      <span key={i} className="d-block">
                        {t}
                      </span>
                    ))}
                  </h2>
                </div>
                <div className="help-them-two__list-box">
                  <ul className="help-them-two__list list-unstyled">
                    {list.slice(0, 2).map((item, index) => (
                      <li key={index}>
                        <div className="help-them-two__icon-box">
                          <i className="fas fa-arrow-circle-right"></i>
                        </div>
                        <div className="help-them-two__text-box">
                          <h4>{item}</h4>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <ul className="help-them-two__list help-them-two__list-two list-unstyled">
                    {list.slice(2).map((item, index) => (
                      <li key={index}>
                        <div className="help-them-two__icon-box">
                          <i className="fas fa-arrow-circle-right"></i>
                        </div>
                        <div className="help-them-two__text-box">
                          <h4>{item}</h4>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="help-them-two__bottom">
                  <h3 className="help-them-two__bottom-title">{bottomTitle}</h3>
                  <p className="help-them-two__bottom-text">
                    {bottomDescription}
                  </p>
                </div>
                <div className="help-them-two__donation-text-box">
                  <h2>Start&nbsp;&nbsp;Donating</h2>
                  <div className="help-them-two__donation-icon">
                    <Image src={image2.src} alt="" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <VideoModal isOpen={isOpen} setOpen={setOpen} id={videoId} />
    </>
  );
};

export default HelpThemTwo;
