import React from "react";
import Container from "react-bootstrap/Container";
import NewsItems from "../components/NewsItems";

const Home = () => {
  return (
    <Container className="bg-light">
      <NewsItems />
    </Container>
  );
};

export default Home;
