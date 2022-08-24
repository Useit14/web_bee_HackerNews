import React, { FC, useContext, useEffect } from "react";
import NewsItem from "./NewsItem";
import { ContextData } from "../ContextData";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import { getFeedItems } from "../hooks/getFeedItems";

const Button = styled.a`
  img {
    margin-top: 3%;
  }
  text-decoration: none;
  cursor: pointer;
`;

const NewsItems: FC = () => {
  const { data, setData } = useContext(ContextData);

  let idInterval: NodeJS.Timer;

  useEffect(() => {
    clearInterval(idInterval);
    getFeedItems().then((data) => setData(data));
    idInterval = setInterval(() => {
      setData([]);
      getFeedItems().then((data) => setData(data));
    }, 60000);
  }, []);

  const reFetch = () => {
    getFeedItems().then((e) => setData(e));
  };

  return (
    <Row>
      <Col md={11} xl={11} sm={11} col={11}>
        {data.map((item, index) => (
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
