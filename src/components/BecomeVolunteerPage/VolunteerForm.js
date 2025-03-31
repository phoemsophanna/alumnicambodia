import React from "react";
import { Col, Row } from "react-bootstrap";

const inputs = [
  "name",
  "email",
  "phone",
  "address",
  "dateOfBirth",
  "occupation",
  "message",
];

const VolunteerForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const data = {};
    inputs.forEach((input) => (data[input] = fromData.get(input)));
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="become-volunteer-page__form contact-form-validated"
    >
      <Row>
        <Col xl={12}>
          <div className="become-volunteer-page__input">
            <input type="text" placeholder="Your name" name="name" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <div className="become-volunteer-page__input">
            <input type="email" placeholder="Email Address" name="email" />
          </div>
        </Col>
        <Col xl={6}>
          <div className="become-volunteer-page__input">
            <input type="text" placeholder="Phone Number" name="phone" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <div className="become-volunteer-page__input">
            <input type="text" placeholder="Address" name="address" />
          </div>
        </Col>
        <Col xl={12}>
          <div className="become-volunteer-page__input">
            <input type="text" placeholder="Date of Birth" name="dateOfBirth" />
          </div>
        </Col>
        <Col xl={12}>
          <div className="become-volunteer-page__input">
            <input type="text" placeholder="Occupation" name="occupation" />
          </div>
        </Col>
        <Col xl={12}>
          <div className="become-volunteer-page__input">
            <textarea name="message" placeholder="Write message"></textarea>
          </div>
          <button type="submit" className="thm-btn become-volunteer-page__btn">
            <i className="fas fa-arrow-circle-right"></i>Submit Comment
          </button>
        </Col>
      </Row>
    </form>
  );
};

export default VolunteerForm;
