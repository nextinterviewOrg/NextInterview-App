import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";
import {
  getChallengeById,
  submitUserChallengeProgress,
} from "../../../../api/challengesApi";
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
  FeedbackIconWrapper,
  CardContainer,
  TitleforSolution,
  Paragraph,
  Footer,
  TryHarderLink,
  FeedbackButton,
  FeedbackPopup,
  FeedbackIcon,
  FeedbackContent,
  FeedbackTitle,
  FeedbackMessage,
  FeedbackCloseButton,
} from "./CodeEditorWindow.styles";
import ReadyToCode from "../Compiler/ReadyToCode";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import Editor from "@monaco-editor/react";
import { IoChevronBackSharp, IoClose, IoCloseSharp } from "react-icons/io5";
import { VscInfo } from "react-icons/vsc";
import { PiTimer } from "react-icons/pi";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { VscDebugRestart } from "react-icons/vsc";
import { notification } from "antd";
import { BsHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";
import { SlLike, SlDislike } from "react-icons/sl";

const CodeEditorWindow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedLang, setSelectedLang] = useState("");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOptimiseBtn, setShowOptimiseBtn] = useState(false);
  const [runClicked, setRunClicked] = useState(false);
  const [optimizeClicked, setOptimizeClicked] = useState(false);
  const [optimisedCode, setOptimisedCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("mycode");
  const [showHint, setShowHint] = useState(false);
  const [optimizationApplied, setOptimizationApplied] = useState(false);

  const [isHelpful, setIsHelpful] = useState(null);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [dislikeAnimation, setDislikeAnimation] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem(`challengeTimer_${id}`);
    return savedTime ? parseInt(savedTime) : 60;
  });

  const [solutionTimeExpired, setSolutionTimeExpired] = useState(() => {
    return localStorage.getItem(`challengeExpired_${id}`) === 'true';
  });

  // Store optimized code in localStorage
const [storedOptimizedCode, setStoredOptimizedCode] = useState(() => {
  return localStorage.getItem(`optimizedCode_${id}`) || null; // Remove JSON.parse
});

    const [optimizationUsed, setOptimizationUsed] = useState(false);

  useEffect(() => {
    let timer;

    if (activeTab === "mycode" && !solutionTimeExpired) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          localStorage.setItem(`challengeTimer_${id}`, newTime.toString());
          if (newTime <= 0) {
            clearInterval(timer);
            setSolutionTimeExpired(true);
            localStorage.setItem(`challengeExpired_${id}`, 'true');
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [activeTab, solutionTimeExpired, id]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(`challengeTimer_${id}`);
      localStorage.removeItem(`challengeExpired_${id}`);
    };
  }, [id]);

  const handleGoBack = () => {
    navigate(`/user/challengeInfo/${id}/true`);
  };

  const handleSubmit = async () => {
    if (!challenge || !user || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const userData = await getUserByClerkId(user.id);
      const userId = userData.data.user._id;

      const expectedOutput = challenge.output?.trim();
      const actualOutput = output?.trim();

      if (expectedOutput === actualOutput) {
        const payload = {
          questionId: challenge._id,
          userId,
          answer: code,
          finalResult: true,
          skip: false,
        };

        const result = await submitUserChallengeProgress(payload);
        notification.success({
          message: "Congratulations!\n Your solution is correct and progress has been saved.",
          duration: 3
        });
        navigate("/user/challenges");
      } else {
        notification.error({
          message: "Your output doesn't match the expected result. Please try again.",
          duration: 3,
        })
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit your solution. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptimizeCode = () => {
    // Only allow optimization if output is not an error and not already optimized
    if (!output.includes("Error") && !output.includes("error") && !output.includes("Exception")) {
      setModalOpen(true);
      fetchOptimizedCode();
    } else {
      notification.error({
        message: "Cannot optimize code with errors. Please fix your code first.",
        duration: 3,
      });
    }
  };

  const normalize = (str) =>
    str?.replace(/\r\n/g, '\n').replace(/\s+$/, '').trim();

const fetchOptimizedCode = async () => {
  const userId = await getUserByClerkId(user.id);
  const user_id = userId.data.user._id;
  try {
    const response = await fetch(
      "https://nextinterview.ai/fastapi/code/optimize-code",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: challenge?.QuestionText,
          description: challenge?.description,
          user_code: code,
          sample_input: challenge?.input,
          sample_output: challenge?.output,
          user_id: user_id,
        }),
      }
    );
    const data = await response.json();
    setOptimisedCode(data.optimized_code);
    
    // Store optimized code directly (no JSON.stringify needed)
    localStorage.setItem(`optimizedCode_${id}`, data.optimized_code);
    setStoredOptimizedCode(data.optimized_code);
  } catch (err) {
    console.error("Error fetching optimized code:", err);
  }
};

  const applyOptimizedCode = () => {
    setCode(optimisedCode);
    setModalOpen(false);
    setOptimizationUsed(true); // Mark optimization as used in this session
    setShowOptimiseBtn(false); // Hide optimize button after applying
  };

    useEffect(() => {
    if (code !== optimisedCode && code !== storedOptimizedCode?.code) {
      setOptimizationUsed(false);
    }
  }, [code, optimisedCode, storedOptimizedCode]);

  // Show optimize button logic
  const shouldShowOptimizeBtn = () => {
    // Don't show if already optimized in this session
    if (optimizationUsed) return false;
    
    // Show if there's output and no errors
    return output && 
           !output.includes("Error") && 
           !output.includes("error") && 
           !output.includes("Exception");
  };


// In the fetchChallenge function:
useEffect(() => {
  const fetchChallenge = async () => {
    try {
      const response = await getChallengeById(id);
      setChallenge(response.data);
      setCode(response.data?.base_code);
      setInput(response.data?.input);
      setSelectedLang(
        response.data.programming_language === "Python" ? "python" : "mysql"
      );
      
      // Get stored optimized code directly (no JSON.parse needed)
      const storedCode = localStorage.getItem(`optimizedCode_${id}`);
      if (storedCode) {
        setStoredOptimizedCode(storedCode);
      }
    } catch (err) {
      setError("Failed to load challenge data.", err);
    } finally {
      setLoading(false);
    }
  };
  fetchChallenge();
}, [id]);

  useEffect(() => {
    if (!challenge || !output) return;

    const expectedOutput = normalize(challenge.output);
    const actualOutput = normalize(output);

    if (expectedOutput === actualOutput) {
      // Show success message if run was clicked
      if (runClicked) {
        notification.success({
          message: "Your output matches the expected result!",
          duration: 2,
        });
      }
    } else {
      if (runClicked) {
        notification.error({
          message: "Your output doesn't match the expected result. Please try again.",
          duration: 3,
        });
      }
    }
  }, [challenge, output, runClicked]);

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

  if (loading) return <div style={{ textAlign: "center" }}>Loading challenge...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      <BackButton onClick={handleGoBack}>
        <IoChevronBackSharp /> Back
      </BackButton>

      <Wrapper>
        <QusnType>
          <QusnText>{challenge.QuestionText}</QusnText>
          <QusnDifficulty difficulty={challenge.difficulty}>{challenge.difficulty}</QusnDifficulty>
        </QusnType>

        <div className="question-container">
          <QuestionContainer>
            <Title>Question</Title>
            <QuestionBox>
              <p>
                <div dangerouslySetInnerHTML={{ __html: challenge?.description }} className="description"/>
              </p>
              <p><strong>Output:</strong>
                {challenge.programming_language === "Python" ? (
                  <p> {challenge?.output}</p>
                ) : (
                  <pre style={{
                    maxwidth: '300px',
                    overflowX: 'auto',
                    wordBreak: 'break-word'
                  }} > {challenge?.output}</pre>
                )} </p>
            </QuestionBox>
          </QuestionContainer>

          <div style={{ flex: 1 }}>
            <TabsWrapper>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TabButton active={activeTab === 'mycode'} onClick={() => setActiveTab('mycode')}>
                  My Code
                </TabButton>

                <TabButton
                  active={activeTab === 'solution'}
                  onClick={() => {
                    if (solutionTimeExpired || storedOptimizedCode) {
                      setActiveTab('solution');
                    }
                  }}
                  disabled={!solutionTimeExpired && !storedOptimizedCode}
                  style={{
                    opacity: (solutionTimeExpired || storedOptimizedCode) ? 1 : 0.6,
                    cursor: (solutionTimeExpired || storedOptimizedCode) ? 'pointer' : 'not-allowed',
                  }}
                >
                  {storedOptimizedCode ? "Show Solution" : "Solution"}
                  {!solutionTimeExpired && !storedOptimizedCode && (
                    <TimerText>
                      <PiTimer style={{ marginRight: "5px" }} />
                      {timeLeft}secs
                    </TimerText>
                  )}
                </TabButton>
              </div>

              <LanguageSelectWrapper>
                <HintWrapper onMouseEnter={() => setShowHint(true)} onMouseLeave={() => setShowHint(false)}>
                  <HintButton>Hint <VscInfo /></HintButton>
                  {showHint && (
                    <HintTooltip>
                      {Array.isArray(challenge.hints) && challenge.hints.length > 0 ? (
                        challenge.hints.map((hintObj, index) => (
                          <HintCard key={hintObj._id || index}>
                            <HintIcon><HiOutlineLightBulb /></HintIcon>
                            <HintContent>
                              <HintTitle>{hintObj.hint_text}</HintTitle>
                              <HintExplanation>{hintObj.explanation}</HintExplanation>
                            </HintContent>
                          </HintCard>
                        ))
                      ) : (
                        "No hints available for this question."
                      )}
                    </HintTooltip>
                  )}
                </HintWrapper>

                <LanguageSelect>
                  <button style={{ border: 'none', display: 'flex', background: 'none', color: '#007c91' }} onClick={() => {
                    setCode(challenge.base_code);
                    setSelectedLang(challenge.programming_language === "MySQL" ? "mysql" : "python");
                    setOutput("");
                  }}>
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
      dbSetupCommands={challenge.dbSetupCommands}
      input={input}
      setInput={setInput}
      setRunClicked={setRunClicked}
      showOptimiseBtn={shouldShowOptimizeBtn()}
      handleOptimizeCode={handleOptimizeCode}
      optimizeClicked={optimizeClicked}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      solutionTimeExpired={solutionTimeExpired}
      challenge={true}
    />
  )}
{activeTab === "solution" && (
  <>
    <Editor
      height="200px"
      language={selectedLang === "python" ? "python" : "mysql"}
      value={storedOptimizedCode || challenge.solutionCode} // Use directly
      theme="vs-light"
    />

                <CardContainer>
                  <TitleforSolution>Code Explanation</TitleforSolution>
                  <Paragraph>
                    {challenge?.solutionExplanation || "No code explanation available."}
                  </Paragraph>

                  <Footer>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        alignItems: "flex-end",
                        gap: "20px",
                        marginRight: "20px",
                      }}
                    >
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

        {modalOpen && (
          <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={() => setModalOpen(false)}>
                <IoClose />
              </CloseButton>
              <h3>Optimised Code</h3>
              <Editor
                height="300px"
                language={selectedLang || "plaintext"}
                value={optimisedCode}
                theme="vs-light"
              />
              <ButtonGroup>
                <ModalButton
                  onClick={applyOptimizedCode}
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

export default CodeEditorWindow;