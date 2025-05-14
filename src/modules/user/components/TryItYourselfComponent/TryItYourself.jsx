import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import { GoThumbsup, GoThumbsdown, GoX } from "react-icons/go";
import { getMainQuestion, getAllTIYQuestions } from "../../../../api/userMainQuestionBankApi";
import { getModuleCode } from "../../../../api/addNewModuleApi";
import { ShimmerPostDetails } from "react-shimmer-effects";
import { checkUserAnswerStatusQuestion, addQuestionToQuestionProgress } from "../../../../api/userMainQuestionBankProgressApi";
import { message } from "antd";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
const TryItYourself = () => {
  const { module_name } = useParams();
  const navigate = useNavigate();

  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [moduleCodes, setModuleCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [storedAnswer, setStoredAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = await getUserByClerkId(user.id);
        // const userId = userData.data.user._id;
        setUserId(userData.data.user._id);
        // Fetch module codes first
        const moduleResponse = await getModuleCode();
        if (moduleResponse && moduleResponse.data) {
          setModuleCodes(moduleResponse.data);
        }

        // Fetch all TIY questions
        const questionsResponse = await getAllTIYQuestions();
        if (questionsResponse && questionsResponse.data) {
          setAllQuestions(questionsResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allQuestions.length > 0 && moduleCodes.length > 0) {
      // Find the module code for the selected module name
      const currentModule = moduleCodes.find(
        (m) => m.module_name === module_name
      );

      if (!currentModule) {
        console.warn("No module found for this module name");
        return;
      }

      // Filter questions based on the module code
      const filteredQuestions = allQuestions.filter(
        (q) => q.module_code === currentModule.module_code
      );

      // Set the first question as the selected question
      if (filteredQuestions.length > 0) {
        setSelectedQuestion(filteredQuestions[0]);
      } else {
        setSelectedQuestion(null);
      }
    }
  }, [allQuestions, moduleCodes, module_name]);

  useEffect(() => {
    if (!selectedQuestion || !userId) return;
  
    // Reset previous answers while loading new question
    setSelectedAnswer(null);
    setUserAnswer("");
    setShowSolution(false);
    setIsQuestionAnswered(false);
    setStoredAnswer(null);
  
    const checkAnswerStatus = async () => {
      try {
        const requestData = {
          moduleId: selectedQuestion.moduleId || selectedQuestion.module_code || '',
          userId,
          questionBankId: selectedQuestion._id
        };
  
        const response = await checkUserAnswerStatusQuestion(requestData);
  
        if (response?.success) {
          setIsQuestionAnswered(true);
  
          if (response.data) {
            if (selectedQuestion.question_type === "mcq") {
              const chosenOption = response.data.choosen_option;
              setStoredAnswer(chosenOption);
              setSelectedAnswer(chosenOption); // Set selectedAnswer directly
            } else {
              const answerText = response.data.answer;
              setStoredAnswer(answerText);
              setUserAnswer(answerText); // Set userAnswer directly
            }
          }
        }
  
        setShowSolution(true); // Show solution box automatically if already answered
      } catch (error) {
        console.error("Error checking answer status:", error);
      }
    };
  
    checkAnswerStatus();
  }, [selectedQuestion, userId]);

  const storeUserAnswer = async () => {
    if (!selectedQuestion) return;

    // If question is already answered, just show solution
    if (isQuestionAnswered) {
      message.info("You have already answered this question");
      setShowSolution(true);
      return;
    }

    // Validate input based on question type
    if (selectedQuestion.question_type === "mcq" && !selectedAnswer) {
      message.warning("Please select an answer before submitting");
      return;
    }

    if (
      (selectedQuestion.question_type === "single-line" ||
        selectedQuestion.question_type === "multi-line" ||
        selectedQuestion.question_type === "approach") &&
      !userAnswer.trim()
    ) {
      message.warning("Please enter an answer before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData = {
        moduleId: selectedQuestion.moduleId || selectedQuestion.module_code || '',
        userId: userId, // Replace with actual user ID
        questionBankId: selectedQuestion._id,
        question_type: selectedQuestion.question_type,
        answer: selectedQuestion.question_type === "mcq" ? "" : userAnswer,
        choosen_option: selectedQuestion.question_type === "mcq" ? selectedAnswer : ""
      };

      const response = await addQuestionToQuestionProgress(requestData);

      if (response && response.success) {
        message.success("Your response has been stored!");
        setIsQuestionAnswered(true);
        if (selectedQuestion.question_type === "mcq") {
          setStoredAnswer(selectedAnswer);
        } else {
          setStoredAnswer(userAnswer);
        }
        setShowSolution(true);
      }
    } catch (error) {
      console.error("Error storing answer:", error);
      message.error("Failed to save your answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShowSolution = () => {
    if (isQuestionAnswered) {
      setShowSolution(true);
      return;
    }

    storeUserAnswer();
  };

  const handleNextQuestion = () => {
    if (!selectedQuestion) return;

    const currentModule = moduleCodes.find(
      (m) => m.module_name === module_name
    );

    if (!currentModule) {
      console.warn("No module found for this module name");
      return;
    }

    const filteredQuestions = allQuestions.filter(
      (q) => q.module_code === currentModule.module_code
    );
    const currentIndex = filteredQuestions.findIndex(
      (q) => q._id === selectedQuestion._id
    );

    if (currentIndex + 1 < filteredQuestions.length) {
      setSelectedQuestion(filteredQuestions[currentIndex + 1]);
      setSelectedAnswer(null);
      setUserAnswer("");
      setShowSolution(false);
    } else {
      navigate(`/user/learning`);
    }
  };

  const isLastQuestion = (() => {
    if (!selectedQuestion) return true;
    const currentModule = moduleCodes.find(
      (m) => m.module_name === module_name
    );
    if (!currentModule) return true;

    const filteredQuestions = allQuestions.filter(
      (q) => q.module_code === currentModule.module_code
    );
    return (
      filteredQuestions.length > 0 &&
      selectedQuestion._id ===
      filteredQuestions[filteredQuestions.length - 1]._id
    );
  })();

  const handleExploreButtonClick = () => {
    navigate(`/user/questionBank`);
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

              {selectedQuestion.question_type === "mcq" ? (
                <>
                  <form>
                    {selectedQuestion.option_a && (
                      <Option>
                        <input
                          type="radio"
                          name="answer"
                          value="option_a"
                          checked={
                            isQuestionAnswered
                              ? storedAnswer === "option_a"
                              : selectedAnswer === "option_a"
                          }
                          onChange={() => {
                            if (!isQuestionAnswered) {
                              setSelectedAnswer("option_a");
                              setShowSolution(false);
                            }
                          }}
                          disabled={isQuestionAnswered}
                        />
                        {selectedQuestion.option_a}
                        {isQuestionAnswered && storedAnswer === "option_a" && (
                          <span style={{ color: 'green', marginLeft: '10px' }}>
                            (Your answer)
                          </span>
                        )}
                      </Option>
                    )}
                    {selectedQuestion.option_b && (
                      <Option>
                        <input
                          type="radio"
                          name="answer"
                          value="option_b"
                          checked={
                            isQuestionAnswered
                              ? storedAnswer === "option_b"
                              : selectedAnswer === "option_b"
                          }
                          onChange={() => {
                            if (!isQuestionAnswered) {
                              setSelectedAnswer("option_b");
                              setShowSolution(false);
                            }
                          }}
                          disabled={isQuestionAnswered}
                        />
                        {selectedQuestion.option_b}
                        {isQuestionAnswered && storedAnswer === "option_b" && (
                          <span style={{ color: 'green', marginLeft: '10px' }}>
                            (Your answer)
                          </span>
                        )}
                      </Option>
                    )}
                    {selectedQuestion.option_c && (
                      <Option>
                        <input
                          type="radio"
                          name="answer"
                          value="option_c"
                          checked={
                            isQuestionAnswered
                              ? storedAnswer === "option_c"
                              : selectedAnswer === "option_c"
                          }
                          onChange={() => {
                            if (!isQuestionAnswered) {
                              setSelectedAnswer("option_c");
                              setShowSolution(false);
                            }
                          }}
                          disabled={isQuestionAnswered}
                        />
                        {selectedQuestion.option_c}
                        {isQuestionAnswered && storedAnswer === "option_c" && (
                          <span style={{ color: 'green', marginLeft: '10px' }}>
                            (Your answer)
                          </span>
                        )}
                      </Option>
                    )}
                    {selectedQuestion.option_d && (
                      <Option>
                        <input
                          type="radio"
                          name="answer"
                          value="option_d"
                          checked={
                            isQuestionAnswered
                              ? storedAnswer === "option_d"
                              : selectedAnswer === "option_d"
                          }
                          onChange={() => {
                            if (!isQuestionAnswered) {
                              setSelectedAnswer("option_d");
                              setShowSolution(false);
                            }
                          }}
                          disabled={isQuestionAnswered}
                        />
                        {selectedQuestion.option_d}
                        {isQuestionAnswered && storedAnswer === "option_d" && (
                          <span style={{ color: 'green', marginLeft: '10px' }}>
                            (Your answer)
                          </span>
                        )}
                      </Option>
                    )}
                  </form>
                  {(selectedAnswer || isQuestionAnswered) && (
                    <Button
                      onClick={handleShowSolution}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." :
                        isQuestionAnswered ? "View Solution" : "Submit Answer"}
                    </Button>
                  )}
                </>
              ) : selectedQuestion.question_type === "single-line" ? (
                <>
                  <SolutionBox>
                    <input
                      type="text"
                      value={storedAnswer !== null ? storedAnswer : userAnswer}

                      onChange={(e) => !isQuestionAnswered && setUserAnswer(e.target.value)}
                      placeholder={isQuestionAnswered ? "Your previous answer is shown above" : "Your answer"}
                      disabled={isQuestionAnswered}
                      style={{
                        width: "100%",
                        border: "none",
                        borderRadius: "5px",
                        lineHeight: "2",
                        padding: "5px",
                        backgroundColor: isQuestionAnswered ? "#f5f5f5" : "white"
                      }}
                    />
                  </SolutionBox>
                  {(userAnswer || isQuestionAnswered) && (
                    <Button
                      onClick={handleShowSolution}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." :
                        isQuestionAnswered ? "View Solution" : "Submit Answer"}
                    </Button>
                  )}
                </>
              ) : selectedQuestion.question_type === "multi-line" ? (
                <>
                  <SolutionBox>
                    <textarea
                   value={storedAnswer !== null ? storedAnswer : userAnswer}

                      onChange={(e) => !isQuestionAnswered && setUserAnswer(e.target.value)}
                      placeholder={isQuestionAnswered ? "Your previous answer is shown above" : "Your answer"}
                      rows="5"
                      disabled={isQuestionAnswered}
                      style={{
                        width: "98%",
                        padding: "10px",
                        borderRadius: "5px",
                        backgroundColor: isQuestionAnswered ? "#f5f5f5" : "white",
                        border: "none",
                        fontSize: "16px",
                        lineHeight: "1.5",
                        fontFamily: "Arial, sans-serif",
                        resize: "vertical",
                        outline: "none",
                      }}
                    />
                  </SolutionBox>
                  {(userAnswer || isQuestionAnswered) && (
                    <Button
                      onClick={handleShowSolution}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." :
                        isQuestionAnswered ? "View Solution" : "Submit Answer"}
                    </Button>
                  )}
                </>
              ) : selectedQuestion.question_type === "approach" ? (
                <>
                  <SolutionBox
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <textarea
value={storedAnswer !== null ? storedAnswer : userAnswer}

                      onChange={(e) => !isQuestionAnswered && setUserAnswer(e.target.value)}
                      placeholder={isQuestionAnswered ? "Your previous approach is shown above" : "Your approach"}
                      rows="5"
                      disabled={isQuestionAnswered}
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: isQuestionAnswered ? "#f5f5f5" : "white",
                        fontSize: "16px",
                        lineHeight: "1.5",
                        resize: "vertical",
                        outline: "none",
                      }}
                    />
                  </SolutionBox>
                  {(userAnswer || isQuestionAnswered) && (
                    <Button
                      onClick={handleShowSolution}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." :
                        isQuestionAnswered ? "View Solution" : "Submit Answer"}
                    </Button>
                  )}
                </>
              ) : (
                <MainWindow />
              )}



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
                      {(
                        selectedQuestion.question_type === "mcq"
                          ? storedAnswer === selectedQuestion.correct_option
                          : storedAnswer?.trim() === selectedQuestion.answer?.trim()
                      ) ? (
                        <FcOk />
                      ) : (
                        <GoX style={{ color: "red", fontSize: "24px" }} />
                      )}
                    </Icon>
                    {(
                      selectedQuestion.question_type === "mcq"
                        ? storedAnswer === selectedQuestion.correct_option
                        : storedAnswer?.trim() === selectedQuestion.answer?.trim()
                    )
                      ? "Your answer is correct"
                      : "Your answer is incorrect"}
                  </FeedbackBox>

                  <SolutionBox>
                    <p style={{ fontWeight: "700", color: "#4CAF50" }}>
                      Solution
                    </p>
                    <div className="correction">
                      <p style={{ margin: "2px" }}>
                        {selectedQuestion.answer}
                      </p>
                    </div>
                  </SolutionBox>

                  {isQuestionAnswered ? (
                    <NextButton onClick={handleNextQuestion}>
                      {isLastQuestion ? "Finish" : "Next Question"}
                    </NextButton>
                  ) : (
                    <Button
                      onClick={handleShowSolution}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Answer"}
                    </Button>
                  )}
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
            Dive into the question bank to find and solve more exercises like
            this, expanding your skills even further.
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