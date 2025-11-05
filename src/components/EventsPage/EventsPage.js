import eventsPage from "@/data/eventsPage";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleEvent from "../EventsOne/SingleEvent";

const EventsPage = ({ moreData = null }) => {
  return (
    <section className="events-page">
      <Container>
        <Row>
          {moreData.map((event) => (
            <Col xl={4} lg={6} md={6} key={event.id}>
              <SingleEvent event={event} eventsPage />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default EventsPage;
