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

const EXTERNAL_API_BASE = "https://f9ma89kmrg.execute-api.ap-south-1.amazonaws.com/default/mock-interview-api";

const StartInterview = ({ isOpen, onClose, title }) => {
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
    if (!selectedTopic || !userName) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${EXTERNAL_API_BASE}/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selectedTopic, user_name: userName }),
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
        topic: selectedTopic,
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
        <small>Uses AI</small>
        <ModalContent>
          <Heading> {title}</Heading>
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
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
          <Button onClick={handleStartInterview} disabled={!selectedTopic || !userName || loading}>
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
};

export default StartInterview;
