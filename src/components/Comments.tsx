import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Item } from "../types/types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ContextComments } from "../ContextData";
import { getContent } from "../functions/getContent";
import { useNavigate } from "react-router-dom";
import { getItem } from "../hooks/getItem";

const Comments = () => {
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
    margin-top: 1%;
    border-bottom: 1px solid gray;
  `;
  const InnerComment = styled.div`
    margin-left: 5%;
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
  const navigate = useNavigate();
  const { comment, setComment } = useContext(ContextComments);
  const [data, setData] = useState<Item>();

  useEffect(() => {
    getItem(window.location.pathname).then((e) => setData(e));
    setInterval(() => {
      getItem(window.location.pathname).then((e) => setData(e));
    }, 60000);
  }, []);

  const reFetch = () => {
    getItem(window.location.pathname).then((e) => setData(e));
  };

  const handlerClick = (id: number, visible: boolean) => {
    const commentObj = {
      [id]: visible,
    };
    setComment(Object.assign(commentObj, comment));
  };

  const goBack = () => {
    navigate(-1);
  };

  const getInnerComments: (comments: Item, level: number) => React.ReactNode = (
    comments,
    level
  ) => {
    return comments?.comments.map((item: Item) => {
      if (item.level > level) {
        return;
      }
      return (
        <InnerComment>
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
            {comment?.[item.id] === true ? (
              getInnerComments(item, item.level + 1)
            ) : (
              <></>
            )}
          </Row>
        </InnerComment>
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
      <Container>
        {data?.comments.map((item) => {
          return (
            <Comment>
              <Row>
                <Col md={2} xl={2} sm={2} lg={2}>
                  <SmallText>{item.user}</SmallText>
                </Col>
                <Col md={3} xl={3} sm={3} lg={3}>
                  <SmallText>{item.time_ago}</SmallText>
                </Col>
                <Col md={1} xl={1} sm={1} col={1}>
                  <LinkInnerComment
                    onClick={() => {
                      handlerClick(item.id, true);
                    }}
                  >
                    {item.comments_count > 1 ? "[+]" : ""}
                  </LinkInnerComment>
                </Col>
              </Row>
              <Row>{getContent(item.content)}</Row>
              <Row>
                {comment?.[item.id] === true ? (
                  getInnerComments(item, item.level + 1)
                ) : (
                  <></>
                )}
              </Row>
            </Comment>
          );
        })}
      </Container>
    </Container>
  );
};

export default Comments;
