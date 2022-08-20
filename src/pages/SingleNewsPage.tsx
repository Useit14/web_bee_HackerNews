import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Comments from "../components/Comments";
import { ContextComments } from "../ContextData";

const SingleNewsPage = () => {
  const [comment, setComment] = useState({});
  return (
    <ContextComments.Provider value={{ comment, setComment }}>
      <Container>
        <Comments />
      </Container>
    </ContextComments.Provider>
  );
};

export default SingleNewsPage;
