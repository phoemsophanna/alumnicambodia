import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const BecomeVolunteer = () => {
  return (
    <section className="become-volunteer">
      <Container>
        <Row>
          <Col xl={12}>
            <div className="become-volunteer__inner">
              <div className="become-volunteer__left">
                <h2>
                  Join your hand with us for <br /> a better life and future
                </h2>
                <div className="become-volunteer__big-text">
                  <h2>Become a Volunteers</h2>
                </div>
              </div>
              <div className="become-volunteer__btn-box">
                <Link href="/volunteer">
                  <a className="become-volunteer__btn thm-btn">
                    <i className="fas fa-arrow-circle-right"></i>Learn More
                  </a>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BecomeVolunteer;
