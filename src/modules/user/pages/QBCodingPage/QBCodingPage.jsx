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
  FeedBacks
} from "./QBCodingPage.Styles";
import ReadyToCode from "../../components/Compiler/ReadyToCode";
import { IoChevronBackSharp, IoClose } from "react-icons/io5";
import HintChallenges from "../../../admin/components/Challenges/HintChallenges/HintChallenges";
import { getQuestionBankById } from "../../../../api/questionBankApi";
import { addQuestionToQuestionProgressTIYQB } from "../../../../api/tiyQbCodingQuestionProgressApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import { notification } from "antd";
import Editor from "@monaco-editor/react";
import { VscInfo } from "react-icons/vsc";
import { PiTimer } from "react-icons/pi";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { PiStarFour, PiThumbsUpLight, PiThumbsDownLight } from "react-icons/pi";

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
  const [timeLeft, setTimeLeft] = useState(20);
  const [solutionTimeExpired, setSolutionTimeExpired] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState(null);
  const [hintIndex, setHintIndex] = useState(null);

  // Get question ID from location.state
  useEffect(() => {
    if (location.state?.questionID) {
      setQuestionID(location.state.questionID);
    }
  }, [location.state]);

  // Fetch user ID by Clerk ID
  useEffect(() => {
    const fetchUserId = async () => {
      if (user?.id) {
        try {
          const res = await getUserByClerkId(user.id);
          if (res.success) {
            setUserId(res.data._id);
          }
        } catch (err) {
          console.error("Error fetching user ID:", err);
        }
      }
    };
    fetchUserId();
  }, [user]);

  // Fetch question details
  useEffect(() => {
    const fetchQuestion = async () => {
      if (!questionID) return;
      setLoading(true);
      try {
        const res = await getQuestionBankById(questionID);
        console.log("Fetched question:", res);
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
          });
          setCode(q.base_code || "");
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

  // Trigger code optimization if output matches expected
  useEffect(() => {
    const optimizeCode = async () => {
      if (!output || !question) return;

      if (output.trim() === question.output.trim()) {
        setShowOptimiseBtn(true);
        try {
          const response = await fetch(
            "https://f9ma89kmrg.execute-api.ap-south-1.amazonaws.com/default/mock-interview-api/optimize-code",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                question: question.QuestionText,
                user_code: code,
                sample_input: question.input,
                sample_output: question.output,
              }),
            }
          );

          const data = await response.json();
          setOptimisedCode(data.optimized_code || "");
        } catch (error) {
          console.error("Error optimizing code:", error);
        }
      } else {
        setShowOptimiseBtn(false);
      }
    };

    optimizeCode();
  }, [output, question, code]);

  useEffect(() => {
    if (timeLeft === 0) {
      setSolutionTimeExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, [timeLeft]);


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
        questionId: questionID,
        userId,
        answer: code,
        finalResult: output.trim() === question.output.trim(),
        output,
        skip: false,
      };

      const res = await addQuestionToQuestionProgressTIYQB(submissionData);

      if (res.success) {
        notification.success({ message: "Question submitted successfully" });
        navigate("/user/mainQuestionBank", { state: location.state });
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
                {question?.difficulty}
              </QusnDifficulty>
              
            </QusnType>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "flex-start",
              }}
            >
              <QuestionContainer>
                <Title>Question</Title>
                <QuestionBox>
                  <p>
                    <strong>Description:</strong>
                  </p>
                  <div
                    dangerouslySetInnerHTML={{ __html: question?.description }}
                  />
                  <p>
                    <strong>Input:</strong> {question?.input}
                  </p>
                  <p >
                    <strong>
                      Output:
                      <br />
                      <pre >{question?.output}</pre>
                    </strong>
                  </p>
                </QuestionBox>
              </QuestionContainer>

              <div style={{ flex: 1 }}>
                <TabsWrapper>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <TabButton
                      active={activeTab === "mycode"}
                      onClick={() => setActiveTab("mycode")}
                    >
                      My Code
                    </TabButton>

                    <TabButton
                      active={activeTab === "solution"}
                      onClick={() => {
                        if (solutionTimeExpired) {
                          setActiveTab("solution");
                        }
                      }}
                      disabled={!solutionTimeExpired}
                      style={{
                        opacity: solutionTimeExpired ? 1 : 0.6,
                        cursor: solutionTimeExpired ? "pointer" : "not-allowed",
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
                    input={input}
                    setInput={setInput}
                    dbSetupCommands={question?.dbSetupCommands}
                    showOptimiseBtn={showOptimiseBtn}
                    handleOptimizeCode={() => setModalOpen(true)}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}

                {activeTab === "solution" && (
                  <>
                    <div
                      style={{
                        background: "#f4f4f4",
                        padding: "20px",
                        borderRadius: "8px",
                        minHeight: "300px",
                        whiteSpace: "pre-wrap",
                        fontFamily: "monospace",
                        fontSize: "14px",
                      }}
                    >
                      <h3>Solution Code:</h3>
                      <code>
                        {question?.solution || "No solution available."}
                      </code>
                    </div>

                    <CardContainer>
                      <TitleforSolution>Code Explaination</TitleforSolution>

                      <Paragraph>
                        Data analytics
                      </Paragraph>

                      <Footer>
                        <TryHarderLink href="#"><PiStarFour/> Try harder question</TryHarderLink>

                        <FeedBacks>
                        <FeedbackButton><PiThumbsUpLight /> Helpful</FeedbackButton>
                        <FeedbackButton><PiThumbsDownLight/> Not helpful</FeedbackButton>
                        </FeedBacks>
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
                    setOutput("");
                    setModalOpen(false);
                  }}
                >
                  Apply to your Code
                </ModalButton>
              </ButtonGroup>
            </ModalContent>
          </ModalOverlay>
        )}
      </Wrapper>
    </>
  );
};

export default QBCodingPage;
