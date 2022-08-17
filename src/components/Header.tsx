import React, { FC } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Container from "react-bootstrap/Container";

const Header = () => {
  const TitleHeader = styled.div`
    a {
      text-decoration: none;
      color: black;
      font-weight: bolder;
    }
  `;
  const Logo = styled.img`
    margin-bottom: 3%;
    margin-right: 2%;
  `;

  return (
    <Container className="bg-warning">
      <Row className="justify-content-center">
        <Col md={1}>
          <Logo src={require("../assets/y18.gif")} />
        </Col>
        <Col md={2}>
          <TitleHeader>
            <Link to="/home">Hacker News</Link>
          </TitleHeader>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
