import { useState } from "react";
import {
  MCQContainer,
  QuestionBlock,
  QuestionText,
  OptionLabel,
  RadioInput,
  SubmitButton,
  ResultText,
  Title
} from "./MCQ.styles";

const mcqData = [
  {
    id: 1,
    question: "Which of the following is a JavaScript framework?",
    options: ["Laravel", "Django", "React", "Spring Boot"],
    answer: "React",
  },
  {
    id: 2,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    id: 3,
    question: "Which HTML tag is used to define an unordered list?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    answer: "<ul>",
  },
];

const MCQ = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (questionId, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <MCQContainer>
      <Title>MCQ Questions</Title>
      {mcqData.map((q) => (
        <QuestionBlock key={q.id}>
          <QuestionText>{q.question}</QuestionText>
          {q.options.map((opt) => (
            <OptionLabel key={opt}>
              <RadioInput
                type="radio"
                name={`question-${q.id}`}
                value={opt}
                checked={selectedAnswers[q.id] === opt}
                onChange={() => handleChange(q.id, opt)}
              />
              {opt}
            </OptionLabel>
          ))}
          {submitted && (
            <ResultText correct={selectedAnswers[q.id] === q.answer}>
              {selectedAnswers[q.id] === q.answer
                ? "✅ Correct!"
                : `❌ Incorrect! Correct answer: ${q.answer}`}
            </ResultText>
          )}
        </QuestionBlock>
      ))}
      {!submitted && (
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      )}
    </MCQContainer>
  );
};

export default MCQ;
