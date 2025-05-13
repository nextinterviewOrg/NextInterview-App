import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ApproachContainer,
  QuestionCard,
  QuestionTitle,
} from "./CaseStudy.styles";

const questions = [
  {
    id: 1,
    title: "This is Case Study?",
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

const CaseStudy = () => {
  const navigate = useNavigate();

  const handleQuestionClick = (id) => {
    navigate(`/user/challenges/casestudy/${id}`);
  };

  return (
    <ApproachContainer>
      {questions.map((q) => (
        <QuestionCard key={q.id} onClick={() => handleQuestionClick(q.id)}>
          <QuestionTitle>{q.title}</QuestionTitle>
        </QuestionCard>
      ))}
    </ApproachContainer>
  );
};

export default CaseStudy;
