import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  QuestionPageContainer,
  SelectedQuestionTitle,
  Textarea,
  SubmitButton,
  BackButton,
} from "./SingleLine.styles";

const singlequestions = [
  {
    id: 1,
    title: "This is Single line question?",
    fullText: "Explain the reasons why React is widely adopted for frontend development.",
  },
  {
    id: 2,
    title: "Difference between var, let, and const",
    fullText: "Discuss the differences between var, let, and const in JavaScript with examples.",
  },
  {
    id: 3,
    title: "What is Closure in JS?",
    fullText: "Describe closures in JavaScript and provide a practical use case.",
  },
];

const SinglelineQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = singlequestions.find((q) => q.id === parseInt(id));
  const [userAnswer, setUserAnswer] = useState("");

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <QuestionPageContainer>
      <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      <SelectedQuestionTitle>{question.title}</SelectedQuestionTitle>
      <p>{question.fullText}</p>
      <Textarea
        rows="12"
        placeholder="Type your answer..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
        <SubmitButton onClick={() => alert("Answer Submitted!")}>Submit</SubmitButton>
      </div>
    </QuestionPageContainer>
  );
};

export default SinglelineQuestion;
