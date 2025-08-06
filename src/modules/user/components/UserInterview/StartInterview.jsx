import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
import { getUserByClerkId } from "../../../../api/userApi";
import { getExternalTopics } from "../../../../api/topicApi";
import AIicon from "../../../../assets/SampleInterviewIcon.svg"

const EXTERNAL_API_BASE = "https://nextinterview.ai/fastapi/mock";

const StartInterview = ({ isOpen, onClose, title, moduleCode }) => {
  console.log("Recieved module codeeeeeeeeee", moduleCode);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [mode, setMode] = useState("chat");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  // Fetch topics on mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await getExternalTopics();
        console.log(response);
        // Handle both array and object with 'topics' property
        let topicList = Array.isArray(response)
          ? response
          : Array.isArray(response?.topics)
            ? response.topics
            : [];
        console.log(topicList);
        setTopics(topicList);
        if (topicList.length > 0) {
          setSelectedTopic(topicList[0].topic);
        }
      } catch {
        setTopics([]);
      }
    };
    fetchTopics();
  }, []);

  // Fetch user name on mount
  useEffect(() => {
    const fetchUserName = async () => {
      if (isLoaded && user) {
        try {
          const userResponse = await getUserByClerkId(user.id);
          setUserName(userResponse.data.user.fullName || user.fullName || user.firstName || "");
        } catch {
          setUserName(user.fullName || user.firstName || "");
        }
      }
    };
    fetchUserName();
  }, [isLoaded, user]);

  const handleStartInterview = async () => {
  console.log("Starting interview with moduleCode:", moduleCode); 
    const userId = await getUserByClerkId(user.id);
    const user_id = userId.data.user._id;
    if (!moduleCode || !userName) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${EXTERNAL_API_BASE}/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module_code: moduleCode, user_id: user_id }),
      });
      if (!response.ok) {
        throw new Error(`Failed to start interview: ${response.status}`);
      }
      const data = await response.json();
      // Pass session_id and initial question to the next page
      const state = {
        session_id: data.session_id,
        question: data.base_question,
        difficulty: data.difficulty,
        example: data.example,
        code_stub: data.code_stub,
        tags: data.tags,
        first_follow_up: data.first_follow_up,
        module_code: moduleCode,
        userName,
      };
      if (mode === "voice") {
        navigate("/voicemode", { state });
      } else {
        navigate("/chatmode", { state });
      }
    } catch {
      setError("Failed to start interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container isOpen={isOpen}>
      <Modal>
        <h2>Start a New Interview</h2>
        <small>Uses AI <img src={AIicon} alt="AI" width="15px" height="15px" style= {{marginLeft: "5px"}} /></small>
        <ModalContent>
          <Heading> {title}</Heading>
          {/* <div style={{ border: "1px solid #F5F5F5", padding: "14px", borderRadius: "5px", display: "flex", flexDirection: "column", gap: "10px"}}>
          <label>Select Topic</label>
          <Dropdown
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            disabled={loading}
          >
            <option value="" disabled>Select Topic</option>
            {(Array.isArray(topics) ? topics : []).map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </Dropdown>
          </div> */}

                    <div style={{ border: "1px solid #F5F5F5", padding: "14px", borderRadius: "5px", display: "flex", flexDirection: "column", gap: "10px"}}>
          <label>Select Interview Mode</label>
          <RadioGroup>
            <RadioOption>
              <input
                type="radio"
                value="chat"
                checked={mode === "chat"}
                onChange={() => setMode("chat")}
                disabled={loading}
              />
              Chat Mode
            </RadioOption>
            <RadioOption>
              <input
                type="radio"
                value="voice"
                checked={mode === "voice"}
                onChange={() => setMode("voice")}
                disabled={loading}
              />
              Voice Mode
            </RadioOption>
          </RadioGroup>
          </div>
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
          <Button onClick={handleStartInterview} disabled={!moduleCode || !userName || loading}>
            {loading ? "Starting..." : "+ Start Interview"}
          </Button>
        </ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </Modal>
    </Container>
  );
};

StartInterview.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  moduleCode: PropTypes.string.isRequired,
};

export default StartInterview;
