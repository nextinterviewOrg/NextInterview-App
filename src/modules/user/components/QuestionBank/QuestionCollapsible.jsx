import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  PageContainer,
  Sidebar,
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
  QuestionItem,
  ToggleButton

} from "./QuestionCollapsible.styles";
import MainWindow from "../CodeEditorWindow/MainWindow"; // Importing the code editor component
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
const QuestionCollapsible = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allQuestions, setAllQuestions] = useState([]); // Store all questions for the sidebar
  const [selectedQuestion, setSelectedQuestion] = useState(null); // For storing the selected question
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState(""); // To store answer for single-line, multi-line, approach questions
  const [showSolution, setShowSolution] = useState(false);
const [loading, setLoading] = useState(true);
const [ moduleName, setModuleName] = useState("");

const fetchModuleName = async (moduleCode) => {
  try {
    const response = await getModuleByModuleCode(moduleCode);
    console.log("response for module name", response);
    if (response && response.data) {
      setModuleName(response.data.moduleName); // Assuming the response has a moduleName field
    }
  } catch (error) {
    console.error("Error fetching module name:", error);
    setModuleName("Module Not Found"); // Fallback if there's an error
  }
};

  useEffect(() => {
    // Fetch all questions to display in the sidebar
    const fetchAllQuestions = async () => {
      try {
        setLoading(true);
        const response = await getQuestionBank(); // API call to get all questions
   console.log("response234", response);
        if (response && response.data) {
          setAllQuestions(response.data); // Set the all questions data for sidebar
          // console.log("Selected question", selectedQuestion);
          if (!selectedQuestion && response.data.length > 0) {
            setSelectedQuestion(response.data[0]); // Set the first question as the default selected question
            navigate(`/user/questionBank/${response.data[0]._id}`); // Redirect to the first question
     
            console.log("selectedQuestion", selectedQuestion);

            // if (selectedQuestion?.module_code) {
              console.log("selectedQuestion module code", selectedQuestion?.module_code);
              fetchModuleName(selectedQuestion.module_code);
              console.log("moduleName", module_code);
            // }
          }
         
          console.log("selectedsvsfvdfQuestion module codecvsdffdd", selectedQuestion?.module_code);

          if (selectedQuestion?.module_code) {
            fetchModuleName(selectedQuestion.module_code);
          }
       setLoading(false);
        } else {
          console.error("No questions found");
        }
      } catch (error) {
        console.error("Error fetching all questions:", error);
      }
    };

    fetchAllQuestions();
  }, []);

  useEffect(() => {
    // Fetch the question by ID when it changes
    const fetchQuestion = async () => {
      try {
        
        const response = await getQuestionBankById(id); // API call to get question by ID
      console.log("response", response);
        if (response && response.data) {
          setSelectedQuestion(response.data); // Set the selected question data
        } else {
          console.error("No data found for this question");
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
    setSelectedAnswer(null); // Reset answer
    setUserAnswer(""); // Reset user input
    setShowSolution(false); // Reset solution visibility
  }, [id]);

  const handleNextQuestion = () => {
    const currentIndex = allQuestions.findIndex(
      (q) => q._id === selectedQuestion._id
    );

    const nextIndex = currentIndex + 1;
    if (nextIndex < allQuestions.length) {
      const nextQuestion = allQuestions[nextIndex];
      navigate(`/user/questionBank/${nextQuestion._id}`);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const isMobile = window.innerWidth <= 768;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Check if we're not clicking the toggle button
        if (!event.target.closest('.toggle-button')) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Auto-close when route changes (question clicked)
  useEffect(() => {
    setIsOpen(false);
  }, [window.location.pathname]);

  // Auto-close on mobile when resizing to larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <PageContainer>
       <ToggleButton 
        className="toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      >
        {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
      </ToggleButton>

      {/* Sidebar */}
      <Sidebar 
        ref={sidebarRef}
        isOpen={isOpen}
        isMobile={isMobile}
      >
        <h3 style={{ paddingLeft: "10px" }}>Questions</h3>
        {allQuestions.map((question, index) => (
          <Link
            key={index}
            to={`/user/questionBank/${question._id}`}
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => isMobile && setIsOpen(false)}
          >
            <QuestionItem>
              {index + 1}. {question.question}
            </QuestionItem>
          </Link>
        ))}
      </Sidebar>
      <Content>
        {selectedQuestion ? (
          <>
        
            <MetaInfo1>
              <Topic1>Module: {moduleName || selectedQuestion.topic}</Topic1>
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
                            setSelectedAnswer("option_a");
                            setShowSolution(false);
                          }}
                        />
                        {selectedQuestion.option_a}
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
                            setSelectedAnswer("option_b");
                            setShowSolution(false);
                          }}
                        />
                        {selectedQuestion.option_b}
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
                            setSelectedAnswer("option_c");
                            setShowSolution(false);
                          }}
                        />
                        {selectedQuestion.option_c}
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
                            setSelectedAnswer("option_d");
                            setShowSolution(false);
                          }}
                        />
                        {selectedQuestion.option_d}
                      </Option>
                    )}
                  </form>
                  {selectedAnswer && !showSolution && (
                    <Button onClick={() => setShowSolution(true)}>
                      Show Solution
                    </Button>
                  )}
                  {showSolution && (
                    <FeedbackBox
                      correct={
                        selectedAnswer === selectedQuestion.correct_option
                      }
                    >
                      <Icon>
                        {selectedAnswer === selectedQuestion.correct_option ? (
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
                      {selectedAnswer === selectedQuestion.correct_option
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
              ) : selectedQuestion.question_type === "multi-line" ? (
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
       <ShimmerSectionHeader  />
        )}
      </Content>
    </PageContainer>
  );
};

export default QuestionCollapsible;
