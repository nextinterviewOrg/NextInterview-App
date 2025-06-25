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
} from "./MockInterviewChat.style";
import { LuSend } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import processing from "../../../../assets/processing.gif";
import { IoHourglassOutline } from "react-icons/io5";
import UserHeader from "../../../../components/UserHeader/UserHeader";
import HeaderWithLogo from "../../../../components/HeaderWithLogo/HeaderWithLogo";
import { message as antdMessage } from "antd";
import ReadyToCode from "../../components/Compiler/ReadyToCode";
 
const EXTERNAL_API_BASE =
  "https://nextinterview.ai/fastapi/mock";
 
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
 
  // Timer logic (unchanged)
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
 
  const countWords = (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };
 
  const handleInputChange = (e) => {
    const newText = e.target.value;
    if (countWords(newText) <= MAX_WORDS) {
      setInput(newText);
    }
  };
 
  // Add this handler
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
 
  // Handle sending an answer or clarification
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
 
      console.log("Response:", response);
      if (!response.ok) {
        if (response.status === 404) setError("Session not found.");
        else if (response.status === 422)
          setError("Invalid input. Please try again.");
        else setError("Server error. Please try again later.");
        setProcessingData(false);
        return;
      }
      const data = await response.json();
 
      console.log("Data:", data);
      // Add user message
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
 
      if (data?.ready_to_code === true) {
        setReadyToCode(true);
      } else {
        setReadyToCode(false);
      }
      // Add AI response
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
 
      if(data.code_stub){
        setCode(data.code_stub);
 
        console.log("Code:", code);
      }
 
      if (data.language) {
        setSelectLang(data.language);
        console.log("Language:", selectLang);
      }
      // Question loop logic
      if (!clarificationMode) {
        if (questionCount < 4) {
          setQuestionCount((prev) => prev + 1);
        } else {
          setClarificationMode(true);
        }
      }
    } catch {
      setError("Failed to send answer. Please try again.");
    } finally {
      setProcessingData(false);
    }
  };
 
  // Handle end interview and fetch feedback
  const handleEndInterview = async () => {
    if (!session_id) return;
    setProcessingData(true);
    setError("");
    try {
      const response = await fetch(
        `${EXTERNAL_API_BASE}/feedback/${encodeURIComponent(session_id)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        setError("Failed to fetch feedback. Please try again.");
        setProcessingData(false);
        return;
      }
      const data = await response.json();
      setFeedback(data);
    } catch {
      setError("Failed to fetch feedback. Please try again.");
    } finally {
      setProcessingData(false);
    }
  };
 
  // If feedback is present, show feedback summary
  if (feedback) {
    navigate("/user/interview/interview-feedback", { state: { feedback } });
    return null;
  }
 
  return (
    <>
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <HeaderWithLogo />
        <h2 style={{ margin: "0" }}>MOCK INTERVIEW</h2>
        <UserHeader />
      </div>
      </div>
 
      <div style={{ display:"flex", height:"calc(100vh - 108px)"}}>
      <div style ={{width: showCodeEditor ? "60%" : "100%", transsition: "width 0.3s", overflowY:"auto"}}>
 
      <Container>
        <Header>
          <TimerBtn isRunning={isRunning}>
            <IoHourglassOutline />{" "}
            {timeLeft !== null
                ? `${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')} mins`
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
        fontWeight: "bold",
        fontSize: "1rem",
        margin: "20px",
        borderRadius: "8px",
        paddingTop:"20px"
      }}
    >
      Problem Statement:
      <br />
      <p style={{ fontSize: "16px", fontWeight: "600" }}>{baseQuestion}</p>
    </div>
  )}
 
        <Conversation> Conversation </Conversation>
 
        <ChatBox>
          {messages.map((msg, index) => (
            <Message key={index} sender={msg.sender}>
              <Profile>
                <Sender sender={msg.sender}>{msg.sender}</Sender>
                <span className="realtime">{msg.time}</span>
              </Profile>
              <Text>{msg.text}</Text>
            </Message>
          ))}
          {processingData && (
            <>
              <Img src={processing} alt="pr" />
              Processing
            </>
          )}
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </ChatBox>
        <InputBox>
        <InputTab>
          <Input
            type="textarea"
            placeholder={
              clarificationMode
                ? "Ask for clarification or feedback..."
                : "Enter your response here..."
            }
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            disabled={processingData || !!feedback}
          />
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
      </Container>
      </div>
 
      {showCodeEditor && (
        <div style={{width: "40%", height: "100%"}}>
          <ReadyToCode
          code={code}
          setCode={setCode}
          selectLang={selectLang}
          setSelectLang={setSelectLang}
          output={output}
          setOutput={setOutput}
          showCodeEditor={showCodeEditor}
          />
         
        </div>
      )}
    </div>
    </>
  );
};
 
export default MockInterview;
 