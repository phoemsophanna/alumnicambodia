import newsPage from "@/data/newsPage";
import React from "react";
import { Container, Row } from "react-bootstrap";
import SingleNews from "../NewsTwo/SingleNews";

const NewsPage = ({data = []}) => {
  return (
    <section className="news-page">
      <Container>
        <Row>
          {data.map((news, index) => (
            <SingleNews key={index} news={news} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default NewsPage;
