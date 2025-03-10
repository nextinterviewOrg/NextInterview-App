import React, { useState } from "react";
import {
  Container,
  Heading,
  Modal,
  ModalContent,
  Dropdown,
  RadioGroup,
  RadioOption,
  Button,
  CloseButton,
} from "../../components/UserInterview/StartInterview.style";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "../../../../config/axiosconfig";
import { getUserByClerkId } from "../../../../api/userApi";
import {
  createMockInterviewThread,
  getAiAssistantbyModuleId,
  runmockinterviewThread,
} from "../../../../api/aiMockInterviewApi";

const StartInterview = ({ isOpen, onClose, title, course }) => {
  const [module, setModule] = useState("Deep Learning");
  const [mode, setMode] = useState("chat");
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();
  const [threadId, setThreadId] = useState(null);
  const [assistantId, setAssistantId] = useState(null);
  const [runId, setRunId] = useState(null);

  useEffect(() => {
    const apiCaller = async () => {
      const userResponse = await getUserByClerkId(user.id);
      const aiAssistantResponse = await getAiAssistantbyModuleId(course.id);
      setAssistantId(aiAssistantResponse[0].id);
      ("");
      const threadResponse = await createMockInterviewThread({
        userId: userResponse.data.user._id,
      });
      setThreadId(threadResponse.data.id);
      const runThreadResponse = await runmockinterviewThread({
        thread_id: threadResponse.data.id,
        assistantId: aiAssistantResponse[0].id,
      });
      setRunId(runThreadResponse.data.id);
    };
    apiCaller();
  }, [user, navigate]);

  const handleStartInterview = () => {
    if (!assistantId || !threadId || !runId) {
      return;
    }
    if (mode === "voice") {
      navigate("/voicemode", {
        state: { threadId: threadId, assistantId: assistantId, runId: runId },
      });
    } else {
      navigate("/chatmode", {
        state: { threadId: threadId, assistantId: assistantId, runId: runId },
      });
    }
  };

  return (
    <Container isOpen={isOpen}>
      <Modal>
        <h2>Start a New Interview</h2>
        <small>Uses AI</small>
        <ModalContent>
          <Heading> {title}</Heading>
          <label>Select Interview Mode</label>
          <RadioGroup>
            <RadioOption>
              <input
                type="radio"
                value="chat"
                checked={mode === "chat"}
                onChange={() => setMode("chat")}
              />
              Chat Mode
            </RadioOption>
            <RadioOption>
              <input
                type="radio"
                value="voice"
                checked={mode === "voice"}
                onChange={() => setMode("voice")}
              />
              Voice Mode
            </RadioOption>
          </RadioGroup>

          <Button onClick={handleStartInterview}>+ Start Interview</Button>
        </ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </Modal>
    </Container>
  );
};

export default StartInterview;
