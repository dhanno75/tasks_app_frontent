import React from "react";
import { Row, Col } from "react-bootstrap";
import Banner from "../images/about.jpg";
import styled from "styled-components";

const About = () => {
  return (
    <Container fluid className="about-wrapper">
      <Row>
        <Col sm={12} md={12} lg={5}>
          <div className="about-left">
            <h3>Hello, My name is</h3>
            <h2>Dhananjay</h2>
            <p>
              I created a to do app called tasks. Here, you can organize your
              lists in full screen board to stay on top of your work. Please
              feel free to use it, and its completely free to use. Thank you!
            </p>
          </div>
        </Col>
        <Col sm={12} md={12} lg={7}>
          <div className="about-right">
            <img src={Banner} alt="" className="about-img" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  padding: 0 30px;
  background-color: rgb(252, 244, 255);
  height: 100vh;

  .about-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80vh;
    padding-left: 35px;

    h3 {
      font-family: "Raleway", "sans-serif";
      font-size: 30px;
      font-weight: 300;
      margin-bottom: 5%;
    }

    h2 {
      font-family: "Raleway", "sans-serif";
      font-size: 55px;
      font-weight: 700;
      margin-bottom: 5%;
    }

    p {
      font-family: "Raleway", "sans-serif";
      font-size: 18px;
      font-weight: 300;
      width: 70%;
    }
  }

  .about-right {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .about-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .partition {
    width: 10px;
    background-color: rgb(72, 69, 69);
  }
`;

export default About;
