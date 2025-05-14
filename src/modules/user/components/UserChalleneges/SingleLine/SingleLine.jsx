import React, { useEffect, useState } from "react";
import {
  ApproachContainer,
  QuestionCard,
  QuestionTitle,
  Textarea,
  SubmitButton,
} from "./SingleLine.styles";
import {
  getTodaysUserChallenges,
  submitUserChallengeProgress,
} from "../../../../../api/challengesApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../../api/userApi";
import { message } from "antd";
import { FaPlus, FaCheckCircle } from "react-icons/fa";

const SingleLine = () => {
  const { user } = useUser();
  const [questions, setQuestions] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [userAnswerMap, setUserAnswerMap] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ─────────────────── Fetch questions once user is known ────────────── */
  useEffect(() => {
    if (!user?.id) return;

    const fetchQuestions = async () => {
      try {
        const { data: userData } = await getUserByClerkId(user.id);
        const internalUserId = userData.user._id;
        setUserId(internalUserId);

        const res = await getTodaysUserChallenges(
          internalUserId,
          "single-line",
        );

        setQuestions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error loading questions:", err);
        message.error(err.message || "Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [user?.id]);

  /* ─────────────────── Helpers ─────────────────── */
  const handleAnswerChange = (id, value) =>
    setUserAnswerMap((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = async (question) => {
    const answer = userAnswerMap[question._id];
    if (!answer || !answer.trim()) {
      message.warning("Please enter an answer before submitting.");
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

      // Auto-open next question
      const currentIdx = questions.findIndex((q) => q._id === question._id);
      setExpandedId(questions[currentIdx + 1]?._id ?? null);
    } catch (err) {
      console.error("Submission failed:", err);
      message.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting((prev) => ({ ...prev, [question._id]: false }));
    }
  };

  /* ─────────────────── UI ─────────────────── */
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
              onClick={() => setExpandedId(isExpanded ? null : q._id)}
            >
              <QuestionTitle>{q.QuestionText}</QuestionTitle>
              {isExpanded ? <FaCheckCircle color="#4caf50" /> : <FaPlus />}
            </div>

            {isExpanded && (
              <>
                <Textarea
                  rows={10}
                  placeholder="Type your answer here…"
                  value={userAnswerMap[q._id] || ""}
                  onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "1rem",
                  }}
                >
                  <SubmitButton
                    onClick={() => handleSubmit(q)}
                    disabled={submitting[q._id]}
                  >
                    {submitting[q._id] ? "Submitting…" : "Submit"}
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

export default SingleLine;
