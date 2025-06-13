import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChallengeById } from "../../../../api/challengesApi"; // Adjust the path if needed
import {
  Card,
  Header,
  Tag,
  Title,
  Description,
  TopicsList,
  TopicItem,
  Button,
  Footer,
  // Icons,
  Tags,
  TextInput,
  TextArea,
  OptionWrapper,
  BackButton,
    SolutionBox,
  SolutionAnswer,
  SolutionText,
  HelpIcons,
} from "./NewChallenges.style"; // You’ll need to add these styled components if not already
// import { RxArrowLeft } from "react-icons/rx";
import amazon from "../../../../assets/Avatar.svg";
import flipkart from "../../../../assets/PersonPhoto.svg";
import google from "../../../../assets/image.svg";
import { IoChevronBackSharp } from "react-icons/io5";
import { PiThumbsUpLight, PiThumbsDownLight } from "react-icons/pi"; // Adjust the import path if needed
import { submitUserChallengeProgress} from "../../../../api/challengesApi"; // Adjust the path if needed
import { getUserByClerkId } from "../../../../api/userApi";
import { useUser } from "@clerk/clerk-react"; // Adjust the import path if needed

const NewChallenge = () => {
  const { id } = useParams();
  const { user } = useUser(); // Get the current user from Clerk
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await getChallengeById(id);
        console.log("Fetched challenge:", response);
        setChallenge(response.data);
      } catch (err) {
        console.error("Error fetching challenge:", err);
        setError("Failed to load challenge data.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  if (loading) return <div style={{ textAlign: "center" }}>Loading challenge...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const iconList = [
    { src: amazon, alt: "Amazon" },
    { src: flipkart, alt: "Flipkart" },
    { src: google, alt: "Google" },
  ];

  const handleGoBack = () => {
    navigate(`/user/challenges`);
  };

  const handleStartChallenge = () => {
    navigate(`/user/takeChallenge/${id}`);
  };

  console.log("Question Type:", challenge?.question_type);

const renderInput = () => {
  const type = challenge?.question_type?.trim().toLowerCase();
  console.log("Question Type:", type);

  switch (type) {
   case "mcq": {
  const options = ["option_a", "option_b", "option_c", "option_d", "option_e"]
    .map(key => challenge[key])
    .filter(Boolean);
  return options.map((option, index) => (
    <OptionWrapper key={index}>
      <label>
        <input
          type="radio"
          name="mcq"
          value={option}
          checked={textAnswer === option}
          disabled={showSolution} // 🔒 Disable after submission
          onChange={(e) => setTextAnswer(e.target.value)}
        />
        {" "}{option}
      </label>
    </OptionWrapper>
  ));
}


    case "single-line":
      return (
        <TextInput
          type="text"
          placeholder="Type your answer..."
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
          disabled={showSolution} // 🔒 Disable after submission
        />
      );

    case "multi-line":
    case "approach":
    case "text":
      return (
        <TextArea
          placeholder="Type your response..."
          rows={4}
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
          disabled={showSolution} // 🔒 Disable after submission
        />
      );

    case "coding":
      return (
        <>
          <p><strong>Description:</strong></p>
          <div style={{ marginBottom: '12px' }} dangerouslySetInnerHTML={{ __html: challenge?.description }} />
          <hr className="hrtag" />
          <h4>Topics Covered:</h4>
          <ul>
            {challenge.topics?.map((topic, idx) => (
              <li key={idx}>{topic.topic_name}</li>
            ))}
          </ul>
          <Button style={{ marginTop: '10px' }} onClick={() => handleStartChallenge()} disabled={showSolution}>
            Try Coding
          </Button>
        </>
      );

    default:
      console.warn("Unsupported or unexpected question type:", type);
      return <div style={{ marginTop: '1rem' }}>Unsupported or missing question type.</div>;
  }
};

const handleSolutionClick = async () => {
    if(!textAnswer.trim()) {
      setError("Please provide an answer before viewing the solution.");
      return;
    }

    const userRes = await getUserByClerkId(user.id);
    console.log("User response from getUserByClerkId:", userRes);
    const userId = userRes?.data?.user?._id;



    if( !userId ) {
      setError("User not found. Please log in again.");
      return;
    }


    try {
      const payload = {
        userId: userId,
        questionId: challenge._id,
        question_type: challenge.question_type,
        answer: textAnswer,
        finalResult: true,
        skip: false
      };
if (challenge.question_type === "mcq") {
  const options = ["option_a", "option_b", "option_c", "option_d", "option_e"]
    .map(key => challenge[key])
    .filter(Boolean); // exclude undefined or null

  const optionIndex = options.findIndex(
    (option) => option === textAnswer
  );

  const optionMap = ["option_a", "option_b", "option_c", "option_d", "option_e"];
  if (optionIndex !== -1) {
    payload.answer = optionMap[optionIndex];
    payload.choosen_option = optionMap[optionIndex]; // if required by your backend
  }
}

      console.log("Submitting user challenge progress with payload:", payload);

      const response = await submitUserChallengeProgress(payload);
      console.log("Response from submitUserChallengeProgress:", response);

if (response?.data && response.data._id) {
  console.log("Answer submitted successfully:", response.data);
  setShowSolution(true);
  setError(null); // clear any existing error
} else {
  console.error("Unexpected response structure:", response.data);
  setError("Unexpected response. Please try again.");
}
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError("An error occurred while submitting your answer. Please try again.");
    }
  };

  const isToday = (dateString) => {
    const today = new Date();
    const challengeDate = new Date(dateString);

    return (
      today.getFullYear() === challengeDate.getFullYear() &&
      today.getMonth() === challengeDate.getMonth() &&
      today.getDate() === challengeDate.getDate()
    );
  };

  if (loading) return <div style={{ textAlign: "center" }}>Loading challenge...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      <BackButton onClick={() => handleGoBack()}>
        <IoChevronBackSharp /> Back
      </BackButton>

      <Card>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
         <Tag>
                {isToday(challenge.createdAt) ? "# Today's Challenge" : "# Past Challenge"}
              </Tag>
                      <Tag>
                {challenge.question_type === "coding" ? `# ${challenge.programming_language}` : `# ${challenge.question_type}`}
              </Tag>
              </div>
        <Title>{challenge.QuestionText}</Title>
        {renderInput()}

{["text", "multi-line", "approach", "mcq", "single-line"].includes(challenge.question_type) && (
  <>
    {showSolution && (
      <SolutionBox>
        <SolutionText>Solution:</SolutionText>
        <SolutionAnswer>
          {challenge.question_type === "mcq" ? (
            <span>{challenge.correct_option}</span>
          ) : (
            <span>{challenge.answer || "No solution provided."}</span>
          )}
        </SolutionAnswer>
      </SolutionBox>
    )}
  </>
)}

{/* ✅ Always visible button */}

{!showSolution && challenge.question_type !== "coding" && (
  <Footer>
    <Button
      onClick={handleSolutionClick}
      disabled={textAnswer.trim().length === 0}
    >
      Show Solution
    </Button>
  </Footer>
)}


      </Card>
    </>
  );


};

export default NewChallenge;
