import React, { useEffect, useState } from "react";
import { message } from "antd";
import {
  ApproachContainer,
  QuestionCard,
  QuestionTitle,
  Textarea,
  SubmitButton,
} from "./ApproachAnalysis.styles";
import { getTodaysUserChallenges, submitUserChallengeProgress } from "../../../../../api/challengesApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../../api/userApi";
import { FaPlus, FaCheckCircle } from "react-icons/fa";

const ApproachAnalysis = () => {
  const { user } = useUser();
  const [questions, setQuestions] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const userData = await getUserByClerkId(user.id);
        const internalUserId = userData.data.user._id;
        setUserId(internalUserId);

        const response = await getTodaysUserChallenges(internalUserId, "approach");
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        message.error("Failed to load approach analysis questions");
      }
    };

    fetchQuestions();
  }, [user.id]);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (question) => {
    const answer = answers[question._id];
    if (!answer || !answer.trim()) {
      message.warning("Please enter an answer before submitting.");
      return;
    }

    if (!userId) {
      message.error("User ID not found.");
      return;
    }

    try {
      setSubmitting((prev) => ({ ...prev, [question._id]: true }));

      const payload = {
        questionId: question._id,
        userId,
        answer,
        finalResult: true,
        skip: false,
      };

      await submitUserChallengeProgress(payload);
      message.success("Answer submitted successfully!");
      const currentIndex = questions.findIndex((q) => q._id === question._id);
      const nextQuestion = questions[currentIndex + 1];
      if (nextQuestion) {
        setExpandedId(nextQuestion._id);
      } else {
        setExpandedId(null); // No more questions
      }
    } catch (err) {
      console.error("Submission error:", err);
      message.error("Failed to submit answer. Please try again.");
    } finally {
      setSubmitting((prev) => ({ ...prev, [question._id]: false }));
    }
  };

  return (
    <ApproachContainer>
      {questions.map((q) => {
        const isExpanded = expandedId === q._id;
        return (
          <QuestionCard key={q._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => handleToggle(q._id)}
            >
              <QuestionTitle>{q.QuestionText || "Untitled Question"}</QuestionTitle>
              {isExpanded ? <FaCheckCircle color="#4caf50" /> : <FaPlus />}
            </div>

            {isExpanded && (
              <>
               
                <Textarea
                  rows={10}
                  placeholder="Type your answer here..."
                  value={answers[q._id] || ""}
                  onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                  disabled={submitting[q._id]}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                  <SubmitButton
                    onClick={() => handleSubmit(q)}
                    disabled={submitting[q._id]}
                  >
                    {submitting[q._id] ? "Submitting..." : "Submit"}
                  </SubmitButton>
                </div>
              </>
            )}
          </QuestionCard>
        );
      })}
    </ApproachContainer>
  );
};

export default ApproachAnalysis;
