import React, { FC } from "react";
import { FeedItem } from "../types/types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NewsItem: FC<FeedItem> = (props) => {
  const TitleNew = styled.div`
    a {
      text-decoration: none;
      color: gray;
    }
  `;
  return (
    <Container className="justify-content-center">
      <Row>
        <Col md={1}>{props.index}.</Col>
        <Col md={11}>
          <Row>
            <Col md={6}>
              <TitleNew>
                <Link to={`/item/${props.id}`}>{props.title}</Link>
              </TitleNew>
            </Col>
          </Row>
          <Row>
            <Col md={1}>{props.points} points</Col>
            <Col md={2}>by {props.user}</Col>
            <Col md={3}>{props.time_ago}</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsItem;
