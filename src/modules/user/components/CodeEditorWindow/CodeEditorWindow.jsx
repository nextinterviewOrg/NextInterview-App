import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";
import { getChallengeById } from "../../../../api/challengesApi";
import { submitUserChallengeProgress } from "../../../../api/challengesApi";
import {
  Title,
  QuestionBox,
  Wrapper,
  BackIcon,
  Button,
  Header,
} from "./CodeEditorWindow.styles";
import ReadyToCode from "../Compiler/ReadyToCode";
import HintChallenges from "../../../admin/components/Challenges/HintChallenges/HintChallenges";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";

const CodeEditorWindow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLang, setSelectedLang] = useState('');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const [input, setInput] = useState('');

  const handleSubmit = async () => {
    if (!challenge || !user || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Get user data from Clerk ID
      const userData = await getUserByClerkId(user.id);
      const userId = userData.data.user._id;

      const expectedOutput = challenge.output?.trim();
      const actualOutput = output?.trim();

      // Only proceed if output matches
      if (expectedOutput === actualOutput) {
        // Prepare submission payload
        const payload = {
          questionId: challenge._id,
          userId,
          answer: code,
          finalResult: true,
          skip: false,
        };

        console.log("payload", payload);

        // Submit the challenge progress only if answer is correct
        const response = await submitUserChallengeProgress(payload);

        console.log("Submitted response", response);
        alert("Congratulations! Your solution is correct and progress has been saved.");
        navigate("/user/challenges");
      } else {
        // Don't store wrong answers, just show error message
        alert("Your output doesn't match the expected result. Please try again.");
      }

    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit your solution. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await getChallengeById(id);
        setChallenge(response.data);
        setCode(response.data?.base_code);
        setInput(response.data?.input);
        setSelectedLang(response.data.programming_language === 'Python' ? 'python' : 'mysql');
      } catch (err) {
        setError("Failed to load challenge data.");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [id]);

  const handleGoBack = () => {
    navigate(`/user/challengeInfo/${id}`);
  };

  if (loading) return <div style={{ textAlign: "center" }}>Loading challenge...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <Wrapper>
      <Header>
        <BackIcon
          onClick={handleGoBack}
          style={{ borderRadius: "10%", border: "1px solid grey", padding: "8px" }}
        >
          <RxArrowLeft />
        </BackIcon>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>

          <Button  >
            Optimise Code
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </Header>

      <Title>Question Type - Coding</Title>

      <div style={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "flex-start" }}>
        <QuestionBox>
          <h3>{challenge.QuestionText}</h3>
          <p><strong>Description:</strong>
            <br>
            </br>
            <div dangerouslySetInnerHTML={{ __html: challenge?.description }} />
          </p>
          <p><strong>Input:</strong> {challenge.input}</p>
          <p><strong>Output:</strong> {challenge.output}</p>
          <p><strong>Difficulty:</strong> {challenge.difficulty}</p>
        </QuestionBox>

        <ReadyToCode
          selectLang={selectedLang}
          setSelectLang={setSelectedLang}
          code={code}
          setCode={setCode}
          output={output}
          setOutput={setOutput}
          input={input}
          setInput={setInput}
        />

        <HintChallenges hints={challenge.hints} />
      </div>
    </Wrapper>
  );
};

export default CodeEditorWindow;