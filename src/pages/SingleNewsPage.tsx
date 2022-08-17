import React, { useEffect, useState } from "react";
import { FeedItem, ICompare, Item } from "../types/types";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const SingleNewsPage = () => {
  const LinkInnerComment = styled.a`
    text-decoration: none;
    cursor: pointer;
    color: gray;
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
  const [innerComments, setInnerComments] = useState<Item[]>([]);
  const [indexComment, setIndexComment] = useState(0);
  const [data, setData] = useState<Item>();

  useEffect(() => {
    getItem();
  }, []);

  async function getItem() {
    try {
      const href = window.location.pathname.split("/");
      const response = await axios.get<Item>(
        `https://api.hnpwa.com/v0/item/${parseInt(href[href.length - 1])}.json`
      );
      setData(response.data);
    } catch (e) {
      alert(e);
    }
  }
  const handlerClick = (innerComment: Item[], index: number) => {
    setInnerComments(innerComment);
    setIndexComment(index);
  };

  const getContent: (code: string) => string = (code: string) => {
    const tag = document.createElement("div");
    tag.innerHTML = code;
    return tag.textContent as string;
  };

  return (
    <Container>
      <Container>
        <Row>
          <Col md={6}>
            <TitleHeader href={data?.url}>{data?.title}</TitleHeader>
          </Col>
          <Col md={4}>
            <LinkInnerComment href={data?.url}>
              ({data?.domain})
            </LinkInnerComment>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <SmallText>Author: {data?.user}</SmallText>
          </Col>
          <Col md={2}>
            <SmallText>Comments: {data?.comments_count}</SmallText>
          </Col>
        </Row>
      </Container>
      <Container>
        {data?.comments.map((comment, index) => {
          return (
            <Comment>
              <Row>
                <Col md={1}>
                  <SmallText>{comment.user}</SmallText>
                </Col>
                <Col md={2}>
                  <SmallText>{comment.time_ago}</SmallText>
                </Col>
                <Col md={1}>
                  <LinkInnerComment
                    onClick={() => {
                      handlerClick(comment.comments, index);
                    }}
                  >
                    {comment.comments_count > 1 ? "[+]" : ""}
                  </LinkInnerComment>
                </Col>
              </Row>
              <Row>{getContent(comment.content)}</Row>
              <Row>
                {innerComments.map((innerComment, innerIndex) => {
                  if (index != indexComment) {
                    return;
                  }
                  return (
                    <InnerComment>
                      <Row>
                        <Col md={1}>
                          <SmallText>{innerComment.user}</SmallText>
                        </Col>
                        <Col md={2}>
                          <SmallText>{innerComment.time_ago}</SmallText>
                        </Col>
                        <Col md={1}>
                          <LinkInnerComment
                            onClick={() => {
                              handlerClick(innerComment.comments, innerIndex);
                            }}
                          >
                            {innerComment.comments_count > 1 ? "[+]" : ""}
                          </LinkInnerComment>
                        </Col>
                      </Row>
                      <Row>{getContent(innerComment.content)}</Row>
                    </InnerComment>
                  );
                })}
              </Row>
            </Comment>
          );
        })}
      </Container>
    </Container>
  );
};

export default SingleNewsPage;
