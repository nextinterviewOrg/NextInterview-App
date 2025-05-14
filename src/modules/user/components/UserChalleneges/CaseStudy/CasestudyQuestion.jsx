import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  QuestionPageContainer,
  SelectedQuestionTitle,
  Textarea,
  SubmitButton,
  BackButton,
} from "./CaseStudy.styles";
import { getChallengeById, submitUserChallengeProgress } from "../../../../../api/challengesApi";
import { getUserByClerkId } from "../../../../../api/userApi";
import { useUser } from "@clerk/clerk-react";
import { message } from "antd";

const CasestudyQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const userData = await getUserByClerkId(user.id);
        const internalUserId = userData.data.user._id;
        setUserId(internalUserId);

        const response = await getChallengeById(id);
        setQuestion(response.data);
      } catch (err) {
        console.error("Failed to fetch case study question:", err);
        setQuestion(null);
        message.error("Failed to load question.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id, user.id]);

  const handleSubmit = async () => {
    if (!userAnswer.trim()) {
      message.warning("Please type your answer before submitting.");
      return;
    }

    if (!userId || !question?._id) {
      message.error("User or question data not loaded.");
      return;
    }

    try {
      setSubmitLoading(true);

      const payload = {
        questionId: question._id,
        userId: userId,
        answer: userAnswer,
        finalResult: true, // Optional: set to false if answer evaluation is manual
        skip: false,
      };

      const response = await submitUserChallengeProgress(payload);
      console.log("Submission successful:", response);

      message.success("Answer submitted successfully!");
      setTimeout(() => navigate("/user/challenges"), 1500);
    } catch (err) {
      console.error("Submission failed:", err);
      message.error("Failed to submit answer. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <div>Loading question...</div>;
  if (!question) return <div>Question not found</div>;

  return (
    <QuestionPageContainer>
      <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      <SelectedQuestionTitle>{question.QuestionText || "Untitled Case Study"}</SelectedQuestionTitle>
      <p>{question.description || question.answer || "No additional context provided."}</p>

      <Textarea
        rows="12"
        placeholder="Type your answer..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
        <SubmitButton onClick={handleSubmit} disabled={submitLoading}>
          {submitLoading ? "Submitting..." : "Submit"}
        </SubmitButton>
      </div>
    </QuestionPageContainer>
  );
};

export default CasestudyQuestion;
