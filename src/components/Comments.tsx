import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Item } from "../types/types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ContextComments } from "../ContextData";
import { getContent } from "../functions/getContent";
import { useNavigate, useParams } from "react-router-dom";
import { getItem } from "../hooks/getItem";

const LinkInnerComment = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: gray;
`;
const Button = styled.a`
  img {
    margin-top: 3%;
  }
  text-decoration: none;
  cursor: pointer;
`;
const Comment = styled.div`
  margin-top: 3%;
  margin-left: 3%;
`;
const Line = styled.div`
  border-bottom: 1px solid gray;
`;
const TitleHeader = styled.a`
  text-decoration: none;
  color: black;
  font-weight: bolder;
`;
const SmallText = styled.p`
  color: gray;
  font-weight: lighter;
`;

const Comments = () => {
  const navigate = useNavigate();
  const { comment, setComment } = useContext(ContextComments);
  const [data, setData] = useState<Item>();
  let idInterval: NodeJS.Timer;
  const { id } = useParams();

  useEffect(() => {
    getItem(id).then((data) => setData(data));
    idInterval = setInterval(() => {
      getItem(id).then((data) => setData(data));
    }, 60000);

    return () => {
      clearInterval(idInterval);
    };
  }, []);

  const reFetch = () => {
    getItem(id).then((e) => setData(e));
  };

  const handlerClick = (id: number, visible: boolean) => {
    const commentObj = {
      [id]: visible,
    };
    setComment(Object.assign(commentObj, comment));
  };

  const goBack = () => {
    navigate("/");
  };

  const getInnerComments: (
    comments: Item | undefined,
    level: number,
    isInner?: boolean
  ) => React.ReactNode = (comments, level, isInner = true) => {
    return comments?.comments.map((item: Item) => {
      if (item.level > level) {
        return;
      }
      return (
        <Comment>
          <Row>
            <Col md={3} xl={2} sm={1} col={1} ld={2}>
              <SmallText>{item.user}</SmallText>
            </Col>
            <Col md={2} xl={2} sm={2} col={2}>
              <SmallText>{item.time_ago}</SmallText>
            </Col>
            <Col md={1} xl={1} sm={1} col={1}>
              <LinkInnerComment
                onClick={() => {
                  handlerClick(item.id, true);
                }}
              >
                {item.comments_count > 0 ? "[+]" : ""}
              </LinkInnerComment>
            </Col>
          </Row>
          <Row>{getContent(item.content)}</Row>
          <Row>
            {comment?.[item.id] && getInnerComments(item, item.level + 1)}
          </Row>
          {!isInner && <Line />}
        </Comment>
      );
    });
  };

  return (
    <Container>
      <Container>
        <Row>
          <Col md={6} xl={6} sm={6} col={6}>
            <TitleHeader href={data?.url}>{data?.title}</TitleHeader>
          </Col>
          <Col md={4} xl={4} sm={4} col={4}>
            <LinkInnerComment href={data?.url}>
              ({data?.domain})
            </LinkInnerComment>
          </Col>
          <Col md={1} xl={1} sm={1} col={1}>
            <Button onClick={() => goBack()}>
              <img src={require("../assets/icons8-back-24.png")} alt={""} />
            </Button>
          </Col>
          <Col md={1} xl={1} sm={1} col={1}>
            <Button onClick={() => reFetch()}>
              <img src={require("../assets/icons8-refresh-24.png")} alt={""} />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={3} xl={3} sm={4} lg={3}>
            <SmallText>Author: {data?.user}</SmallText>
          </Col>
          <Col md={3} xl={3} sm={3} lg={3}>
            <SmallText>Comments: {data?.comments_count}</SmallText>
          </Col>
        </Row>
      </Container>
      <Container>{getInnerComments(data, 1, false)}</Container>
    </Container>
  );
};

export default Comments;
