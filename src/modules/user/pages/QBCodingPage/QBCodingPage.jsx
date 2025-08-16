import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";
import {
  QusnType,
  QusnText,
  QusnDifficulty,
  QuestionBox,
  Wrapper,
  BackButton,
  Title,
  QuestionContainer,
  TabsWrapper,
  TabButton,
  TimerText,
  HintWrapper,
  HintButton,
  HintTooltip,
  LanguageSelectWrapper,
  Select,
  LanguageSelect,
  ModalOverlay,
  ModalContent,
  CloseButton,
  ButtonGroup,
  ModalButton,
  HintCard,
  HintIcon,
  HintContent,
  HintTitle,
  HintExplanation,
  CardContainer,
  TitleforSolution,
  Paragraph,
  TryHarderLink,
  Footer,
  FeedbackButton,
  FeedBacks,
  FeedbackIconWrapper,
  FeedbackPopup,
  FeedbackIcon,
  FeedbackContent,
  FeedbackTitle,
  FeedbackMessage,
  FeedbackCloseButton
} from "./QBCodingPage.Styles";
import ReadyToCode from "../../components/Compiler/ReadyToCode";
import { IoChevronBackSharp, IoClose, IoCloseSharp } from "react-icons/io5";
import { BsHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";
import { SlLike, SlDislike } from "react-icons/sl";
import HintChallenges from "../../../admin/components/Challenges/HintChallenges/HintChallenges";
import { getQuestionBankById, tryHarderQuestionBank } from "../../../../api/questionBankApi";
import { addQuestionToQuestionProgressTIYQB } from "../../../../api/tiyQbCodingQuestionProgressApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import { notification } from "antd";
import Editor from "@monaco-editor/react";
import { VscInfo, VscDebugRestart } from "react-icons/vsc";
import { PiTimer, PiStarFour } from "react-icons/pi";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { addQuestionToQuestionProgress } from "../../../../api/userMainQuestionBankProgressApi";

const QBCodingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { user } = useUser();

  const [questionID, setQuestionID] = useState(id);
  const [selectedLang, setSelectedLang] = useState("");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showOptimiseBtn, setShowOptimiseBtn] = useState(false);
  const [optimisedCode, setOptimisedCode] = useState("");
  const [activeTab, setActiveTab] = useState("mycode");
  const [solutionTimeExpired, setSolutionTimeExpired] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isHelpful, setIsHelpful] = useState(null);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [dislikeAnimation, setDislikeAnimation] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [hasOptimized, setHasOptimized] = useState(false);
  const [optimizationDisabled, setOptimizationDisabled] = useState(true);

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem(`challengeTimer_${id}`);
    const parsedTime = savedTime ? parseInt(savedTime) : 60;
    return parsedTime > 0 ? parsedTime : 60;
  });
  const [runClicked, setRunClicked] = useState(false);
  const [storedOptimizedCode, setStoredOptimizedCode] = useState(() => {
          return localStorage.getItem(`optimizedCode_${id}`) || null;
      });
      const [optimizationUsed, setOptimizationUsed] = useState(false);
      const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (location.state?.questionID) {
      setQuestionID(location.state.questionID);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchUserId = async () => {
      if (user?.id) {
        try {
          const res = await getUserByClerkId(user.id);
          if (res.success) {
            setUserId(res.data.user._id);
          }
        } catch (err) {
          console.error("Error fetching user ID:", err);
        }
      }
    };
    fetchUserId();
  }, [user]);

  useEffect(() => {
  return () => {
    // Clear the optimized code when component unmounts or question changes
    localStorage.removeItem(`optimizedCode_${id}`);
  };
}, [id]);

useEffect(() => {
  // Check if output contains error messages
  const isErrorOutput = output && (
    output.includes('Error') || 
    output.includes('error') || 
    output.includes('Exception') || 
    output.includes('Traceback')
  );
  
  // Enable optimization button only if there's output and no errors
  setOptimizationDisabled(!output || isErrorOutput);
  
  // Check if we already have optimized code in localStorage
  const savedOptimizedCode = localStorage.getItem(`optimizedCode_${id}`);
  if (savedOptimizedCode) {
    setOptimisedCode(savedOptimizedCode);
    setHasOptimized(true);
  }
}, [output, id]);

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!questionID) return;
      setLoading(true);
      try {
        const res = await getQuestionBankById(questionID);
        if (res.success && res.data) {
          const q = res.data;
          setQuestion({
            _id: q._id,
            QuestionText: q.question,
            description: q.description,
            input: q.input,
            output: q.output,
            difficulty: q.level,
            programming_language: q.programming_language,
            question_type: q.question_type || "coding",
            base_code: q.base_code || "",
            dbSetupCommands: q.dbSetupCommands || "",
            solutionCode: q.solutionCode || "",
            solutionExplanation: q.solutionExplanation || "",
            hints:
              q.hints?.map((h) => ({
                hint_text: h.hint_text,
                explanation: h.explanation,
              })) || [],
            module_code: q.module_code
          });
          setCode(q.base_code || "");
          setInput(q.input || "");
          setSelectedLang(q.programming_language === "MySQL" ? "mysql" : "python");
        } else {
          notification.error({ message: "Failed to load question" });
        }
      } catch (error) {
        console.error("Error loading question:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [questionID, id]);

const optimizeCode = async () => {
  if (!output || optimizationDisabled) return;
  
  const userId = await getUserByClerkId(user.id);
  const user_id = userId.data.user._id;

  try {
    const response = await fetch(
      "https://nextinterview.ai/fastapi/code/optimize-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.QuestionText,
          description: question.description,
          user_code: code,
          sample_input: question.input,
          sample_output: question.output,
          user_id: user_id,
        }),
      }
    );

    const data = await response.json();
   if (data.optimized_code) {
  setOptimisedCode(data.optimized_code);
  localStorage.setItem(`optimizedCode_${id}`, data.optimized_code);
  setHasOptimized(true);
  setOptimizationUsed(true); // ✅ Hide the button after optimization
  setModalOpen(true);
}
  } catch (error) {
    console.error("Error optimizing code:", error);
    notification.error({ message: "Failed to optimize code" });
  }
};

  useEffect(() => {
    if (activeTab !== "mycode" || solutionTimeExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSolutionTimeExpired(true);
          localStorage.removeItem(`challengeTimer_${id}`);
          return 0;
        }

        const updatedTime = prev - 1;
        localStorage.setItem(`challengeTimer_${id}`, updatedTime.toString());
        return updatedTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTab, solutionTimeExpired]);

  const handleGoBack = () => navigate(-1);

  const handleSubmit = async () => {
    if (!output) {
      notification.error({
        message: "Please run your code first",
        duration: 3,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionData = {
        questionBankId: questionID,
        moduleId: question.module_code,
        userId,
        answer: code,
        finalResult: output.trim() === question.output.trim(),
        output,
        skip: false,
        question_type: "coding"
      };
      const res = await addQuestionToQuestionProgress(submissionData);
      if (res.success) {
        notification.success({ message: "Answer submitted successfully" });
        navigate("/user/mainQuestionBank/questionbank", { state: location.state });
      } else {
        notification.error({ message: "Submission failed" });
      }
    } catch (error) {
      console.error("Submit error:", error);
      notification.error({ message: "Unexpected error during submission" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSummaryFeedback = (isHelpful) => {
    if (isHelpful) {
      setLikeAnimation(true);
      setTimeout(() => setLikeAnimation(false), 1000);
    } else {
      setDislikeAnimation(true);
      setTimeout(() => setDislikeAnimation(false), 1000);
    }
    setSelectedFeedback(isHelpful);
    setFeedbackSubmitted(true);
    setIsHelpful(isHelpful);
    setFeedbackMessage(`Thank you for your feedback! The summary was ${isHelpful ? 'helpful' : 'not helpful'}.`);
    setShowFeedbackPopup(true);
    setTimeout(() => setShowFeedbackPopup(false), 3000);
  };

  const handleTryHarderQuestion = async () => {
    try {
      const response = await tryHarderQuestionBank({
        questionId: questionID,
        isTIYQuestion: false,
        isQBQuestion: true
      });
      if (response?.success && response?.data?._id) {
        navigate(`/user/mainQuestionBank/questionbank/${response.data._id}`);
      } else {
        notification.info({ message: "No harder question found." });
        navigate(`/user/mainQuestionBank`)
      }
    } catch (error) {
      console.error('Error fetching harder question:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

const handleOptimizeClick = () => {
  const savedOptimizedCode = localStorage.getItem(`optimizedCode_${id}`);
  if (savedOptimizedCode) {
    setOptimisedCode(savedOptimizedCode);
    setOptimizationUsed(true); // ✅ Hide the button here too
    setModalOpen(true);
  } else {
    optimizeCode();
  }
};

  return (
    <>
      <BackButton onClick={handleGoBack}>
        <IoChevronBackSharp /> Back
      </BackButton>

      <Wrapper>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <QusnType>
              <QusnText>{question?.QuestionText}</QusnText>
              <QusnDifficulty difficulty={question?.difficulty}>
                {question?.difficulty?.charAt(0).toUpperCase() + question?.difficulty?.slice(1)}
              </QusnDifficulty>
            </QusnType>

            <div className="question-container">
              <QuestionContainer>
                <Title>Question</Title>
                <QuestionBox>
                  <div dangerouslySetInnerHTML={{ __html: question?.description }} />
                  <p>
                     {question?.input}
                  </p>
                  <p>
                    <strong>
                      Output:
                      <br />
                      {question?.programming_language === "Python" ? (
                        <p> {question?.output}</p>
                      ) : (
                        <pre style={{
                          maxwidth: '300px',
                          overflowX: 'auto',
                          wordBreak: 'break-word'
                        }} > {question?.output}</pre>
                      )}
                    </strong>
                  </p>
                </QuestionBox>
              </QuestionContainer>

              <div style={{ flex: 1 }}>
                <TabsWrapper>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                    <TabButton
                      active={activeTab === "mycode"}
                      onClick={() => setActiveTab("mycode")}
                    >
                      My Code
                    </TabButton>

                    <TabButton
                      active={activeTab === "solution"}
                      onClick={() => {
                        if (solutionTimeExpired ) {
                          setActiveTab("solution");
                        }
                      }}
                      disabled={!solutionTimeExpired}
                      style={{
                        opacity: (solutionTimeExpired ) ? 1 : 0.6,
                        cursor: (solutionTimeExpired ) ? "pointer" : "not-allowed",
                      }}
                    >
                      Solution
                      {!solutionTimeExpired && (
                        <TimerText>
                          <PiTimer style={{ marginRight: "5px" }} />
                          {timeLeft}secs
                        </TimerText>
                      )}
                    </TabButton>
                  </div>

                  <LanguageSelectWrapper>
                    <HintWrapper
                      onMouseEnter={() => setShowHint(true)}
                      onMouseLeave={() => setShowHint(false)}
                    >
                      <HintButton>
                        Hint <VscInfo />
                      </HintButton>
                      {showHint && (
                        <HintTooltip>
                          {Array.isArray(question?.hints) &&
                            question?.hints.length > 0
                            ? question.hints.map((hintObj, index) => (
                              <HintCard key={hintObj._id || index}>
                                <HintIcon>
                                  <HiOutlineLightBulb />
                                </HintIcon>
                                <HintContent>
                                  <HintTitle>{hintObj.hint_text}</HintTitle>
                                  <HintExplanation>
                                    {hintObj.explanation}
                                  </HintExplanation>
                                </HintContent>
                              </HintCard>
                            ))
                            : "No hints available for this question."}
                        </HintTooltip>
                      )}
                    </HintWrapper>

                    <LanguageSelect>
                      <button style={{ border: 'none', display: 'flex', background: 'none', color: '#007c91' }} 
         onClick={() => {
  setCode(optimisedCode);
  // Keep the previous output instead of clearing it
  setShowOutput(true);
  setModalOpen(false);
  setOptimizationUsed(true); // Mark optimization as used
}}

                      >
                        <VscDebugRestart />
                      </button>
                      <label htmlFor="lang">Select Language</label>
                      <Select
                        id="lang"
                        value={selectedLang}
                        onChange={(e) => setSelectedLang(e.target.value)}
                      >
                        <option value="python">Python</option>
                        <option value="mysql">MySQL</option>
                      </Select>
                    </LanguageSelect>
                  </LanguageSelectWrapper>
                </TabsWrapper>

                {activeTab === "mycode" && (
                  <ReadyToCode
                    selectLang={selectedLang}
                    setSelectLang={setSelectedLang}
                    code={code}
                    setCode={setCode}
                    output={output}
                    setOutput={setOutput}
                    setShowOutput={setShowOutput}
                    input={input}
                    setInput={setInput}
                    dbSetupCommands={question?.dbSetupCommands}
                    showOptimiseBtn={!optimizationUsed}// Always show the button
    handleOptimizeCode={handleOptimizeClick}
    hasOptimized={hasOptimized}


    
    optimizationDisabled={optimizationDisabled}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    solutionTimeExpired={solutionTimeExpired}
                    challenge={false}
                    setRunClicked={setRunClicked}
                    tryHarderQuestion={handleTryHarderQuestion}
                  />
                )}

                {activeTab === "solution" && (
                  <>
                    <Editor
                      height="200px"
                      language={setSelectedLang === "python" ? "python" : "mysql"}
                      value={hasOptimized ? optimisedCode : question?.solutionCode}
                      theme="vs-light"
                    />

                    <CardContainer>
                      <TitleforSolution>Code Explanation</TitleforSolution>
                      <Paragraph>
                        {hasOptimized 
                          ? "This is the optimized version of your code." 
                          : question?.solutionExplanation || "No code explanation available."}
                      </Paragraph>

                      <Footer>
                        <TryHarderLink onClick={handleTryHarderQuestion} ><PiStarFour /> Try harder question</TryHarderLink>
                        <div style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          flexDirection: "row",
                          alignItems: "flex-end",
                          gap: "20px",
                          marginRight: "20px",
                        }}>
                          <FeedbackButton
                            onClick={() => handleSummaryFeedback(true)}
                            isActive={likeAnimation || (feedbackSubmitted && selectedFeedback === true)}
                            style={{ opacity: feedbackSubmitted && selectedFeedback !== true ? 0.5 : 1 }}
                          >
                            <FeedbackIconWrapper isActive={likeAnimation || (feedbackSubmitted && selectedFeedback === true)}>
                              {feedbackSubmitted && selectedFeedback === true ? <BsHandThumbsUpFill /> : <SlLike />}
                            </FeedbackIconWrapper>
                            Helpful
                          </FeedbackButton>
                          <FeedbackButton
                            onClick={() => handleSummaryFeedback(false)}
                            isActive={dislikeAnimation || (feedbackSubmitted && selectedFeedback === false)}
                            style={{ opacity: feedbackSubmitted && selectedFeedback !== false ? 0.5 : 1 }}
                          >
                            <FeedbackIconWrapper isActive={dislikeAnimation || (feedbackSubmitted && selectedFeedback === false)}>
                              {feedbackSubmitted && selectedFeedback === false ? <BsHandThumbsDownFill /> : <SlDislike />}
                            </FeedbackIconWrapper>
                            Not helpful
                          </FeedbackButton>
                        </div>
                      </Footer>
                    </CardContainer>
                  </>
                )}
              </div>
            </div>
          </>
        )}

{modalOpen && (
  <ModalOverlay>
    <ModalContent>
      <CloseButton onClick={() => setModalOpen(false)}>
        <IoClose />
      </CloseButton>
      <h3>Optimized Code</h3>
      <Editor
        height="300px"
        language={selectedLang || "plaintext"}
        value={optimisedCode}
        theme="vs-light"
      />
      <ButtonGroup>
        <ModalButton
          onClick={() => {
            setCode(optimisedCode);
            // setOutput("");
            setModalOpen(false);
            setOptimizationUsed(true);
            setShowOptimiseBtn(false);
          }}
        >
          Apply to your Code
        </ModalButton>
      </ButtonGroup>
    </ModalContent>
  </ModalOverlay>
)}

        {showFeedbackPopup && (
          <FeedbackPopup>
            <FeedbackIcon isHelpful={isHelpful}>
              {isHelpful ? '✓' : '✕'}
            </FeedbackIcon>
            <FeedbackContent>
              <FeedbackTitle>Feedback Received</FeedbackTitle>
              <FeedbackMessage>{feedbackMessage}</FeedbackMessage>
            </FeedbackContent>
            <FeedbackCloseButton onClick={() => setShowFeedbackPopup(false)}>
              <IoCloseSharp />
            </FeedbackCloseButton>
          </FeedbackPopup>
        )}
      </Wrapper>
    </>
  );
};

export default QBCodingPage;