import newsTwo from "@/data/newsTwo";
import React from "react";
import { Container, Row } from "react-bootstrap";
import SingleNews from "../NewsTwo/SingleNews";

const NewsThree = () => {
  return (
    <section className="news-two news-three">
      <Container>
        <div className="section-title text-center">
          <span className="section-title__tagline">Get Daily Updates</span>
          <h2 className="section-title__title">
            Latest news & articles directly <br /> coming from the blog
          </h2>
        </div>
        <Row>
          {newsTwo.map((news) => (
            <SingleNews key={news.id} news={news} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default NewsThree;
