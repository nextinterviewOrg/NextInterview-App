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

const EXTERNAL_API_BASE =
  "https://f9ma89kmrg.execute-api.ap-south-1.amazonaws.com/default/mock-interview-api";
 

const ApproachAnalysis = () => {
  const { user } = useUser();
  const [questions, setQuestions] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiFeedback, setApiFeedback] = useState({});

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
      }finally{
        setLoading(false);
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

      const response = await fetch(`${EXTERNAL_API_BASE}/analyze-approach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: userId,
          user_answer: answer,
          question: question.QuestionText,
          question_id: question._id,
        }),
      });

      const payload = {
        questionId: question._id,
        userId,
        answer,
        finalResult: true,
        skip: false,
      };

      if (!response.ok) {
        if (response.status === 404) setError("Session not found.");
        else if (response.status === 422)
          setError("Invalid input. Please try again.");
        else setError("Server error. Please try again later.");
        setSubmitting((prev) => ({ ...prev, [question._id]: false }));
        return;
      }
      const data = await response.json();
      setApiFeedback((prev) => ({ ...prev, [question._id]: data }));

      await submitUserChallengeProgress(payload);
      message.success("Answer submitted successfully!");
    } catch (err) {
      console.error("Submission error:", err);
      message.error("Failed to submit answer. Please try again.");
    } finally {
      setSubmitting((prev) => ({ ...prev, [question._id]: false }));
    }
  };

    if(loading){
      return (
        <ApproachContainer style={{ textAlign: "center", padding: "2rem 0" }}>
          <p style={{ fontSize: "1.1rem", opacity: 0.7 }}>
            Loading questions...
          </p>
        </ApproachContainer>
      );
    }

   if (questions.length === 0) {
      return (
        <ApproachContainer style={{ textAlign: "center", padding: "2rem 0" }}>
          <p style={{ fontSize: "1.1rem", opacity: 0.7 }}>
            No questions found for today&nbsp;🎉
          </p>
        </ApproachContainer>
      );
    }

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
                {apiFeedback[q._id] && (
                  <div style={{
                    background: '#f5f7fa',
                    border: '1px solid #dbeafe',
                    borderRadius: '8px',
                    marginTop: '1.5rem',
                    padding: '1rem',
                    color: '#222',
                  }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>Approach Analysis Feedback</h4>
                    <div>
                    {typeof apiFeedback[q._id].score !== 'undefined' && (
                      <div>
                        <strong>Your Score:</strong> <span style={{ color: '#388e3c', fontWeight: 600 }}>{apiFeedback[q._id].score}</span>
                      </div>
                    )}
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>Feedback:</strong>
                      <div style={{ marginLeft: '0.5rem', marginTop: '0.2rem' }}>{apiFeedback[q._id].feedback}</div>
                    </div>
                    {Array.isArray(apiFeedback[q._id].strengths) && apiFeedback[q._id].strengths.length > 0 && (
                      <div style={{ marginBottom: '0.5rem' }}>
                        <strong>Strengths:</strong>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                          {apiFeedback[q._id].strengths.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {Array.isArray(apiFeedback[q._id].areas_for_improvement) && apiFeedback[q._id].areas_for_improvement.length > 0 && (
                      <div style={{ marginBottom: '0.5rem' }}>
                        <strong>Areas for Improvement:</strong>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                          {apiFeedback[q._id].areas_for_improvement.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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

export default ApproachAnalysis;
