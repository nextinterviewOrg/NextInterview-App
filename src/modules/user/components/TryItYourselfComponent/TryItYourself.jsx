import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Content,
  QuestionHeader,
  Option,
  QuestionContainer,
  FeedbackBox,
  SolutionBox,
  Icon,
  Button,
  NextButton,
  MetaInfo1,
  Topic1,
  Difficulty1,
  Type1,
  ExploreButton,
  ExploreSubtitle,
  ExploreTitle,
  ExploreQuestionsContainer,
} from "./TryItYourself.styles";
import MainWindow from "../CodeEditorWindow/MainWindow";
import { FcOk } from "react-icons/fc";
import { GoX } from "react-icons/go";
import { getModuleCode } from "../../../../api/addNewModuleApi";
import { gettiyquestions } from "../../../../api/tiyApi";
import { ShimmerPostDetails } from "react-shimmer-effects";
import { message } from "antd";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import ReadyToCode from "../Compiler/ReadyToCode";
import CodeEditorWindow from "../CodeEditorWindow/CodeEditorWindow";

const TryItYourself = () => {
  const { module_name } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [storedAnswer, setStoredAnswer] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [moduleCodes, setModuleCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [userId, setUserId] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const userData = await getUserByClerkId(user.id);
      const uid = userData.data.user._id;
      setUserId(uid); // Set userId first

      const moduleResponse = await getModuleCode();
      if (moduleResponse?.data) {
        setModuleCodes(moduleResponse.data);
        const currentModule = moduleResponse.data.find(m => m.module_name === module_name);
        if (currentModule) {
          // Now call gettiyquestions AFTER userId is set
          const tiyQuestions = await gettiyquestions(currentModule.module_code, "", uid);
          setAllQuestions(tiyQuestions?.data || []);
          setSelectedQuestion(tiyQuestions?.data?.[0] || null);
          console.log("tiyQuestions:", tiyQuestions);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [module_name, user.id]); // Add user.id to dependency array

  useEffect(() => {
    if (!selectedQuestion) return;

    const isAnswered = !!(selectedQuestion.choosen_option || selectedQuestion.answer);
    setIsQuestionAnswered(isAnswered);
    setShowSolution(isAnswered);

    if (selectedQuestion.question_type === "mcq") {
      setStoredAnswer(selectedQuestion.choosen_option || null);
      setSelectedAnswer(selectedQuestion.choosen_option || null);
    } else {
      setStoredAnswer(selectedQuestion.answer || "");
      setUserAnswer(selectedQuestion.answer || "");
    }
  }, [selectedQuestion]);

  const handleShowSolution = () => {
    setShowSolution(true);
  };

const handleNextQuestion = () => {
  if (!selectedQuestion) return;

  const currentIndex = allQuestions.findIndex(q => q._id === selectedQuestion._id);
  if (currentIndex + 1 < allQuestions.length) {
    setSelectedQuestion(allQuestions[currentIndex + 1]);
    setSelectedAnswer(null);
    setUserAnswer("");
    setShowSolution(false);
  } else {
    navigate(`/user/learning`);
  }
};


  const isLastQuestion = (() => {
    if (!selectedQuestion) return true;
    const currentModule = moduleCodes.find(m => m.module_name === module_name);
    if (!currentModule) return true;
    const filtered = allQuestions.filter(q => q.module_code === currentModule.module_code);
    return selectedQuestion._id === filtered[filtered.length - 1]?._id;
  })();

  const handleExploreButtonClick = () => {
    navigate(`/user/mainQuestionBank/questionbank`);
  };

  if (loading) {
    return <ShimmerPostDetails />;
  }

  return (
    <div style={{ display: "flex" }}>
      <Content>
        {selectedQuestion ? (
          <>
            <MetaInfo1>
              <Topic1>Module: {selectedQuestion.topic || module_name}</Topic1>
              <Difficulty1>Difficulty: {selectedQuestion.level}</Difficulty1>
              <Type1>Type: {selectedQuestion.question_type}</Type1>
            </MetaInfo1>

            <QuestionContainer>
              <QuestionHeader>{selectedQuestion.question}</QuestionHeader>

              {/* MCQ rendering */}
              {selectedQuestion.question_type === "mcq" && (
                <>
                  <form>
                    {["option_a", "option_b", "option_c", "option_d"].map(opt => (
                      selectedQuestion[opt] && (
                        <Option key={opt}>
                          <input
                            type="radio"
                            name="answer"
                            value={opt}
                            checked={
                              isQuestionAnswered
                                ? storedAnswer === opt
                                : selectedAnswer === opt
                            }
                            onChange={() => {
                              if (!isQuestionAnswered) {
                                setSelectedAnswer(opt);
                                setShowSolution(false);
                              }
                            }}
                            disabled={isQuestionAnswered}
                          />
                          {selectedQuestion[opt]}
                          {isQuestionAnswered && storedAnswer === opt && (
                            <span style={{ color: 'green', marginLeft: '10px' }}>
                              (Your answer)
                            </span>
                          )}
                        </Option>
                      )
                    ))}
                  </form>
                  {(selectedAnswer || isQuestionAnswered) && (
                    <Button onClick={handleShowSolution}>
                      {isQuestionAnswered ? "View Solution" : "Submit Answer"}
                    </Button>
                  )}
                </>
              )}

              {/* Single-line and Multi-line rendering */}
              {["single-line", "multi-line", "approach"].includes(selectedQuestion.question_type) && (
                <>
                  <SolutionBox>
                    {selectedQuestion.question_type === "single-line" ? (
                      <input
                        type="text"
                        value={storedAnswer ?? userAnswer}
                        onChange={(e) => !isQuestionAnswered && setUserAnswer(e.target.value)}
                        placeholder={isQuestionAnswered ? "Your previous answer is shown above" : "Your answer"}
                        disabled={isQuestionAnswered}
                      />
                    ) : (
                      <textarea
                        rows="5"
                        value={storedAnswer ?? userAnswer}
                        onChange={(e) => !isQuestionAnswered && setUserAnswer(e.target.value)}
                        placeholder={isQuestionAnswered ? "Your previous answer is shown above" : "Your answer"}
                        disabled={isQuestionAnswered}
                      />
                    )}
                  </SolutionBox>
                  {(userAnswer || isQuestionAnswered) && (
                    <Button onClick={handleShowSolution}>
                      {isQuestionAnswered ? "View Solution" : "Submit Answer"}
                    </Button>
                  )}
                </>
              )}

              {/* Coding type fallback */}
              {selectedQuestion.question_type === "coding" && <ReadyToCode />}

              {(showSolution || isQuestionAnswered) && (
                <>
                  <FeedbackBox
                    correct={
                      selectedQuestion.question_type === "mcq"
                        ? storedAnswer === selectedQuestion.correct_option
                        : storedAnswer?.trim() === selectedQuestion.answer?.trim()
                    }
                  >
                    <Icon>
                      {(selectedQuestion.question_type === "mcq"
                        ? storedAnswer === selectedQuestion.correct_option
                        : storedAnswer?.trim() === selectedQuestion.answer?.trim()
                      ) ? <FcOk /> : <GoX style={{ color: "red", fontSize: "24px" }} />}
                    </Icon>
                    {(selectedQuestion.question_type === "mcq"
                      ? storedAnswer === selectedQuestion.correct_option
                      : storedAnswer?.trim() === selectedQuestion.answer?.trim()
                    ) ? "Your answer is correct" : "Your answer is incorrect"}
                  </FeedbackBox>

                  <SolutionBox>
                    <p style={{ fontWeight: "700", color: "#4CAF50" }}>Solution</p>
                    <p>{selectedQuestion.answer}</p>
                  </SolutionBox>

                  <NextButton onClick={handleNextQuestion}>
                    {isLastQuestion ? "Finish" : "Next Question"}
                  </NextButton>
                </>
              )}
            </QuestionContainer>
          </>
        ) : (
          <div style={{ padding: '20px' }}>
            <p>No questions found for this module.</p>
          </div>
        )}
      </Content>

      <div style={{ width: "25%" }}>
        <ExploreQuestionsContainer>
          <ExploreTitle>Explore Questions</ExploreTitle>
          <ExploreSubtitle>
            Dive into the question bank to find and solve more exercises like this.
          </ExploreSubtitle>
          <ExploreButton onClick={handleExploreButtonClick}>
            Question bank
          </ExploreButton>
        </ExploreQuestionsContainer>
      </div>
    </div>
  );
};

export default TryItYourself;
