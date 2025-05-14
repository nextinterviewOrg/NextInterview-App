import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  QuestionPageContainer,
  SelectedQuestionTitle,
  Textarea,
  SubmitButton,
  BackButton,
} from "./SingleLine.styles";
import {
  getChallengeById,
  submitUserChallengeProgress,
} from "../../../../../api/challengesApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../../api/userApi";
import { message } from "antd";

const SinglelineQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch internal user ID
        const userData = await getUserByClerkId(user.id);
        const internalUserId = userData.data.user._id;
        setUserId(internalUserId);

        // Fetch challenge data
        const challengeData = await getChallengeById(id);
        const q = challengeData.data;
        setQuestion(q);

        // Check if already submitted
        const userProgress = q?.progress?.find(
          (entry) => entry.userId === internalUserId
        );

        if (userProgress) {
          setAlreadySubmitted(true);
          setUserAnswer(userProgress.answer || "");
        }
      } catch (err) {
        console.error("Failed to fetch question or user:", err);
        message.error("Failed to load question.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user.id]);

  const handleSubmit = async () => {
    if (!userAnswer.trim()) {
      message.warning("Please enter an answer before submitting.");
      return;
    }
  
    if (!userId || !question?._id) {
      message.warning("User or question not loaded yet.");
      return;
    }
  
    try {
      setSubmitLoading(true);
  
      const payload = {
        questionId: question._id,
        userId: userId,
        answer: userAnswer,
        skip: false,
        finalResult: true, // You can update this to be evaluated dynamically if needed
      };
  
      const res = await submitUserChallengeProgress(payload);
      console.log("Submission response:", res);
  
      message.success("Answer submitted successfully!");
      setAlreadySubmitted(true);
      setTimeout(() => navigate(`/user/challenges`), 1500);
    } catch (err) {
      console.error("Submission error:", err);
      message.error("❌ Failed to submit. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };
  

  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;
  if (!question) return <div>Question not found</div>;

  return (
    <QuestionPageContainer>
      <BackButton onClick={() => navigate(-1)}>Back</BackButton>

      <SelectedQuestionTitle>
        {question.QuestionText || "Untitled Question"}
      </SelectedQuestionTitle>
      <p>{question.description || question.answer || "No additional details provided."}</p>

      <Textarea
        rows="12"
        placeholder="Type your answer..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        disabled={alreadySubmitted}
      />

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
       
        <SubmitButton onClick={handleSubmit} disabled={submitLoading || alreadySubmitted}>
          {submitLoading ? "Submitting..." : "Submit"}
        </SubmitButton>
      </div>
    </QuestionPageContainer>
  );
};

export default SinglelineQuestion;
