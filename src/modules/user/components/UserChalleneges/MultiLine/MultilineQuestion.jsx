import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  QuestionPageContainer,
  SelectedQuestionTitle,
  Textarea,
  SubmitButton,
  BackButton,
} from "./MultiLine.styles";

import { getChallengeById, submitUserChallengeProgress } from "../../../../../api/challengesApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../../api/userApi";
import { message } from "antd"; // Optional, for user-friendly feedback

const MultilineQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [question, setQuestion] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestionAndUser = async () => {
      try {
        const [userData, questionRes] = await Promise.all([
          getUserByClerkId(user.id),
          getChallengeById(id),
        ]);

        const internalUserId = userData.data.user._id;
        setUserId(internalUserId);
        setQuestion(questionRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load question or user.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndUser();
  }, [id, user.id]);

  const handleSubmit = async () => {
    if (!userAnswer.trim()) {
      message.warning("Please type an answer before submitting.");
      return;
    }

    if (!question?._id || !userId) {
      message.error("User or question not loaded.");
      return;
    }

    const payload = {
      questionId: question._id,
      userId: userId,
      answer: userAnswer,
      finalResult: true, // For now assuming true. Evaluate on server ideally.
      skip: false,
    };

    try {
      setSubmitting(true);
      const result = await submitUserChallengeProgress(payload);
      message.success("Answer submitted successfully!");
      console.log("Submission Result:", result);

      setTimeout(() => navigate("/user/challenges"), 1500); // Navigate after short delay
    } catch (err) {
      console.error("Submission failed:", err);
      message.error("Failed to submit your answer.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading question...</div>;
  if (error) return <div>{error}</div>;
  if (!question) return <div>Question not found</div>;

  return (
    <QuestionPageContainer>
      <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      <SelectedQuestionTitle>{question.QuestionText}</SelectedQuestionTitle>
      <p>{question.description || question.answer || "No additional details provided."}</p>

      <Textarea
        rows="12"
        placeholder="Type your answer..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        disabled={submitting}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
        <SubmitButton onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </SubmitButton>
      </div>
    </QuestionPageContainer>
  );
};

export default MultilineQuestion;
