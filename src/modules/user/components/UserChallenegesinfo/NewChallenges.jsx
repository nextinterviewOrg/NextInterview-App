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
  Icons,
  BackIcon,
  Tags,
} from "./NewChallenges.style";
import { RxArrowLeft } from "react-icons/rx";
import amazon from "../../../../assets/Avatar.svg";
import flipkart from "../../../../assets/PersonPhoto.svg";
import google from "../../../../assets/image.svg";

const NewChallenge = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    navigate(`/user/takeChallenge/${id}`); // Navigate to Code Editor Window
  };

  return (
    <>
      <BackIcon
        onClick={handleGoBack}
        style={{ borderRadius: "10%", border: "1px solid grey", padding: "8px" }}
      >
        <RxArrowLeft />
      </BackIcon>

      <Card>
        <Header>
          <Tag>#Today's Challenge</Tag>
          <Title>{challenge.QuestionText}</Title>
          <Description>{challenge.description}</Description>
          <Tags>
            <Tag>{challenge.programming_language}</Tag>
            <Tag>{challenge.difficulty}</Tag>
          </Tags>
        </Header>

        <hr className="hrtag" />

        <TopicsList>
          {challenge.hints?.map((hint, index) => (
            <TopicItem key={index}>{hint.hint_text}</TopicItem>
          ))}
        </TopicsList>

        <hr className="hrtag" />

        <Footer>
          <Button onClick={handleStartChallenge}>Take Challenge</Button>
          <Icons>
            <div className="icons-container">
              <span>Previously Asked In</span>
              {iconList.map((icon, index) => (
                <img key={index} src={icon.src} alt={icon.alt} style={{ right: `${index * 10}px` }} />
              ))}
            </div>
          </Icons>
        </Footer>
      </Card>
    </>
  );
};

export default NewChallenge;
