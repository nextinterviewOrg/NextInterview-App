import React, { useState, useEffect, useRef } from "react";
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
} from "./MockInterviewVoice.style";
import { BiSolidMicrophone } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import processing from "../../../../assets/processing.gif";
import { IoHourglassOutline } from "react-icons/io5";
import UserHeader from "../../../../components/UserHeader/UserHeader";
import HeaderWithLogo from "../../../../components/HeaderWithLogo/HeaderWithLogo";
import { MediaRecorder, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";
import RecordRTC from "recordrtc";
import * as lamejs from "@breezystack/lamejs";
import {
  endInterview,
  getMockInterviewResponse,
  runmockinterviewThread,
  sendUserMessage,
  speechToText,
  textToSpeech,
} from "../../../../api/aiMockInterviewApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";

const MockInterview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [mediaRecorderRef, setMediaRecorderRef] = useState(null);
  const [audioBlobsRef, setAudioBlobsRef] = useState([]);
  const [capturedStreamRef, setCapturedStreamRef] = useState(null);
  const { isLoaded, user, isSignedIn } = useUser();

  let mediaRecorder = null;
  let audioBlobs = [];
  let capturedStream = null;
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const MAX_WORDS = 50;
  const navigate = useNavigate();
  const location = useLocation();
  const [runId, setRunId] = useState(null);
  const [processingData, setProcessingData] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  useEffect(() => {
    const apiCaller = async () => {
      setProcessingData(true);
      const response = await getMockInterviewResponse({
        thread_id: location.state.threadId,
        run_id: location.state.runId,
      });
      let message = response.data.data.map((response) => {
        return {
          sender: response.role === "user" ? "M" : "AI",
          text: response.content[0].text.value,
          time:
            new Date(response.created_at).getHours() +
            ":" +
            new Date(response.created_at).getMinutes(),
        };
      });
      message = message.reverse();
      setMessages(message);
      if (message.length == 1) {
        playAudioFromData(message[message.length - 1]);
        setProcessingData(false);
      }

      // const data = await textToSpeech({
      //   inputText: "I am the terminator Help me out with the mock interview"
      // })
      // const audio = new Audio(data.audio);
      // audio.play();
    };
    apiCaller();
  }, [location]);

  useEffect(() => {
    const apiCaller = async () => {
      setProcessingData(true);
      const response = await getMockInterviewResponse({
        thread_id: location.state.threadId,
        run_id: runId,
      });
      let message = response.data.data.map((response) => {
        return {
          sender: response.role === "user" ? "M" : "AI",
          text: response.content[0].text.value,
          time:
            new Date(response.created_at).getHours() +
            ":" +
            new Date(response.created_at).getMinutes(),
        };
      });
      message = message.reverse();
      setMessages(message);
      playAudioFromData(message[message.length - 1]);
      setProcessingData(false);
    };
    apiCaller();
  }, [runId]);

  const handleSend = async (message) => {
    setProcessingData(true);
    if (message.trim()) {
      const response = await sendUserMessage({
        thread_id: location.state.threadId,
        message: message,
      });
      const runThreadResponse = await runmockinterviewThread({
        thread_id: location.state.threadId,
        assistantId: location.state.assistantId,
      });
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
  const convertToBase64 = (audioBlob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = function () {
        const base64String = reader.result.split(",")[1]; // Get the base64 part of the data URI
        resolve(base64String);
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.readAsDataURL(audioBlob); // Reads the Blob as a Data URL (Base64 format)
    });
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioBlobs = [];
      // capturedStream = stream;
      // setCapturedStreamRef(capturedStream);

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

    await mediaRecorderRef.getDataURL(async (audioUrl) => {
      setAudioUrl(audioUrl);
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
    const webmAudioBlob = await stopRecording();
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

  const countWords = (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    if (countWords(newText) <= MAX_WORDS) {
      setInput(newText);
    }
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

  const playAudioFromData = async (message) => {
    setAudioPlaying(true);
    if (message.sender === "AI") {
      const data = await textToSpeech({
        inputText: message.text,
      });
      const audio = new Audio(data.audio);
      audio.play();
      setAudioPlaying(false);
    }
  };
  const handleEndInterview = async () => {
    const userdata = await getUserByClerkId(user.id);
    const endInterviewData = await endInterview({
      user_id: userdata.data.user._id,
      thread_id: location.state.threadId,
      assistantId: location.state.assistantId,
    });
  };

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
            <IoHourglassOutline />{" "}
            {timeLeft !== null
              ? `${Math.floor(timeLeft / 60)}:${timeLeft % 60} mins`
              : "2:00 mins"}
          </TimerBtn>
          <hr style={{ margin: "0" }} />
          <EndBtn onClick={handleEndInterview}>End interview</EndBtn>
        </Header>

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
          {audioPlaying ? (
            <>
              <Sendicon
                onClick={() => {
                  startRecording();
                }}
                disabled={isRecording}
                style={{ display: isRecording ? "none" : "block" }}
              >
                <BiSolidMicrophone
                  style={{ fontSize: "32px" }}
                  className="inputmic"
                />
              </Sendicon>
              <Sendicon
                onClick={() => {
                  handleStopRecording();
                }}
                disabled={!isRecording}
                style={{ display: !isRecording ? "none" : "block" }}
              >
                Listening
                <BiSolidMicrophone
                  style={{ fontSize: "32px" }}
                  className="inputmic"
                />
              </Sendicon>
              <SendButton>Ready to code</SendButton>
            </>
          ) : null}
        </InputBox>
      </Container>
    </>
  );
};

export default MockInterview;
