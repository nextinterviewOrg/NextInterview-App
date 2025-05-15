import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  EndBtn,
  TimerBtn,
  ChatBox,
  Conversation,
  Message,
  Sender,
  Text,
  Img,
  InputBox,
  Profile,
  Sendicon,
  SendButton,
  InputTab,
  Tab,
} from "./MockInterviewVoice.style";
import { BiSolidMicrophone } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import processing from "../../../../assets/processing.gif";
import { IoHourglassOutline } from "react-icons/io5";
import UserHeader from "../../../../components/UserHeader/UserHeader";
import HeaderWithLogo from "../../../../components/HeaderWithLogo/HeaderWithLogo";
import RecordRTC from "recordrtc";
import * as lamejs from "@breezystack/lamejs";
import {
  runmockinterviewThread,
  speechToText,
} from "../../../../api/aiMockInterviewApi";
import { getUserByClerkId } from "../../../../api/userApi";
import ReadyToCode from "../../components/Compiler/ReadyToCode";
 
const EXTERNAL_API_BASE = "https://f9ma89kmrg.execute-api.ap-south-1.amazonaws.com/default/mock-interview-api";
 
const MockInterview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorderRef, setMediaRecorderRef] = useState(null);
  // const { isLoaded, user, isSignedIn } = useUser();
 
  let mediaRecorder = null;
  const [messages, setMessages] = useState([]);
 
  // const [input, setInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // const [runId, setRunId] = useState(null);
  const [processingData, setProcessingData] = useState(false);
  const [clarificationMode, setClarificationMode] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const [code, setCode] = useState("");
  const [selectLang, setSelectLang] = useState("python");
  const [output, setOutput] = useState("");
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [readyToCode, setReadyToCode] = useState(false);
 
  const session_id = location.state?.session_id;
  const initialQuestion = location.state?.first_follow_up;
  const baseQuestion = location.state?.question;
 
  useEffect(() => {
    if (session_id && initialQuestion) {
      setMessages([
        {
          sender: "AI",
          text: initialQuestion,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        }
      ]);
    }
    setProcessingData(false);
  }, [session_id, initialQuestion]);
 
  const handleSend = async (message) => {
    if (!message.trim() || !session_id) return;
    setProcessingData(true);
    try {
      const response = await fetch(`${EXTERNAL_API_BASE}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id,
          answer: message,
          ready_to_code: readyToCode,
          code_stub: code,
          clarification: clarificationMode,
        }),
      });
      if (!response.ok) {
        setProcessingData(false);
        return;
      }
      const data = await response.json();
      // Add user message
      setMessages((prev) => [
        ...prev,
        {
          sender: "M",
          text: message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        },
      ]);
 
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
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
          },
        ]);
      }     
      
      if(data.code_stub){
        setCode(data.code_stub);

        console.log("Code:", code);
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
      // handle error
    } finally {
      setProcessingData(false);
    }
  };
 
  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
 
      mediaRecorder = new RecordRTC(stream, {
        type: "audio",
        mimeType: "audio/webm",
        recorderType: RecordRTC.StereoAudioRecorder,
        numberOfAudioChannels: 1,
        desiredSampRate: 16000,
      });
 
      mediaRecorder.startRecording();
      setMediaRecorderRef(mediaRecorder);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing the microphone:", error);
    }
  };
 
  // Stop recording
  const stopRecording = async () => {
    let returnData;
    await mediaRecorderRef.stopRecording(async () => {
      let audioBlob = mediaRecorderRef.getBlob();
      const mp3Blob = await convertWavToMp3(audioBlob);
      const formData = new FormData();
      formData.append("speechFile", mp3Blob, "file.mp3");
      const data = await speechToText(formData);
      returnData = data.data;
      handleSend(data.data.text);
    });
 
    await mediaRecorderRef.getDataURL(async () => {
      // const audio = new Audio(audioUrl);
 
      // audio.play();
    });
    setIsRecording(false);
    return returnData;
  };
 
  // Convert WAV to MP3
  function convertWavToMp3(wavBlob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
 
      reader.onload = function () {
        const arrayBuffer = this.result;
        const wavDecoder = lamejs.WavHeader.readHeader(
          new DataView(arrayBuffer)
        );
        const wavSamples = new Int16Array(
          arrayBuffer,
          wavDecoder.dataOffset,
          wavDecoder.dataLen / 2
        );
        const mp3Encoder = new lamejs.Mp3Encoder(
          wavDecoder.channels,
          wavDecoder.sampleRate,
          128
        );
        const mp3Buffer = mp3Encoder.encodeBuffer(wavSamples);
        const mp3Data = mp3Encoder.flush();
        const mp3BufferWithHeader = new Uint8Array(
          mp3Buffer.length + mp3Data.length
        );
        mp3BufferWithHeader.set(mp3Buffer, 0);
        mp3BufferWithHeader.set(mp3Data, mp3Buffer.length);
 
        const mp3Blob = new Blob([mp3BufferWithHeader], { type: "audio/mp3" });
        resolve(mp3Blob);
      };
 
      reader.onerror = function (error) {
        reject(error);
      };
 
      // Read the input blob as an ArrayBuffer
      reader.readAsArrayBuffer(wavBlob);
    });
  }
 
  // Handle stop and upload flow
  const handleStopRecording = async () => {
    await stopRecording();
  };
 
  // const sendToBackend = async () => {
  //   if (mp3Data) {
  //     const formData = new FormData();
  //     formData.append('audio', mp3Data, 'audio.mp3');
  //     //   try {
  //     //     const response = await axios.post('http://localhost:3000/upload-audio', formData, {
  //     //       headers: {
  //     //         'Content-Type': 'multipart/form-data',
  //     //       },
  //     //     });
  //     //   } catch (error) {
  //     //     console.error('Error uploading audio:', error);
  //     //   }
  //     // } else {
  //     //   alert('Please record some audio first.');
  //   }
  // };
 
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
 
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
      setTimeout(() => {
        handleEndInterview();
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);
 
  const handleEndInterview = async () => {
    if (!session_id) return;
    setProcessingData(true);
    try {
      const response = await fetch(`${EXTERNAL_API_BASE}/feedback/${encodeURIComponent(session_id)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        setProcessingData(false);
        return;
      }
      const data = await response.json();
      setFeedback(data);
    } catch {
      // handle error
    } finally {
      setProcessingData(false);
    }
  };
 
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
          {messages.map((msg, index) => {
            // if (index === messages.length - 1) {
            //    playAudioFromData(msg);
            // }
            return (
              <Message key={index} sender={msg.sender}>
                <Profile>
                  <Sender sender={msg.sender}>{msg.sender}</Sender>
                  <span
                    className="realtime"
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      width: "55px",
                      paddingTop: "5px",
                    }}
                  >
                    {msg.time}
                  </span>
                </Profile>
                <Text>{msg.text}</Text>
              </Message>
            );
          })}
          {processingData && (
            <>
              <Img src={processing} alt="pr" />
              Processing
            </>
          )}
        </ChatBox>
        <InputBox>
          {isRecording ? (
            <>
            <InputTab>
            <Tab>
              <Sendicon
                onClick={() => {
                  handleStopRecording();
                }}
                disabled={!isRecording}
                // style={{ display: !isRecording ? "none" : "block" }}
              >
                Listening
                <BiSolidMicrophone
                  style={{ fontSize: "32px" }}
                  className="inputmic"
                />
              </Sendicon>
              </Tab>
              {readyToCode && (
                <SendButton show={showCodeEditor} onClick={() => setShowCodeEditor(true)}>
                  Ready to code
                </SendButton>
              )}
              </InputTab>
            </>
          ) : (
            <>
            <InputTab>
            <Tab>
              <Sendicon
                onClick={() => {
                  startRecording();
                }}
                disabled={isRecording}
                // style={{ display: isRecording ? "none" : "block" }}
              >
                <BiSolidMicrophone
                  style={{ fontSize: "32px" }}
                  className="inputmic"
                />
              </Sendicon>
              </Tab>
              {readyToCode && (
                <SendButton show={showCodeEditor} onClick={() => setShowCodeEditor(true)}>
                  Ready to code
                </SendButton>
              )}
              </InputTab>
            </>
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