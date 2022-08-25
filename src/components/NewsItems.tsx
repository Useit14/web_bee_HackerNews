import React, { FC, useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import { getFeedItems } from "../hooks/getFeedItems";
import { FeedItem } from "../types/types";

const Button = styled.a`
  img {
    margin-top: 3%;
  }
  text-decoration: none;
  cursor: pointer;
`;

const NewsItems: FC = () => {
  const [data, setData] = useState<FeedItem[]>();

  let idInterval: NodeJS.Timer;

  useEffect(() => {
    getFeedItems().then((data) => setData(data));
    idInterval = setInterval(() => {
      setData([]);
      getFeedItems().then((data) => setData(data));
    }, 60000);

    return () => {
      clearInterval(idInterval);
    };
  }, []);

  const reFetch = () => {
    getFeedItems().then((e) => setData(e));
  };

  return (
    <Row>
      <Col md={11} xl={11} sm={11} col={11}>
        {data?.map((item, index) => (
          <NewsItem
            key={item.id}
            index={index + 1}
            comments_count={item.comments_count}
            domain={item.domain}
            points={item.points}
            time={item.time}
            time_ago={item.time_ago}
            url={item.url}
            user={item.user}
            title={item.title}
            id={item.id}
          />
        ))}
      </Col>
      <Col md={1} xl={1} sm={1} col={1}>
        <Button onClick={() => reFetch()}>
          <img src={require("../assets/icons8-refresh-24.png")} alt={""} />
        </Button>
      </Col>
    </Row>
  );
};

export default NewsItems;
