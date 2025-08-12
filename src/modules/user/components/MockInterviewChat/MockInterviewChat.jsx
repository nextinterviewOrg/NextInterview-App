import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Conversation,
  EndBtn,
  TimerBtn,
  ChatBox,
  Message,
  Sender,
  Text,
  Img,
  InputBox,
  Input,
  Profile,
  Sendicon,
  CharCount,
  SendButton,
  InputTab,
  InputWrapper,
  ModalOverlay,
    ModalContent,
    CloseButton,
    ButtonGroup,
    ModalButton,
    ConversationBox,
} from "./MockInterviewChat.style";
import { LuSend } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import processing from "../../../../assets/processing.gif";
import { IoHourglassOutline } from "react-icons/io5";
import UserHeader from "../../../../components/UserHeader/UserHeader";
import HeaderWithLogo from "../../../../components/HeaderWithLogo/HeaderWithLogo";
import { message as antdMessage } from "antd";
import ReadyToCode from "../../components/Compiler/ReadyToCode";
import {IoClose } from "react-icons/io5";
import Editor from "@monaco-editor/react";

const EXTERNAL_API_BASE = "https://nextinterview.ai/fastapi/mock";

const MockInterview = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [questionCount, setQuestionCount] = useState(1);
  const [clarificationMode, setClarificationMode] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [processingData, setProcessingData] = useState(false);
  const [error, setError] = useState("");
  const MAX_WORDS = 50;
  const navigate = useNavigate();
  const location = useLocation();
  const session_id = location.state?.session_id;
  const initialQuestion = location.state?.first_follow_up;
  const baseQuestion = location.state?.question;
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [code, setCode] = useState("");
  const [selectLang, setSelectLang] = useState("python");
  const [output, setOutput] = useState("");
  const [readyToCode, setReadyToCode] = useState(false);
  
  // New states for ReadyToCode component
  const [runClicked, setRunClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

   const [optimizeClicked, setOptimizeClicked] = useState(false);
  const [optimisedCode, setOptimisedCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [optimizationApplied, setOptimizationApplied] = useState(false);
const { 
  feedbacks, 
  metrics, 
  summary, 
  base_question, 
  questions,
  user_code, 
  code_output, 
  language 
} = location.state || {};

  // Add this new function for optimization
  const handleOptimizeCode = async () => {
    try {
      const response = await fetch(
        "https://nextinterview.ai/fastapi/code/optimize-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: baseQuestion,
            user_code: code,
            language: selectLang,
            session_id: session_id
          }),
        }
      );
      const data = await response.json();
      setOptimisedCode(data.optimized_code);
      setModalOpen(true);
    } catch (err) {
      console.error("Error fetching optimized code:", err);
      antdMessage.error("Failed to optimize code. Please try again.");
    }
  };


  console.log("setlang", selectLang);
 
  // On mount, show the initial question
  useEffect(() => {
    if (session_id && initialQuestion) {
      setMessages([
        {
          sender: "AI",
          text: initialQuestion,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        },
      ]);
    }
    setProcessingData(false);
  }, [session_id, initialQuestion]);

  useEffect(() => {
    setTimeLeft(900);
    setIsRunning(true);
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (timeLeft === 0) {
      setIsRunning(false);
      antdMessage.info("Time's up! Ending the interview...");
      setTimeout(() => {
        handleEndInterview();
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Add your submission logic here
    console.log("Submitting code...");
    // You might want to call an API to submit the code
    setTimeout(() => {
      setIsSubmitting(false);
      antdMessage.success("Code submitted successfully!");
    }, 2000);
  };

  const tryHarderQuestion = () => {
    console.log("Try harder question requested");
    // Add logic to fetch a harder question
    antdMessage.info("Fetching a more challenging question...");
  };

  const countWords = (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    if (countWords(newText) <= MAX_WORDS) {
      setInput(newText);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !session_id) return;
    setProcessingData(true);
    setError("");
    try {
      const response = await fetch(`${EXTERNAL_API_BASE}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id,
          answer: input,
          ready_to_code: readyToCode,
          code_stub: code,
          language: selectLang,
          clarification: clarificationMode,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) setError("Session not found.");
        else if (response.status === 422) setError("Invalid input. Please try again.");
        else setError("Server error. Please try again later.");
        setProcessingData(false);
        return;
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "M",
          text: input,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        },
      ]);
      setInput("");

      if (data?.ready_to_code) setReadyToCode(true);
      else setReadyToCode(false);

      if (data.question) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "AI",
            text: data.question,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          },
        ]);
      }

      if (data.code_stub) setCode(data.code_stub);
      if (data.language) setSelectLang(data.language);

      if (!clarificationMode) {
        if (questionCount < 4) setQuestionCount((prev) => prev + 1);
        else setClarificationMode(true);
      }
    } catch {
      setError("Failed to send answer. Please try again.");
    } finally {
      setProcessingData(false);
    }
  };

const handleEndInterview = async () => {
  if (!session_id) return;
  setProcessingData(true);
  setError("");
  try {
    // Determine if this is a coding interview (we can check if readyToCode was true)
    const isCodingInterview = readyToCode;
    
    const requestBody = isCodingInterview 
      ? { code, output } 
      : {};

    const response = await fetch(`${EXTERNAL_API_BASE}/feedback/${encodeURIComponent(session_id)}`, {
      method: "POST", // Changed from GET to POST
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      setError("Failed to fetch feedback. Please try again.");
      setProcessingData(false);
      return;
    }

    const data = await response.json();
    setFeedback(data);

    navigate("/user/interview/interview-feedback", {
      state: {
        feedbacks: data,
        metrics: data.metrics,
        summary: data.summary,
        base_question: data.base_question,
        questions: data.questions,
        ...(isCodingInterview && { // Include code-related data if coding interview
          user_code: code,
          code_output: output,
          language: selectLang
        })
      },
    });
  } catch {
    setError("Failed to fetch feedback. Please try again.");
  } finally {
    setProcessingData(false);
  }
};

  return (
    <>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <HeaderWithLogo />
          <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginLeft: "35%" }}>MOCK INTERVIEW</h2>
          {/* <UserHeader /> */}
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 108px)" }}>
        <div style={{ width: showCodeEditor ? "60%" : "100%", transition: "width 0.3s", overflowY: "auto" }}>
          <Container>
            <Header>
              <TimerBtn isRunning={isRunning}>
                <IoHourglassOutline />
                {timeLeft !== null
                  ? `${Math.floor(timeLeft / 60).toString().padStart(2, "0")}:${(timeLeft % 60)
                      .toString()
                      .padStart(2, "0")} mins`
                  : "15:00 mins"}
              </TimerBtn>
              <hr style={{ margin: "0" }} />
              <EndBtn onClick={handleEndInterview}>End interview</EndBtn>
            </Header>

            {initialQuestion && (
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "20px",
                  fontWeight: "400",
                  fontSize: "1rem",
                  margin: "20px",
                  borderRadius: "8px",
                }}
              >
                Problem Statement:
                <br />
                <p style={{ fontSize: "16px", fontWeight: "400" }} dangerouslySetInnerHTML={{ __html: baseQuestion }} />
              </div>
            )}

            <ConversationBox> 

            <Conversation> Conversation </Conversation>

            <ChatBox>
              {messages.map((msg, index) => (
                <Message key={index} sender={msg.sender}>
                  <Profile>
                    <Sender sender={msg.sender}>{msg.sender}</Sender>
                    <span className="realtime">{msg.time}</span>
                  </Profile>
                  <Text sender={msg.sender}>{msg.text}</Text>
                </Message>
              ))}
              {processingData && (
                <>
                  <Img src={processing} alt="processing" />
                  Processing
                </>
              )}
              {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
            </ChatBox>

            <InputBox>
              <InputTab>
                <InputWrapper>
                  <Input
                    type="textarea"
                    placeholder={
                      clarificationMode ? "Ask for clarification or feedback..." : "Enter your response here..."
                    }
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    disabled={processingData || !!feedback}
                  />
                </InputWrapper>
                {!feedback && (
                  <Sendicon onClick={handleSend}>
                    <LuSend />
                  </Sendicon>
                )}
                <CharCount>
                  {countWords(input)} / {MAX_WORDS}
                </CharCount>
              </InputTab>

              {readyToCode && (
                <SendButton show={showCodeEditor} onClick={() => setShowCodeEditor(true)}>
                  Ready to code
                </SendButton>
              )}
            </InputBox>
            </ConversationBox>
          </Container>
        </div>
        

        {showCodeEditor && (
          <div style={{ width: "40%", height: "100%" }}>
            <ReadyToCode
              code={code}
              setCode={setCode}
              selectLang={selectLang}
              setSelectLang={setSelectLang}
              output={output}
              setOutput={setOutput}
              showCodeEditor={showCodeEditor}
              setRunClicked={setRunClicked}
              showOptimiseBtn={true}
              handleOptimizeCode={handleOptimizeCode}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              challenge={false}
              tryHarderQuestion={tryHarderQuestion}
            />
          </div>
        )}
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
                      language={selectLang || "plaintext"}
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
    </>
  );
};

export default MockInterview;