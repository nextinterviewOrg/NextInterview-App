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
  SendButton
} from "./MockInterviewChat.style";
import { LuSend } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import processing from "../../../../assets/processing.gif"
import { IoHourglassOutline } from "react-icons/io5";
import UserHeader from "../../../../components/UserHeader/UserHeader";
import HeaderWithLogo from "../../../../components/HeaderWithLogo/HeaderWithLogo";
import { endInterview, getMockInterviewResponse, runmockinterviewThread, sendUserMessage } from "../../../../api/aiMockInterviewApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
const MockInterview = () => {
  const [messages, setMessages] = useState([
  ]);

  const [input, setInput] = useState("");
  const MAX_WORDS = 50;
  const navigate = useNavigate();
  const location = useLocation();
  const [runId, setRunId] = useState(null);
  const [processingData, setProcessingData] = useState(false);

  const { isLoaded, user, isSignedIn } = useUser();
  useEffect(() => {
    const apiCaller = async () => {
      console.log("calling 1");
      console.log("location", location);
      const response = await getMockInterviewResponse({ thread_id: location.state.threadId, run_id: location.state.runId });
      console.log("response run", response);
      const message = response.data.data.map((response) => {
        return { sender: response.role === "user" ? "M" : "AI", text: response.content[0].text.value, time: new Date(response.created_at).getHours() + ":" + new Date(response.created_at).getMinutes() }
      });
      console.log("messages", message);
      setMessages(message.reverse());
      setProcessingData(false);
    }
    apiCaller();
  }, [location]);
  useEffect(() => {
    const apiCaller = async () => {
      console.log("calling 2");
      console.log("location", location);
      const response = await getMockInterviewResponse({ thread_id: location.state.threadId, run_id: runId });
      console.log("response run", response);
      const message = response.data.data.map((response) => {
        return { sender: response.role === "user" ? "M" : "AI", text: response.content[0].text.value, time: new Date(response.created_at).getHours() + ":" + new Date(response.created_at).getMinutes() }
      });
      console.log("messages", message);
      setMessages(message.reverse());
      setProcessingData(false);
    }
    apiCaller();
  }, [runId]);



  const countWords = (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const handleInputChange = (e) => {
    console.log("calling 4");
    const newText = e.target.value;
    if (countWords(newText) <= MAX_WORDS) {
      setInput(newText);
    }
  };

  const handleSend = async () => {
    console.log("calling 3");
    setProcessingData(true);
    if (input.trim()) {

      const response = await sendUserMessage({ thread_id: location.state.threadId, message: input });
      console.log("response run", response);
      const runThreadResponse = await runmockinterviewThread({ thread_id: location.state.threadId, assistantId: location.state.assistantId });
      console.log("response run", runThreadResponse);
      setRunId(runThreadResponse.data.id);
      // const newMessage = {
      //   sender: "M",
      //   text: input,
      //   time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      // };
      // setMessages([...messages, newMessage]);
      setInput("");
      setProcessingData(false);
    }
  };

  const handleEndInterview = async () => {
    const userdata = await getUserByClerkId(user.id);
    const endInterviewData = await endInterview({ user_id: userdata.data.user._id, thread_id: location.state.threadId, assistantId: location.state.assistantId });
    console.log("Interview Result ", endInterviewData.aiMockInterviewResult);
  };

  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      alert("The interview is starting in 3 seconds...");
      setTimeout(() => {
        setTimeLeft(30);
        setIsRunning(true);
      }, 3000);
    }, 3000);
  }, []);

  // useEffect(() => {
  //   if (timeLeft === 0) {
  //     alert("Timeout!");
  //     setTimeLeft(null);
  //     setIsRunning(false);
  //     navigate("/user/interview");
  //     return;
  //   }
  //   if (timeLeft === null) return;

  //   setIsRunning(true);
  //   const timer = setInterval(() => {
  //     setTimeLeft((prevTime) => prevTime - 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [timeLeft]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <HeaderWithLogo />
        <h2 style={{ margin: "2% 0 0 10%" }}>MOCK INTERVIEW</h2>
        <UserHeader />
      </div>

      <Container>
        <Header>
          <TimerBtn isRunning={isRunning}>
            <IoHourglassOutline /> {timeLeft !== null ? `${Math.floor(timeLeft / 60)}:${timeLeft % 60} mins` : "2:00 mins"}
          </TimerBtn>
          <hr style={{ margin: "0" }} />
          <EndBtn onClick={handleEndInterview}>End interview</EndBtn>
        </Header>

        <Conversation> Conversation </Conversation>

        <ChatBox>
          {messages.map((msg, index) => (
            <Message key={index} sender={msg.sender}>
              <Profile>
                <Sender sender={msg.sender}>{msg.sender}</Sender>
                <span className="realtime">
                  {msg.time}
                </span>
              </Profile>
              <Text>{msg.text}</Text>
            </Message>
          ))}
          {
            processingData &&
            <>
              <Img src={processing} alt="pr" />Processing
            </>

          }

        </ChatBox>
        <InputBox>
          <Input
            type="textarea"
            placeholder="Enter your response here..."
            value={input}
            onChange={handleInputChange}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") {
          //     e.preventDefault();
          //     // handleSend();
          //   }
          // }}
          />
          {(setProcessingData) &&
            <Sendicon onClick={handleSend}>
              <LuSend />
            </Sendicon>}
          <CharCount>{countWords(input)} / {MAX_WORDS}</CharCount>
          <SendButton>Ready to code</SendButton>
        </InputBox>
      </Container>
    </>
  );
};

export default MockInterview;
