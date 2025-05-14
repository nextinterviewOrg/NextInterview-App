import React, { useEffect, useState } from "react";
import {
  MCQContainer,
  QuestionBlock,
  QuestionText,
  OptionLabel,
  RadioInput,
  SubmitButton,
  Title,
} from "./MCQ.styles";
import { getTodaysUserChallenges, submitUserChallengeProgress } from "../../../../../api/challengesApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../../api/userApi";
import { message } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MCQ = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMCQs = async () => {
      try {
        const userData = await getUserByClerkId(user.id);
        const uid = userData.data.user._id;
        setUserId(uid);

        const response = await getTodaysUserChallenges(uid, "mcq");
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
        } else {
          throw new Error("Unexpected MCQ data format");
        }
      } catch (err) {
        console.error("Error fetching MCQs:", err);
        message.error("Failed to load MCQ questions.");
      }
    };

    fetchMCQs();
  }, [user.id]);

  const handleChange = (questionId, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    try {
      for (const question of questions) {
        const userAnswer = selectedAnswers[question._id];
        if (!userAnswer) continue;

        const payload = {
          questionId: question._id,
          userId,
          choosen_option: userAnswer,
          finalResult: userAnswer === question[question.answer], // e.g., "option_a" = "React"
          skip: false,
        };

        await submitUserChallengeProgress(payload);
        console.log("Submission successful:", payload);
      }

      setSubmitted(true);
      message.success("Answers submitted successfully!");
      setTimeout(() => navigate("/user/challenges"), 1500);
    } catch (err) {
      console.error("Submission error:", err);
      message.error("Failed to submit answers. Please try again.");
    }
  };

  return (
    <MCQContainer>
      <Title>MCQ Questions</Title>

      {questions.map((q) => (
        <QuestionBlock key={q._id}>
          <QuestionText>{q.QuestionText}</QuestionText>

          {["option_a", "option_b", "option_c", "option_d"].map((optKey) => {
            const optVal = q[optKey];
            return (
              <OptionLabel key={optKey}>
                <RadioInput
                  type="radio"
                  name={`question-${q._id}`}
                  value={optVal}
                  checked={selectedAnswers[q._id] === optVal}
                  onChange={() => handleChange(q._id, optVal)}
                  disabled={submitted}
                />
                {optVal}
              </OptionLabel>
            );
          })}

          {submitted && (
            <div style={{ marginTop: "10px" }}>
              <label style={{ fontWeight: "bold" }}>Correct Answer:</label>
              <textarea
                rows={2}
                style={{
                  width: "100%",
                  marginTop: "5px",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f9f9f9",
                  resize: "none",
                }}
                readOnly
                value={q[q.correct_option] || ""}
              />
            </div>
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
