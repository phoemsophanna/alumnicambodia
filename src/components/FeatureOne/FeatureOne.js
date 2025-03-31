import featureOne from "@/data/featureOne";
import React from "react";
import { Container, Row } from "react-bootstrap";
import SingleFeature from "./SingleFeature";

const FeatureOne = () => {
  return (
    <section className="feature-one">
      <Container>
        <Row>
          {featureOne.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeatureOne;
