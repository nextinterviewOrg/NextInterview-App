import React, { useState } from "react";
import {
  Title,
  QuestionBox,
  Wrapper,
  BackIcon,
  Button,
  Header,
} from "./CodeEditorWindow.styles";
import { RxArrowLeft } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import ReadyToCode from "../Compiler/ReadyToCode";

const CodeEditorWindow = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/user/challengeInfo"); // Navigate back to the previous page
  };

  return (
    <Wrapper>
      <Header>
        <BackIcon
          onClick={handleGoBack}
          style={{
            borderRadius: "10%",
            border: "1px solid grey",
            padding: "8px",
          }}
        >
          <RxArrowLeft />
        </BackIcon>
        <Button>Submit</Button>
      </Header>
      <Title>Question Type - Coding</Title>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        <QuestionBox>
          Tesla is investigating production bottlenecks and they need your help
          to extract the relevant data. Write a query to determine which parts
          have begun the assembly process but are not yet finished. Assumptions:
          parts_assembly_table contains all parts currently in production, each
          at varying stages of the assembly process. An unfinished part is one
          that lacks a finish_date. This question is straightforward, so
          approach it with simplicity in both thinking and solution. Effective
          April 11th 2023, the problem statement and assumptions were updated to
          enhance clarity. Explanation The bumpers in step 3 and 4 are the only
          item that remains unfinished as it lacks a recorded finish date. The
          dataset you are querying against may have different input & output
          -this is just an example !
        </QuestionBox>
        <ReadyToCode style={{ width: "100%" }} />
      </div>
    </Wrapper>
  );
};

export default CodeEditorWindow;
