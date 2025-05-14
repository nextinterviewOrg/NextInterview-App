import React, { useEffect, useState } from "react";
import { message } from "antd";
import {
  ApproachContainer,
  QuestionCard,
  QuestionTitle,
  Textarea,
  SubmitButton,
} from "./MultiLine.styles";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../../api/userApi";
import {
  getTodaysUserChallenges,
  submitUserChallengeProgress,
} from "../../../../../api/challengesApi";
import { FaPlus, FaCheckCircle } from "react-icons/fa";

const MultiLine = () => {
  const { user } = useUser();
  const [questions, setQuestions] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const userData = await getUserByClerkId(user.id);
        const uid = userData.data.user._id;
        setUserId(uid);

        const response = await getTodaysUserChallenges(uid, "multi-line");
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
        } else {
          throw new Error("Invalid response format from API");
        }
      } catch (err) {
        console.error("Failed to fetch multi-line questions:", err);
        setError(err.message || "Error loading questions");
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
      message.error("User not identified.");
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

      // Store submitted answer
      setSubmittedAnswers((prev) => ({ ...prev, [question._id]: answer }));

      // Move to next question
      const currentIndex = questions.findIndex((q) => q._id === question._id);
      const nextQuestion = questions[currentIndex + 1];
      if (nextQuestion) {
        setExpandedId(nextQuestion._id);
      } else {
        setExpandedId(null); // No more questions
      }
    } catch (err) {
      console.error("Submission error:", err);
      message.error("Failed to submit answer.");
    } finally {
      setSubmitting((prev) => ({ ...prev, [question._id]: false }));
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <ApproachContainer>
      {questions.map((q) => {
        const isExpanded = expandedId === q._id;
        const hasSubmitted = submittedAnswers[q._id];

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
              <QuestionTitle>{q.QuestionText}</QuestionTitle>
              {isExpanded || hasSubmitted ? <FaCheckCircle color="#4caf50" /> : <FaPlus />}
            </div>

            {(isExpanded || hasSubmitted) && (
              <>
                {!hasSubmitted && (
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

                {hasSubmitted && (
                  <div style={{ marginTop: "1rem" }}>
                    <label style={{ fontWeight: "bold" }}>Your Submitted Answer:</label>
                    <Textarea
                      rows={6}
                      value={submittedAnswers[q._id]}
                      readOnly
                      style={{
                        backgroundColor: "#f9f9f9",
                        marginTop: "0.5rem",
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </QuestionCard>
        );
      })}
    </ApproachContainer>
  );
};

export default MultiLine;
