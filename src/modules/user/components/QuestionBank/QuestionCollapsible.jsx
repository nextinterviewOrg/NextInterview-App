import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  BackButton,
  QuestionBox,
  QusnandType,
  QuestionText,
  DifficultyTag,
  Footer,
  Button,
  TryHarder,
  SolutionBox,
  SolutionAnswer,
  CodeMeta,
  CodeDescription,
  ViewMore,
  TopicsCovered,
  TopicItem,
  TryCodingButton,
  TextAnswer,
  SolutionText,
  HelpIcons,
  TextInput,
  Tag,
} from "./QuestionCollapsible.styles";
import { IoChevronBackSharp } from "react-icons/io5";
import { PiStarFour, PiThumbsUpLight, PiThumbsDownLight } from "react-icons/pi";
import {
  getQuestionBankById,
  tryHarderQuestionBank,
  markUserSubmission,
  getNextQuestion,
} from "../../../../api/questionBankApi";
import { getUserByClerkId } from "../../../../api/userApi";
import { useUser } from "@clerk/clerk-react";

const EXTERNAL_API_BASE =
  "https://nextinterview.ai/fastapi/approach";

const QuestionCollapsible = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [userId, setUserId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [textAnswer, setTextAnswer] = useState("");
  const [feedbackData, setFeedbackData] = useState(null);
  const [getFeedback, setGetFeedback] = useState(false);
  console.log("Question ID:", showSolution, id);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await getQuestionBankById(id);
        console.log("Response from getQuestionBankById:", response);
        if (response?.success && response.data) {
          const q = response.data;

          const options = [];
          if (q.question_type === "mcq") {
            if (q.option_a) options.push(q.option_a);
            if (q.option_b) options.push(q.option_b);
            if (q.option_c) options.push(q.option_c);
            if (q.option_d) options.push(q.option_d);
            if (q.option_e) options.push(q.option_e);
          }
          console.log("Options:", options);
          setQuestion({
            id: q._id,
            category: q.programming_language || "Other",
            difficulty: q.level
              ? q.level.charAt(0).toUpperCase() + q.level.slice(1)
              : "Easy",
            text: q.question || "Untitled",
            type: q.question_type,
            completed: q.attempted || false,
            description: q.description || "",
            longDescription: q.description || "",
            topics: q.topics?.map((t) => t.topic_name) || [],
            solution: q.output || "",
            option_a: q.option_a,
            option_b:q.option_b,
            option_c:q.option_c,
            option_d:q.option_d,
            options,
            moduleId: q.moduleId || q.module_code || "",
            correctOption: q.correct_option || "",
            answer: q.answer || "",
          });
          // if(q.question_type==="approach"){
          //     setGetFeedback(true);
          // }
          setShowSolution(false);
          setTextAnswer("");
          setShowMore(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching question:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchQuestion();
  }, [id]);

  const handleNextQuestion = async () => {
    try {
      const response = await getNextQuestion(question.id, question.categoryId); // pass both
      if (response?.success && response?.data?._id) {
        navigate(`/user/mainQuestionBank/questionbank/${response.data._id}`);
      } else {
        alert("No more questions available.");
      }
    } catch (error) {
      console.error("Error fetching next question:", error);
      alert("Unable to load next question.");
    }
  };

  const handleTryHarderQuestion = async () => {
    try {
      const response = await tryHarderQuestionBank({
        questionId: question.id,
        isTIYQuestion: false,
        isQBQuestion: true,
      });

      if (response?.success && response?.data?._id) {
        navigate(`/user/mainQuestionBank/questionbank/${response.data._id}`);
      } else {
        alert("No harder question found.");
      }
    } catch (error) {
      console.error("Error fetching harder question:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleSolutionButton = async () => {
    console.log("Show Solution:", showSolution,"getFeedback", getFeedback);
    if (showSolution) {
      handleNextQuestion();
      return;
    }

    if (question.type === "approach") {
      handleGetFeedbackClick();
      return;
    }

    if (!textAnswer.trim()) {
      alert("Please provide an answer before viewing the solution.");
      return;
    }

    const userData = await getUserByClerkId(user?.id);
    const userId = userData?.data?.user?._id;
    console.log("User ID:", userId);

    if (!userId || !question.moduleId) {
      alert("Unable to retrieve user or module information.");
      return;
    }

    try {
      const payload = {
        moduleId: question.moduleId, // You may want to make this dynamic
        userId: userId, // This should ideally come from auth/user context
        questionBankId: question.id,
        answer: textAnswer,
        question_type: question.type,
      };

      if (question.type === "mcq") {
        // This assumes that the options are mapped like option_a, option_b, etc.
        const optionIndex = question.options.findIndex(
          (opt) => opt === textAnswer
        );
        const optionMap = ["option_a", "option_b", "option_c", "option_d"];
        if (optionIndex !== -1) {
          payload.choosen_option = optionMap[optionIndex];
        }
      }

      console.log("Submitting payload:", payload);

      const response = await markUserSubmission(payload);
      console.log("Submission response:", response);

      if (response?.success) {
        setShowSolution(true);
      } else {
        alert("Failed to submit your answer. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit your answer. Please try again.");
    }
  };

  if (loading) return <Container>Loading...</Container>;
  if (error || !question) return <Container>Question not found</Container>;

  const renderInput = () => {
    switch (question.type) {
      case "coding":
        return (
          <>
            <CodeMeta
              dangerouslySetInnerHTML={{ __html: question.description }}
            ></CodeMeta>
                        <CodeDescription>
                            Description:
<p className={`description-text ${!showMore ? "clamped-text" : ""}`}>
  <span
    dangerouslySetInnerHTML={{
      __html: showMore
        ? question.longDescription
        : question.longDescription.split(/\s+/).slice(0, 50).join(" ") + "..."
    }}
  />
</p>

  {question.longDescription.split(/\s+/).length > 50 && (
    <ViewMore onClick={() => setShowMore(!showMore)}>
      {showMore ? 'View Less' : 'View More'}
    </ViewMore>
  )}
                        </CodeDescription>
            <TopicsCovered>
              <strong>Topics Covered</strong>
              <ul style={{ paddingLeft: 0 }}>
                {question.topics.map((topic, idx) => (
                  <TopicItem key={idx}>• {topic}</TopicItem>
                ))}
              </ul>
            </TopicsCovered>
            <TryCodingButton
              onClick={() =>
                navigate(`/user/mainQuestionBank/qbcodingpage/${question.id}`)
              }
            >
              Try Coding
            </TryCodingButton>
          </>
        );

      case "mcq":
        return (
          <div>
            {question.options.map((option, idx) => (
              <div key={idx} style={{ marginBottom: "8px" }}>
                <label>
                  <input
                    type="radio"
                    name="mcq"
                    value={option}
                    checked={textAnswer === option}
                    disabled={showSolution} // 🔒 Disable after submission
                    onChange={(e) => setTextAnswer(e.target.value)}
                  />{" "}
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case "single-line":
        return (
          <TextInput
            type="text"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={showSolution} // 🔒 Disable after submission
            placeholder="Type your answer here..."
          />
        );

      case "multi-line":
      case "approach":
      case "text":
      case "case-study":
        return (
          <TextAnswer
            as="textarea"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={showSolution} // 🔒 Disable after submission
            placeholder="Type your answer here..."
            rows={4}
          />
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  const handleGetFeedbackClick = async () => {
    console.log("this functionality is calling")
    if (!textAnswer.trim()) {
      setError("Please provide an answer before getting feedback.");
      return;
    }

    const userData = await getUserByClerkId(user?.id);
    const userId = userData?.data?.user?._id;
    console.log("User ID:", userId);
    console.log ("Question ID:", question.id);

    try {
      // optional spinner
      const res = await fetch(`${EXTERNAL_API_BASE}/analyze-approach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.text ?? "",
          user_answer: textAnswer,
          user_id: userId,
          question_id: question.id
        }),
      });

      const data = await res.json();
      console.log("data ejfhh", data);
      if (!res.ok) {
        // FastAPI validation errors come as { detail: [...] }
        const msg =
          Array.isArray(data.detail) && data.detail.length
            ? `${data.detail[0].loc.join(".")}: ${data.detail[0].msg}`
            : "Unexpected server error.";
        setError(msg);
        return;
      }
    
      setFeedbackData(data); // { feedback, strengths, areas_for_improvement, score }
      setShowSolution(true);
    } catch (err) {
      console.error("Error getting feedback:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackButton onClick={() => navigate(-1)}>
        <IoChevronBackSharp /> Back
      </BackButton>
      {/* <Tag>
        {question.type === "coding"
          ? `# ${question.category}`
          : `# ${question.type}`}
      </Tag> */}
      <Container>
        <QuestionBox>
          <QusnandType>
            <QuestionText>{question.text}</QuestionText>
            <DifficultyTag level={question.difficulty}>
              {question.difficulty}
            </DifficultyTag>
          </QusnandType>
          {renderInput()}
        </QuestionBox>

        {["text", "multi-line", "mcq", "single-line"].includes(question.type) &&
          showSolution && (
            <SolutionBox>
              <SolutionText>Solution:</SolutionText>
              <SolutionAnswer>
                {question.type === "mcq" ? (
                  <span>{question[question.correctOption]}</span>
                ) : (
                  <span>{question.answer}</span>
                )}
                {/* <HelpIcons>
                  <PiThumbsUpLight /> Helpful
                  <PiThumbsDownLight /> Not helpful
                </HelpIcons> */}
              </SolutionAnswer>
            </SolutionBox>
          )}

        {(question.type === "approach" || question.type === "case-study") && showSolution && (
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

        {["text", "multi-line", "approach", "mcq", "single-line", "case-study"].includes(
          question.type
        ) && (
          <Footer>
            <Button
              onClick={handleSolutionButton}
              disabled={
                !showSolution && // we’re still answering
                textAnswer.trim().length === 0 && // nothing typed
                question.type !== "approach" // “approach” may send empty → API will complain, so keep same guard
              }
            >
              {showSolution
                ? "Next question"
                : question.type === "approach"
                ? "Get Feedback"
                : "Show Solution"}
            </Button>
            <TryHarder onClick={handleTryHarderQuestion}>
              <PiStarFour /> Try harder question
            </TryHarder>
          </Footer>
        )}
      </Container>
    </>
  );
};

export default QuestionCollapsible;
