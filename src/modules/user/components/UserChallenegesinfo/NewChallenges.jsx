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
} from "./NewChallenges.style"; // You’ll need to add these styled components if not already
// import { RxArrowLeft } from "react-icons/rx";
import amazon from "../../../../assets/Avatar.svg";
import flipkart from "../../../../assets/PersonPhoto.svg";
import google from "../../../../assets/image.svg";
import { IoChevronBackSharp } from "react-icons/io5";

const NewChallenge = () => {
  const { id } = useParams();
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
          <Button style={{ marginTop: '10px' }} onClick={() => handleStartChallenge()}>
            Try Coding
          </Button>
        </>
      );

    default:
      console.warn("Unsupported or unexpected question type:", type);
      return <div style={{ marginTop: '1rem' }}>Unsupported or missing question type.</div>;
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
         <Tag>
                {isToday(challenge.createdAt) ? "# Today's Challenge" : "# Past Challenge"}
              </Tag>
        {/* {!["mcq", "single-line", "multi-line", "approach", "text"].includes(challenge.question_type) && (
          <>
            <Header>
              <Title>{challenge.QuestionText}</Title>
              <Description dangerouslySetInnerHTML={{ __html: challenge?.description }} />
              <Tags>
                <Tag>{challenge.programming_language}</Tag>
                <Tag>{challenge.difficulty}</Tag>
              </Tags>
            </Header>


            <hr className="hrtag" />
            <h3>Topics</h3>
            <TopicsList>
              {challenge.topics?.map((topic, index) => (
                <TopicItem key={index}>{topic.topic_name}</TopicItem>
              ))}
            </TopicsList>
            <hr className="hrtag" />
          </>
        )} */}

        {/* <hr className="hrtag" /> */}
        {/* <h3>{challenge.question_type === "coding" ? "Your Respone" : ""}</h3> */}


        <Title><p style={{margin:"0px"}}>{challenge.QuestionText} </p>
           <p className="language">{challenge?.programming_language}</p>
        </Title>
        
        {renderInput()}

        {["text", "multi-line", "approach", "mcq", "single-line"].includes(challenge.question_type) && (
          <>
            {showSolution && (
              <>
                <h4 style={{ marginTop: "20px" }}>Solution</h4>
                <p style={{ background: "#f0f0f0", padding: "12px", borderRadius: "5px" }}>
                  {challenge?.correct_option}
                </p>
              </>
            )}
            <Footer>
                        {/* <Button onClick={handleStartChallenge}>Take Challenge</Button>
          <Icons>
            <div className="icons-container">
              <span>Previously Asked In</span>
              {iconList.map((icon, index) => (
                <img key={index} src={icon.src} alt={icon.alt} style={{ right: `${index * 10}px` }} />
              ))}
            </div>
          </Icons> */}

              <Button
                onClick={() => {
                  if (!showSolution) {
                    setShowSolution(true);
                  }
                }}
                disabled={!showSolution && textAnswer.trim().length === 0}
              >
                {showSolution ? "Next Question" : "Show Solution"}
              </Button>
            </Footer>
          </>
        )}
      </Card>
    </>
  );


};

export default NewChallenge;
