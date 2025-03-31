import React from "react";
import { Col } from "react-bootstrap";

const SingleFeature = ({ feature = {} }) => {
  const { title, icon, description } = feature;

  return (
    <Col xl={4} lg={4}>
      <div className="feature-one__single feature-one__single-1">
        <div className="feature-one__icon">
          <span className={icon}></span>
        </div>
        <div className="feature-one__content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Col>
  );
};

export default SingleFeature;
