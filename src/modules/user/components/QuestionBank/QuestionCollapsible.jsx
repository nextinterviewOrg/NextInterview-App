import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import {PageContainer,Sidebar, Content,QuestionHeader, Option,QuestionContainer,FeedbackBox,
  SolutionBox, Icon, Button, NextButton, MetaInfo1, Topic1, Difficulty1,Type1,SidebarToggle
} from "./QuestionCollapsible.styles";
import MainWindow from "../CodeEditorWindow/MainWindow";
import { FcOk } from "react-icons/fc";
import { GoThumbsup, GoThumbsdown, GoX } from "react-icons/go";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import { useRef } from "react";
import {
  getQuestionBank,
  getQuestionBankById,
} from "../../../../api/questionBankApi";
import { ShimmerSectionHeader, ShimmerText, ShimmerTitle } from "react-shimmer-effects";
import {getModuleByModuleCode} from "../../../../api/addNewModuleApi";
import { checkUserAnswerStatusQuestionBank, addQuestionToQuestionBankProgress } from "../../../../api/userQuestionBankProgressApi";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import { getModuleCode } from "../../../../api/addNewModuleApi";

const QuestionCollapsible = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [allQuestions, setAllQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [storedAnswer, setStoredAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const [userId, setUserId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moduleCodes, setModuleCodes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserByClerkId(user.id);
        setUserId(userData.data.user._id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    if (location.state?.filteredQuestions) {
      setFilteredQuestions(location.state.filteredQuestions);
      setAllQuestions(location.state.filteredQuestions);
      
      const currentQuestion = location.state.filteredQuestions.find(
        q => q._id === id
      );
      if (currentQuestion) {
        setSelectedQuestion(currentQuestion);
      } else {
        fetchQuestionById();
      }
    } else {
      fetchAllQuestions();
    }
  }, [id, location.state]);

  const fetchAllQuestions = async () => {
    try {
      const response = await getQuestionBank();
      if (response?.data) {
        setAllQuestions(response.data);
        setFilteredQuestions(response.data);
        if (!selectedQuestion && response.data.length > 0) {
          const currentQuestion = response.data.find(q => q._id === id) || response.data[0];
          setSelectedQuestion(currentQuestion);
          if (currentQuestion._id !== id) {
            navigate(`/user/questionBank/${currentQuestion._id}`, {
              state: { filteredQuestions: response.data },
              replace: true
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching all questions:", error);
    }

    const fetchModuleCodes = async () => {
      try {
        const response = await getModuleCode();
        setModuleCodes(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    fetchModuleCodes();
  };

  const fetchQuestionById = async () => {
    try {
      const response = await getQuestionBankById(id);
      if (response?.data) {
        setSelectedQuestion(response.data);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    if (!selectedQuestion || !userId) return;

    // Reset answer state when question changes
    setSelectedAnswer(null);
    setUserAnswer("");
    setShowSolution(false);
    setIsQuestionAnswered(false);
    setStoredAnswer(null);

    const checkAnswerStatus = async () => {
      setIsLoadingStatus(true);
      setError(null);
    
      try {
        const requestData = {
          moduleId: selectedQuestion.moduleId || selectedQuestion.module_code || '',
          userId: userId,
          questionBankId: selectedQuestion._id
        };
    
        const response = await checkUserAnswerStatusQuestionBank(requestData);
    
        if (response?.success) {
          setIsQuestionAnswered(true);
          // Set the stored answer if available
          if (response.data) {
            if (selectedQuestion.question_type === "mcq") {
              setStoredAnswer(response.data.choosen_option);
            } else {
              setStoredAnswer(response.data.answer);
            }
          }
        } else {
          setIsQuestionAnswered(false);
        }
      } catch (error) {
        console.error("Error checking answer status:", error);
        setError(new Error("Could not load progress. Feature may be temporarily unavailable."));
      } finally {
        setIsLoadingStatus(false);
      }
    };
    
    checkAnswerStatus();
  }, [selectedQuestion, userId]);

  const storeUserAnswer = async () => {
    if (!selectedQuestion || !userId) return;
  
    // Validate input based on question type
    if (selectedQuestion.question_type === "mcq" && !selectedAnswer) {
      alert("Please select an answer before submitting");
      return;
    }
  
    if (
      (selectedQuestion.question_type === "single-line" ||
       selectedQuestion.question_type === "multi-line" ||
       selectedQuestion.question_type === "approach") &&
      !userAnswer.trim()
    ) {
      alert("Please enter an answer before submitting");
      return;
    }
  
    setIsSubmitting(true);
    setError(null);
  
    try {
      const requestData = {
        moduleId: selectedQuestion.moduleId || selectedQuestion.module_code || '',
        userId: userId,
        questionBankId: selectedQuestion._id,
        question_type: selectedQuestion.question_type,
        answer: selectedQuestion.question_type === "mcq" ? "" : userAnswer,
        choosen_option: selectedQuestion.question_type === "mcq" ? selectedAnswer : ""
      };
  
      const response = await addQuestionToQuestionBankProgress(requestData);
  
      if (response && response.success) {
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
      alert("Failed to save your answer. Please try again.");
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
    if (filteredQuestions.length === 0) return;
    
    const currentIndex = filteredQuestions.findIndex(
      (q) => q._id === selectedQuestion._id
    );
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < filteredQuestions.length) {
      const nextQuestion = filteredQuestions[nextIndex];
      navigate(`/user/questionBank/${nextQuestion._id}`, {
        state: { filteredQuestions },
        replace: true
      });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getModuleName = (moduleCode) => {
    const module = moduleCodes.find(
      (module) => module.module_code === moduleCode
    );
    
    if (!module && selectedQuestion?.moduleId) {
      const moduleById = moduleCodes.find(
        (m) => m._id === selectedQuestion.moduleId
      );
      return moduleById ? moduleById.module_name : "Unknown Module";
    }
    
    return module ? module.module_name : "Unknown Module";
  };

  return (
    <PageContainer>
      <SidebarToggle onClick={toggleSidebar}>
        {sidebarOpen ? <IoIosArrowDropleft /> : <IoIosArrowDropright />}
      </SidebarToggle>

      <Sidebar className="sidebar" $isOpen={sidebarOpen}>
        <h3 style={{ paddingLeft: "10px" }}>Questions</h3>
        {filteredQuestions.map((question, index) => (
          <Link
            key={index}
            to={`/user/questionBank/${question._id}`}
            state={{ filteredQuestions }}
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => window.innerWidth <= 860 && setSidebarOpen(false)}
          >
            <div style={{
              padding: "10px",
              borderBottom: "1px solid #ccc",
              backgroundColor: selectedQuestion?._id === question._id ? "#f0f0f0" : "transparent"
            }}>
              {index + 1}. {question.question}
            </div>
          </Link>
        ))}
      </Sidebar>
      <Content>
        {selectedQuestion ? (
          <>
            {isLoadingStatus && (
              <div style={{ padding: '10px', marginBottom: '15px' }}>
                <ShimmerText line={1} gap={10} />
              </div>
            )}
            
            {isQuestionAnswered && (
              <div style={{ 
                color: 'green', 
                padding: '10px', 
                backgroundColor: '#f0f0f0', 
                borderRadius: '5px',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FcOk style={{ fontSize: '20px' }} />
                <span>You've answered this question</span>
              </div>
            )}

            <MetaInfo1>
              <Topic1>Module: {getModuleName(selectedQuestion.module_code || selectedQuestion.moduleId)}</Topic1>
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
                          <span style={{ 
                            color: 'green', 
                            marginLeft: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <FcOk /> (Your answer)
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
                          <span style={{ 
                            color: 'green', 
                            marginLeft: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <FcOk /> (Your answer)
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
                          <span style={{ 
                            color: 'green', 
                            marginLeft: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <FcOk /> (Your answer)
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
                          <span style={{ 
                            color: 'green', 
                            marginLeft: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <FcOk /> (Your answer)
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
                      value={isQuestionAnswered ? storedAnswer : userAnswer}
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
                      value={isQuestionAnswered ? storedAnswer : userAnswer}
                      onChange={(e) => !isQuestionAnswered && setUserAnswer(e.target.value)}
                      placeholder={isQuestionAnswered ? "Your previous answer is shown above" : "Your answer"}
                      rows="5"
                      disabled={isQuestionAnswered}
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: isQuestionAnswered ? "#f5f5f5" : "white",
                        fontSize: "16px",
                        lineHeight: "1.5",
                        fontFamily: "Arial, sans-serif",
                        resize: "vertical",
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
                      value={isQuestionAnswered ? storedAnswer : userAnswer}
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
                      isQuestionAnswered
                        ? selectedQuestion.question_type === "mcq"
                          ? storedAnswer === selectedQuestion.correct_option
                          : storedAnswer?.trim() === selectedQuestion.answer?.trim()
                        : selectedQuestion.question_type === "mcq"
                          ? selectedAnswer === selectedQuestion.correct_option
                          : userAnswer?.trim() === selectedQuestion.answer?.trim()
                    }
                  >
                    <Icon>
                      {(isQuestionAnswered
                        ? selectedQuestion.question_type === "mcq"
                          ? storedAnswer === selectedQuestion.correct_option
                          : storedAnswer?.trim() === selectedQuestion.answer?.trim()
                        : selectedQuestion.question_type === "mcq"
                          ? selectedAnswer === selectedQuestion.correct_option
                          : userAnswer?.trim() === selectedQuestion.answer?.trim()) ? (
                        <FcOk />
                      ) : (
                        <GoX
                          style={{
                            color: "red",
                            fontSize: "24px",
                            marginTop: "5px",
                          }}
                        />
                      )}
                    </Icon>
                    {(isQuestionAnswered
                      ? selectedQuestion.question_type === "mcq"
                        ? storedAnswer === selectedQuestion.correct_option
                        : storedAnswer?.trim() === selectedQuestion.answer?.trim()
                      : selectedQuestion.question_type === "mcq"
                        ? selectedAnswer === selectedQuestion.correct_option
                        : userAnswer?.trim() === selectedQuestion.answer?.trim())
                      ? "Your answer is correct"
                      : "Your answer is incorrect"}
                  </FeedbackBox>
                  <SolutionBox>
                    <p style={{ fontWeight: "700", color: "#4CAF50" }}>
                      Solution
                    </p>
                    <div className="correction">
                      <p>{selectedQuestion.answer}</p>
                    </div>
                  </SolutionBox>
                </>
              )}

              {showSolution && (
                <NextButton onClick={handleNextQuestion}>
                  Next Question
                </NextButton>
              )}
            </QuestionContainer>
          </>
        ) : (
          <div style={{ padding: '20px' }}>
            <ShimmerSectionHeader />
            <ShimmerText line={4} gap={10} />
          </div>
        )}
      </Content>
    </PageContainer>
  );
};

export default QuestionCollapsible;