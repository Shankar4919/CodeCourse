import { Typography } from "antd";
import React from "react";

const {Title}=Typography;

const Index = () => {
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Hello World</h1>
      <p className="text-center">From next js</p>
      <Title>Hello</Title>
    </>
  );
};

export default Index;
