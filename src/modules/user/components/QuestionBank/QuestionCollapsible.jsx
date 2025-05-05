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
import { checkUserAnswerStatusQuestionBank } from "../../../../api/userQuestionBankProgressApi";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import { getModuleCode } from "../../../../api/addNewModuleApi";

const QuestionCollapsible = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Add this to access location state

  const [allQuestions, setAllQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]); // New state for filtered questions
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [storedAnswer, setStoredAnswer] = useState(null);
  const { user } = useUser();
  const [userId, setUserId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const [moduleCodes, setModuleCodes] = useState([]);

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

    // Initialize questions based on location state or fetch all
    if (location.state?.filteredQuestions) {
      setFilteredQuestions(location.state.filteredQuestions);
      setAllQuestions(location.state.filteredQuestions);
      
      // Find and set the current question from filtered list
      const currentQuestion = location.state.filteredQuestions.find(
        q => q._id === id
      );
      if (currentQuestion) {
        setSelectedQuestion(currentQuestion);
      } else {
        // If not found in filtered list, fetch it individually
        fetchQuestionById();
      }
    } else {
      // If no filtered questions in state, fetch all questions
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
    // Check if the user has already answered this question
    const checkAnswerStatus = async () => {
      if (!selectedQuestion || !userId) return;

      setIsLoadingStatus(true);
      try {
        console.log("selectedQuestion", selectedQuestion);
        // Ensure all required fields are present and properly formatted
        const requestData = {
          moduleId: selectedQuestion.module_code || '', // Provide fallback empty string if undefined
          userId: userId,
          questionBankId: selectedQuestion._id
        };
        console.log("Selected module ", selectedQuestion.moduleId, " and user ", userId, " and question ", selectedQuestion._id);
        // Log the request data for debugging
        console.log("Sending request with data:", requestData);

        // Validate required fields
        if (!requestData.moduleId || !requestData.userId || !requestData.questionBankId) {
          console.error("Missing required fields in request data");
          setIsQuestionAnswered(false);
          return;
        }

        const response = await checkUserAnswerStatusQuestionBank(requestData);

        // Log the response for debugging
        console.log("Received response:", response);

        if (response && typeof response.success !== 'undefined') {
          setIsQuestionAnswered(response.success);

          if (response.success) {
            setShowSolution(true);
            // Handle stored answer if available in response
            if (response.data) {
              const answerData = response.data.answered_Questions?.find(
                q => q.questionBankId === selectedQuestion._id
              );
              if (answerData) {
                setStoredAnswer(answerData.choosen_option || answerData.answer);
                if (selectedQuestion.question_type === "mcq") {
                  setSelectedAnswer(answerData.choosen_option);
                } else {
                  setUserAnswer(answerData.answer || "");
                }
              }
            }
          }
        } else {
          console.error("Invalid response format from API");
          setIsQuestionAnswered(false);
        }
      } catch (error) {
        console.error("Error checking answer status:", error);
        // More detailed error handling
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
        setIsQuestionAnswered(false);
      } finally {
        setIsLoadingStatus(false);
      }
    };

    checkAnswerStatus();
  }, [selectedQuestion]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await getQuestionBankById(id);
        if (response && response.data) {
          setSelectedQuestion(response.data);
        } else {
          console.error("No data found for this question");
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
    setSelectedAnswer(null);
    setUserAnswer("");
    setShowSolution(false);
    setIsQuestionAnswered(false);
    setStoredAnswer(null);
  }, [id]);

  const handleShowSolution = () => {
    if (isQuestionAnswered) {
      alert("You have already answered this question. Viewing the solution again.");
    }
    setShowSolution(true);
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
        state: { filteredQuestions }, // Pass along the filtered questions
        replace: true
      });
    }
  };

  // const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const getModuleName = (moduleCode) => {
    // First check if moduleCode exists in moduleCodes
    const module = moduleCodes.find(
      (module) => module.module_code === moduleCode
    );
    
    // If not found, try to find by moduleId (some APIs use different property names)
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
            state={{ filteredQuestions }} // Pass filtered questions when navigating
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
            {isLoadingStatus && <p>Checking answer status...</p>}
            {isQuestionAnswered && (
              <p style={{ color: 'green', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                You've already answered this question
              </p>
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
                          checked={selectedAnswer === "option_a"}
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
                          <span style={{ color: 'green', marginLeft: '10px' }}>(Your answer)</span>
                        )}
                      </Option>
                    )}
                    {selectedQuestion.option_b && (
                      <Option>
                        <input
                          type="radio"
                          name="answer"
                          value="option_b"
                          checked={selectedAnswer === "option_b"}
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
                          <span style={{ color: 'green', marginLeft: '10px' }}>(Your answer)</span>
                        )}
                      </Option>
                    )}
                    {selectedQuestion.option_c && (
                      <Option>
                        <input
                          type="radio"
                          name="answer"
                          value="option_c"
                          checked={selectedAnswer === "option_c"}
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
                          <span style={{ color: 'green', marginLeft: '10px' }}>(Your answer)</span>
                        )}
                      </Option>
                    )}
                    {selectedQuestion.option_d && (
                      <Option>
                        <input
                          type="radio"
                          name="answer"
                          value="option_d"
                          checked={selectedAnswer === "option_d"}
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
                          <span style={{ color: 'green', marginLeft: '10px' }}>(Your answer)</span>
                        )}
                      </Option>
                    )}
                  </form>
                  {(selectedAnswer || isQuestionAnswered) && !showSolution && (
                    <Button onClick={handleShowSolution}>
                      {isQuestionAnswered ? "View Solution Again" : "Show Solution"}
                    </Button>
                  )}
                  {(showSolution || isQuestionAnswered) && (
                    <FeedbackBox
                      correct={
                        isQuestionAnswered
                          ? storedAnswer === selectedQuestion.correct_option
                          : selectedAnswer === selectedQuestion.correct_option
                      }
                    >
                      <Icon>
                        {(isQuestionAnswered
                          ? storedAnswer === selectedQuestion.correct_option
                          : selectedAnswer === selectedQuestion.correct_option) ? (
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
                        ? storedAnswer === selectedQuestion.correct_option
                        : selectedAnswer === selectedQuestion.correct_option)
                        ? "Your answer is correct"
                        : "Your answer is incorrect"}
                    </FeedbackBox>
                  )}
                  {(showSolution || isQuestionAnswered) && (
                    <SolutionBox>
                      <p style={{ fontWeight: "700", color: "#4CAF50" }}>
                        Solution
                      </p>
                      <div className="correction">
                        <p>{selectedQuestion.answer}</p>
                      </div>
                    </SolutionBox>
                  )}
                </>
              ) : selectedQuestion.question_type === "single-line" ? (
                <>
                  <SolutionBox>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Your answer"
                      style={{
                        width: "100%",
                        // padding: "10px",
                        // border: "1px solid #ccc",
                        border: "none",
                        borderRadius: "5px",
                        lineHeight: "2",
                        padding: "5px",
                      }}
                    />
                  </SolutionBox>
                  {userAnswer && !showSolution && (
                    <Button onClick={() => setShowSolution(true)}>
                      Show Solution
                    </Button>
                  )}
                  {showSolution && (
                    <FeedbackBox
                      correct={
                        userAnswer.trim() === selectedQuestion.answer.trim()
                      }
                    >
                      <Icon>
                        {userAnswer.trim() ===
                        selectedQuestion.answer.trim() ? (
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
                      {userAnswer.trim() === selectedQuestion.answer.trim()
                        ? "Your answer is correct"
                        : "Your answer is incorrect"}
                    </FeedbackBox>
                  )}
                  {showSolution && (
                    <SolutionBox>
                      <p style={{ fontWeight: "700", color: "#4CAF50" }}>
                        Solution
                      </p>
                      <div className="correction">
                        <p>{selectedQuestion.answer}</p>
                        {/* <div className="thumbsup">
                          <span>
                            <GoThumbsup />
                            Helpful
                          </span>
                          <span>
                            <GoThumbsdown />
                            Not Helpful
                          </span>
                        </div> */}
                      </div>
                    </SolutionBox>
                  )}
                </>
              )
  : selectedQuestion.question_type === "multi-line" ? (
                <>
                  <SolutionBox>
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Your answer"
                      rows="5"
                      style={{
                        width: "100%",
                        // padding: "10px",
                        borderRadius: "5px",
                        // border: "1px solid #ddd",
                        backgroundColor: "white",
                        border: "none",
                        fontSize: "16px",
                        lineHeight: "1.5",
                        fontFamily: "Arial, sans-serif",
                        resize: "vertical",
                      }}
                    />
                  </SolutionBox>
                  {userAnswer && !showSolution && (
                    <Button onClick={() => setShowSolution(true)}>
                      Show Solution
                    </Button>
                  )}
                  {showSolution && (
                    <FeedbackBox
                      correct={
                        userAnswer.trim() === selectedQuestion.answer.trim()
                      }
                    >
                      <Icon>
                        {userAnswer.trim() ===
                        selectedQuestion.answer.trim() ? (
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
                      {userAnswer.trim() === selectedQuestion.answer.trim()
                        ? "Your answer is correct"
                        : "Your answer is incorrect"}
                    </FeedbackBox>
                  )}
                  {showSolution && (
                    <SolutionBox>
                      <p style={{ fontWeight: "700", color: "#4CAF50" }}>
                        Solution
                      </p>
                      <div className="correction">
                        <p>{selectedQuestion.answer}</p>
                        {/* <div className="thumbsup">
                          <span>
                            <GoThumbsup />
                            Helpful
                          </span>
                          <span>
                            <GoThumbsdown />
                            Not Helpful
                          </span>
                        </div> */}
                      </div>
                    </SolutionBox>
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
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Your approach"
                      rows="5"
                      style={{
                        width: "100%",
                        // marginTop: "10px",
                        // padding: "10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "white",
                        fontSize: "16px",
                        lineHeight: "1.5",
                        resize: "vertical",
                      }}
                    />
                  </SolutionBox>
                  {userAnswer && !showSolution && (
                    <Button onClick={() => setShowSolution(true)}>
                      Show Solution
                    </Button>
                  )}
                  {showSolution && (
                    <FeedbackBox
                      correct={
                        userAnswer.trim() === selectedQuestion.answer.trim()
                      }
                    >
                      <Icon>
                        {userAnswer.trim() ===
                        selectedQuestion.answer.trim() ? (
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
                      {userAnswer.trim() === selectedQuestion.answer.trim()
                        ? "Your answer is correct"
                        : "Your answer is incorrect"}
                    </FeedbackBox>
                  )}
                  {showSolution && (
                    <SolutionBox>
                      <p style={{ fontWeight: "700", color: "#4CAF50" }}>
                        Solution
                      </p>
                      <div className="correction">
                        <p>{selectedQuestion.answer}</p>
                        {/* <div className="thumbsup">
                          <span>
                            <GoThumbsup />
                            Helpful
                          </span>
                          <span>
                            <GoThumbsdown />
                            Not Helpful
                          </span>
                        </div> */}
                      </div>
                    </SolutionBox>
                  )}
                </>
              ) : (
                <MainWindow />
              )}
 
              {showSolution && (
                <NextButton onClick={handleNextQuestion}>
                  Next Question
                </NextButton>
              )}
            </QuestionContainer>
          </>
        ) : (
          <p>Loading ...</p>
        )}
      </Content>
    </PageContainer>
  );
};
 
export default QuestionCollapsible;
 