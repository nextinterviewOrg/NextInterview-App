import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChallengeById } from "../../../../api/challengesApi";
import {
  Card,
  Tag,
  Button,
  Footer,
  TextInput,
  TextArea,
  OptionWrapper,
  BackButton,
  SolutionBox,
  SolutionAnswer,
  SolutionText,
  QusnType,
  QusnText,
  QusnDifficulty,
} from "./NewChallenges.style";
import amazon from "../../../../assets/Avatar.svg";
import flipkart from "../../../../assets/PersonPhoto.svg";
import google from "../../../../assets/image.svg";
import { IoChevronBackSharp } from "react-icons/io5";
import {
  submitUserChallengeProgress,
  getPastChallengesNextQuestion,
  getTodayChallengesNextQuestion,
} from "../../../../api/challengesApi";
import { getUserByClerkId } from "../../../../api/userApi";
import { useUser } from "@clerk/clerk-react";

const EXTERNAL_API_BASE = "https://nextinterview.ai/fastapi/approach";
const NewChallenge = () => {
  const { id, past } = useParams();
  const { user } = useUser();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate();
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await getChallengeById(id);
        console.log("Fetched challenge:", response);
        setChallenge(response.data);
      } catch (err) {
        console.error("Error fetching challenge:", err);
        setError("Failed to load challenge data.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleNextQuestion = async () => {
    try {
      const { data: { user: { _id: userId } = {} } = {} } =
        await getUserByClerkId(user.id);

      console.log("User ID:", userId);
      console.log("Challenge ID:", challenge._id);
      const questionId = challenge._id;

      const apiCall =
        past === "true"
          ? getPastChallengesNextQuestion
          : getTodayChallengesNextQuestion;

      const result = await apiCall(userId, questionId);
      console.log("Next‑question API result →", result);
      
      // Reset all states for new question
      setShowSolution(false);
      setShowFeedback(false);
      setTextAnswer("");
      setFeedbackData(null);

      const nextId = result?.nextQuestion?._id;
      console.log("Next question id →", nextId);
      if (result?.success && nextId) {
        navigate(`/user/challengeInfo/${nextId}/${past}`);
      } else {
        alert("No more questions available.");
      }
    } catch (err) {
      console.error("Failed to fetch next question", err);
      alert("Unable to load next question.");
    }
  };

  if (loading)
    return <div style={{ textAlign: "center" }}>Loading challenge...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const handleGoBack = () => {
    navigate(`/user/challenges`);
  };

  const handleStartChallenge = () => {
    navigate(`/user/takeChallenge/${id}`);
  };

 

  const renderInput = () => {
    const type = challenge?.question_type?.trim().toLowerCase();
    console.log("Question Type:", type);
     console.log("Question difficulty:", challenge?.difficulty);

    switch (type) {
      case "mcq": {
        const options = [
          "option_a",
          "option_b",
          "option_c",
          "option_d",
          "option_e",
        ]
          .map((key) => challenge[key])
          .filter(Boolean);
        return options.map((option, index) => (
          <OptionWrapper key={index}>
            <label>
              <input
                type="radio"
                name="mcq"
                value={option}
                checked={textAnswer === option}
                disabled={showSolution}
                onChange={(e) => setTextAnswer(e.target.value)}
              />{" "}
              {option}
            </label>
          </OptionWrapper>
        ));
      }

      case "single-line":
        return (
          <TextInput
            type="text"
            placeholder="Type your answer..."
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={showSolution}
          />
        );

      case "multi-line":
        return (
          <TextArea
            placeholder="Type your response..."
            rows={4}
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={showSolution}
          />
        );

      case "approach":
        return (
          <TextArea
            placeholder="Type your response..."
            rows={4}
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={showSolution}
          />
        );
      case "case-study":
        return (
          <TextArea
            placeholder="Type your response..."
            rows={4}
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={showSolution}
          />
        );

      case "coding":
        return (
          <>
            <p>
              <strong>Description:</strong>
            </p>
            <div
              style={{ marginBottom: "12px" }}
              dangerouslySetInnerHTML={{ __html: challenge?.description }}
            />
            <hr className="hrtag" />
            <h4>Topics Covered:</h4>
            <ul>
              {challenge.topics?.map((topic, idx) => (
                <li key={idx}>{topic.topic_name}</li>
              ))}
            </ul>
            <Button
              style={{ marginTop: "10px" }}
              onClick={() => handleStartChallenge()}
              disabled={showSolution}
            >
              Try Coding
            </Button>
          </>
        );

      default:
        console.warn("Unsupported or unexpected question type:", type);
        return (
          <div style={{ marginTop: "1rem" }}>
            Unsupported or missing question type.
          </div>
        );
    }
  };

  const handleSolutionClick = async () => {
    if (showSolution) {
      handleNextQuestion(challenge._id);
      return;
    }

    if (!textAnswer.trim()) {
      setError("Please provide an answer before viewing the solution.");
      return;
    }

    const userRes = await getUserByClerkId(user.id);
    console.log("User response from getUserByClerkId:", userRes);
    const userId = userRes?.data?.user?._id;

    if (!userId) {
      setError("User not found. Please log in again.");
      return;
    }

    try {
      const payload = {
        userId: userId,
        questionId: challenge._id,
        question_type: challenge.question_type,
        answer: textAnswer,
        finalResult: true,
        skip: false,
      };
      if (challenge.question_type === "mcq") {
        const options = [
          "option_a",
          "option_b",
          "option_c",
          "option_d",
          "option_e",
        ]
          .map((key) => challenge[key])
          .filter(Boolean);

        const optionIndex = options.findIndex(
          (option) => option === textAnswer
        );

        const optionMap = [
          "option_a",
          "option_b",
          "option_c",
          "option_d",
          "option_e",
        ];
        if (optionIndex !== -1) {
          payload.answer = optionMap[optionIndex];
          payload.choosen_option = optionMap[optionIndex];
        }
      }

      console.log("Submitting user challenge progress with payload:", payload);

      const response = await submitUserChallengeProgress(payload);
      console.log("Response from submitUserChallengeProgress:", response);

      if (response?.data && response.data._id) {
        console.log("Answer submitted successfully:", response.data);
        setShowSolution(true);
        setError(null);
      } else {
        console.error("Unexpected response structure:", response.data);
        setError("Unexpected response. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError(
        "An error occurred while submitting your answer. Please try again."
      );
    }
  };

  const handleGetFeedbackClick = async () => {
    if (!textAnswer.trim()) {
      setError("Please provide an answer before getting feedback.");
      return;
    }

    setFeedbackLoading(true);
    const userData = await getUserByClerkId(user?.id);
    const userId = userData?.data?.user?._id;
    const challengeId = challenge._id;

    try {
      const res = await fetch(`${EXTERNAL_API_BASE}/analyze-approach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: challenge.QuestionText ?? "",
          user_answer: textAnswer,
          user_id: userId,
          question_id: challengeId
        }),
      });

      const data = await res.json();
      console.log("Feedback data:", data);

      if (!res.ok) {
        const msg =
          Array.isArray(data.detail) && data.detail.length
            ? `${data.detail[0].loc.join(".")}: ${data.detail[0].msg}`
            : "Unexpected server error.";
        setError(msg);
        return;
      }

      setFeedbackData(data);
      setShowFeedback(true);
      setError(null);
      
      // Submit the answer to our backend
      const payload = {
        userId: userId,
        questionId: challenge._id,
        question_type: challenge.question_type,
        answer: textAnswer,
        finalResult: true,
        skip: false,
      };
      await submitUserChallengeProgress(payload);
      
    } catch (err) {
      console.error("Error getting feedback:", err);
      setError("Network error. Please try again.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  const isToday = (dateString) => {
    const today = new Date();
    const challengeDate = new Date(dateString);

    return (
      today.getFullYear() === challengeDate.getFullYear() &&
      today.getMonth() === challengeDate.getMonth() &&
      today.getDate() === challengeDate.getDate()
    );
  };

  return (
    <>
      <BackButton onClick={() => handleGoBack()}>
        <IoChevronBackSharp /> Back
      </BackButton>

      <Card>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Tag>
            {isToday(challenge.createdAt)
              ? "# Today's Challenge"
              : "# Past Challenge"} &nbsp;
              {challenge.serialNo}
          </Tag>
        </div>
        <QusnType>
          <QusnText>{challenge.QuestionText}</QusnText>
          <QusnDifficulty difficulty={challenge.difficulty}>{challenge.difficulty}</QusnDifficulty>
        </QusnType>
        {renderInput()}

        {["multi-line", "mcq", "single-line"].includes(
          challenge.question_type
        ) && (
            <>
              {showSolution && (
                <SolutionBox>
                  <SolutionText>Solution:</SolutionText>
                  <SolutionAnswer>
                    {challenge.question_type === "mcq" ? (
                      <span>{challenge[challenge.correct_option]}</span>
                    ) : (
                      <span>{challenge.answer || "No solution provided."}</span>
                    )}
                  </SolutionAnswer>
                </SolutionBox>
              )}
            </>
          )}

        {(challenge.question_type === "approach" || challenge.question_type === "case-study") && showFeedback && (
          <SolutionBox>
            <SolutionText>Feedback:</SolutionText>
            {feedbackData ? (
              <>
                <SolutionAnswer>
                  <strong>Feedback:</strong>{" "}
                  {feedbackData.feedback || "No feedback provided."}
                </SolutionAnswer>
                <SolutionAnswer>
                  <strong>Strengths:</strong>{" "}
                  {Array.isArray(feedbackData.strengths) &&
                    feedbackData.strengths.length > 0
                    ? feedbackData.strengths.join(", ")
                    : "No strengths identified."}
                </SolutionAnswer>
                <SolutionAnswer>
                  <strong>Areas for Improvement:</strong>{" "}
                  {Array.isArray(feedbackData.areas_for_improvement) &&
                    feedbackData.areas_for_improvement.length > 0
                    ? feedbackData.areas_for_improvement.join(", ")
                    : "No improvement areas identified."}
                </SolutionAnswer>
                <SolutionAnswer>
                  <strong>Score:</strong>{" "}
                  {typeof feedbackData.score === "number"
                    ? feedbackData.score
                    : "N/A"}{" "}
                  / 10
                </SolutionAnswer>
              </>
            ) : (
              <SolutionAnswer>No feedback available.</SolutionAnswer>
            )}
          </SolutionBox>
        )}

        {(challenge.question_type === "approach" || challenge.question_type === "case-study") && showSolution && (
          <SolutionBox>
            <SolutionText>Solution:</SolutionText>
            <SolutionAnswer>
              {challenge.answer || "No solution provided."}
            </SolutionAnswer>
          </SolutionBox>
        )}

        <Footer>
          {/* ――― Non‑coding, non‑approach questions ――― */}
          {!showSolution &&
            !["coding", "approach", "case-study"].includes(challenge.question_type) && (
              <Button
                onClick={handleSolutionClick}
                disabled={!textAnswer.trim()}
              >
                Show Solution
              </Button>
            )}

          {showSolution &&
            !["coding", "approach", "case-study"].includes(challenge.question_type) && (
              <Button onClick={() => handleNextQuestion(challenge._id)}>
                Next Question
              </Button>
            )}

          {/* ――― Approach and Case Study questions ――― */}
          {!showFeedback && !showSolution &&
            (challenge.question_type === "approach" || challenge.question_type === "case-study") && (
              <Button
                onClick={handleGetFeedbackClick}
                disabled={!textAnswer.trim() || feedbackLoading}
              >
                {feedbackLoading ? "Getting feedback..." : "Get Feedback"}
              </Button>
            )}

          {showFeedback && !showSolution &&
            (challenge.question_type === "approach" || challenge.question_type === "case-study") && (
              <Button
                onClick={() => setShowSolution(true)}
              >
                Show Solution
              </Button>
            )}

          {showSolution && 
            (challenge.question_type === "approach" || challenge.question_type === "case-study") && (
              <Button onClick={() => handleNextQuestion(challenge._id)}>
                Next Question
              </Button>
            )}
        </Footer>
      </Card>
    </>
  );
};

export default NewChallenge;