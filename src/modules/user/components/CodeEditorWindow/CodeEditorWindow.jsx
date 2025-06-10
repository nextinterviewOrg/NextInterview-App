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
} from "./CodeEditorWindow.styles";
import ReadyToCode from "../Compiler/ReadyToCode";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import Editor from "@monaco-editor/react";
import { IoChevronBackSharp } from "react-icons/io5";

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

  const handleGoBack = () => {
    navigate(`/user/challengeInfo/${id}`);
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

        await submitUserChallengeProgress(payload);
        alert("Congratulations! Your solution is correct and progress has been saved.");
        navigate("/user/challenges");
      } else {
        alert("Your output doesn't match the expected result. Please try again.");
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

  const fetchOptimizedCode = async () => {
    try {
      const response = await fetch(
        "https://f9ma89kmrg.execute-api.ap-south-1.amazonaws.com/default/mock-interview-api/optimize-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: challenge?.QuestionText,
            user_code: code,
            sample_input: challenge?.input,
            sample_output: challenge?.output,
          }),
        }
      );
      const data = await response.json();
      setOptimisedCode(data.optimized_code);
    } catch (err) {
      console.error("Error fetching optimized code:", err);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await getChallengeById(id);
        setChallenge(response.data);
        setCode(response.data?.base_code);
        setInput(response.data?.input);
        setSelectedLang(
          response.data.programming_language === "Python" ? "python" : "mysql"
        );
      } catch (err) {
        setError("Failed to load challenge data.");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [id]);

  useEffect(() => {
    if (runClicked && output?.trim() === challenge?.output?.trim()) {
      setShowOptimiseBtn(true);
      fetchOptimizedCode();
    } else {
      setShowOptimiseBtn(false);
    }
  }, [output, runClicked, challenge]);

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

        <div style={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "flex-start" }}>
          <QuestionContainer>
            <Title>Question</Title>
            <QuestionBox>
              <p>
                <strong>Description:</strong>
                <div dangerouslySetInnerHTML={{ __html: challenge?.description }} />
              </p>
              <p>
                <strong>Input:</strong> {challenge.input}
              </p>
              <p>
                <strong>Output:</strong> {challenge.output}
              </p>
            </QuestionBox>
          </QuestionContainer>

          <div style={{ flex: 1 }}>
            <TabsWrapper>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TabButton active={activeTab === 'mycode'} onClick={() => handleTabClick('mycode')}>
                  My Code
                </TabButton>
                <TabButton active={activeTab === 'solution'} onClick={() => handleTabClick('solution')}>
                  Show Solution <TimerText>⏱ 60s</TimerText>
                </TabButton>
                <HintWrapper onMouseEnter={() => setShowHint(true)} onMouseLeave={() => setShowHint(false)}>
                  <HintButton>Hint ℹ️</HintButton>
                  {showHint && <HintTooltip>{challenge.hints}</HintTooltip>}
                </HintWrapper>
              </div>
              <LanguageSelectWrapper>
                <label htmlFor="lang">Select Language</label>
                <Select
                  id="lang"
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                >
                  <option value="python">Python</option>
                  <option value="mysql">MySQL</option>
                </Select>
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
                setRunClicked={setRunClicked}
                showOptimiseBtn={showOptimiseBtn}
                handleOptimizeCode={handleOptimizeCode}
                optimizeClicked={optimizeClicked}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}

            {activeTab === "solution" && (
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
                <code>{challenge.solution || "No solution available."}</code>
              </div>
            )}
          </div>
        </div>

        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button onClick={() => setModalOpen(false)} className="close-button">x</button>
              <h3>Optimised Code</h3>
              <Editor
                height="300px"
                language={selectedLang || "plaintext"}
                value={optimisedCode}
                theme="vs-light"
              />
              <div className="button-group">
                <button onClick={() => setModalOpen(false)} className="modal-cancel-button">Cancel</button>
                <button
                  className="modal-button"
                  onClick={() => {
                    setCode((prev) => `${prev}\n\n// --- Optimised Version ---\n${optimisedCode}`);
                    setModalOpen(false);
                    setOptimizeClicked(true);
                  }}
                >
                  Apply Code
                </button>
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default CodeEditorWindow;
