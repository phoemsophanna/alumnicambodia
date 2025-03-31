import testimonialTwo from "@/data/testimonialTwo";
import React from "react";
import { Container, Row } from "react-bootstrap";
import SingleTestimonial from "./SingleTestimonial";

const TestimonialTwo = () => {
  return (
    <section className="testimonial-two">
      <Container>
        <div className="section-title text-center">
          <span className="section-title__tagline">Our Testimonials</span>
          <h2 className="section-title__title">
            What they’re talking <br /> about charity
          </h2>
        </div>
        <Row>
          {testimonialTwo.map((testimonial) => (
            <SingleTestimonial
              singleTestimonial={testimonial}
              key={testimonial.id}
            />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialTwo;
