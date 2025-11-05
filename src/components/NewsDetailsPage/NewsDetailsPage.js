import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NewsDetailsLeft from "./NewsDetailsLeft";
import Sidebar from "./Sidebar";

const NewsDetailsPage = ({data = null}) => {
  return (
    <section className="news-details">
      <Container>
        <Row>
          <Col xl={8} lg={7}>
            <NewsDetailsLeft data={data} />
          </Col>
          <Col xl={4} lg={5}>
            <Sidebar type={data?.type} id={data?.id} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewsDetailsPage;
