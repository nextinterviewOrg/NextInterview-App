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
  // FeedbackIconWrapper,  
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
// import { VscInfo, VscDebugRestart } from "react-icons/vsc";
// import { PiTimer, PiStarFour } from "react-icons/pi";
// ... (imports remain unchanged)

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

  // const [timeLeft, setTimeLeft] = useState(20);
  // const [solutionTimeExpired, setSolutionTimeExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    // Get saved time from localStorage or use default (20)
    const savedTime = localStorage.getItem(`challengeTimer_${id}`);
    return savedTime ? parseInt(savedTime) : 60;
  });

  const [solutionTimeExpired, setSolutionTimeExpired] = useState(() => {
    // Check if timer was previously expired
    return localStorage.getItem(`challengeExpired_${id}`) === 'true';
  });


  useEffect(() => {
    let timer;

    if (activeTab === "mycode" && !solutionTimeExpired) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;

          // Save to localStorage on every change
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

  // Reset timer when needed (e.g., when changing challenges)
  useEffect(() => {
    return () => {
      // Cleanup when component unmounts or challenge changes
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
        // alert("Congratulations! Your solution is correct and progress has been saved.");
        navigate("/user/challenges");
      } else {
        notification.error({
          message: "Your output doesn't match the expected result. Please try again.",
          duration: 3,
        })
        // alert("Your output doesn't match the expected result. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit your solution. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptimizeCode = () => {
    setModalOpen(true);
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
            user_code: code,
            sample_input: challenge?.input,
            sample_output: challenge?.output,
            user_id: user_id,
          }),
        }
      );
      const data = await response.json();
      setOptimisedCode(data.optimized_code);
    } catch (err) {
      console.error("Error fetching optimized code:", err);
    }
  };

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await getChallengeById(id);
        setChallenge(response.data);
        console.log("Fetched challenge:", response);
        setCode(response.data?.base_code);
        setInput(response.data?.input);
        setSelectedLang(
          response.data.programming_language === "Python" ? "python" : "mysql"
        );
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

    console.log("Expected:", JSON.stringify(expectedOutput));
    console.log("Actual:", JSON.stringify(actualOutput));

    if (expectedOutput === actualOutput) {
      // proceed (you could optionally auto-trigger submit or show message)
    } else {
      // Don't show error here unless user explicitly runs
      if (runClicked) {
        notification.error({
          message: "Your output doesn't match the expected result. Please try again.",
          duration: 3,
        });
      }
    }
  }, [challenge, output, runClicked]);


  useEffect(() => {
    let timer;

    if (activeTab === "mycode" && !solutionTimeExpired) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setSolutionTimeExpired(true);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [activeTab, solutionTimeExpired]);

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
                <strong>Description:</strong>
                <div dangerouslySetInnerHTML={{ __html: challenge?.description }}  className="description"/>
              </p>
              <p><strong>Input:</strong>{challenge?.programming_language === "Python" ? <p> {challenge?.input}</p> : <pre style={{maxwidth: '300px', overflowX: 'auto', wordBreak: 'break-word'}} > {challenge?.input}</pre>}</p>
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
                  onClick={() => solutionTimeExpired && setActiveTab('solution')}
                  disabled={!solutionTimeExpired}
                  style={{
                    opacity: solutionTimeExpired ? 1 : 0.6,
                    cursor: solutionTimeExpired ? 'pointer' : 'not-allowed',
                  }}
                >
                  Show Solution
                  {!solutionTimeExpired && (
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
                showOptimiseBtn={showOptimiseBtn}
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
                  language={setSelectedLang === "python" ? "python" : "mysql"}
                  value={challenge.solutionCode}
                  // onChange={setCode}
                  theme="vs-light"

                />

                <CardContainer>
                  <TitleforSolution>Code Explaination</TitleforSolution>

                  <Paragraph>
                    {challenge?.solutionExplanation || "No code explaination available."}
                  </Paragraph>

                  <Footer>
                    {/* <TryHarderLink onClick={handleTryHarderQuestion} ><PiStarFour /> Try harder question</TryHarderLink> */}

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
                  onClick={() => {
                    setCode(optimisedCode);
                    setModalOpen(false);
                    setOptimizeClicked(true);
                    setOptimizationApplied(true); // ✅ disable further optimize actions
                  }}
                >
                  Apply to your Code
                </ModalButton>
              </ButtonGroup>
            </ModalContent>
          </ModalOverlay>
        )}

        {/* Feedback Popup */}
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
