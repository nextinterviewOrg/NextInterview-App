import React, { useEffect, useState } from "react";
import styled from "styled-components";
import amazon from "../../../../assets/Avatar.svg";
import flipkart from "../../../../assets/PersonPhoto.svg";
import google from "../../../../assets/image.svg";
import { useNavigate } from "react-router-dom";
import { getTodaysUserChallenges } from "../../../../api/challengesApi";

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.light};
  border-radius: 12px;
  padding: ${(props) => props.theme.spacing(2)};
  box-shadow: 0 8px 12px #7090b018;
  font-family: ${(props) => props.theme.fonts.body};
  display: flex;
  
  justify-content: space-between;
  margin-left: ${(props) => props.theme.spacing(2)};

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ChallengeTitle = styled.h2`
  font-size: 1.2rem;
  padding-top: 16px;
  margin: 0px 10px 15px 0px;
  color: #1e293b; 
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ChallengeSubtitle = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textgray};
  line-height: 1;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(1)};
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const Tag = styled.span`
  background-color: ${(props) => props.theme.colors.backgray};
  // color: ${(props) => props.theme.colors.borderblue};
  /* color: #333; */
  padding: ${(props) => props.theme.spacing(0.4)} ${(props) => props.theme.spacing(1)};
  border-radius: 4px;
  font-size: 11px;

    background-color: ${({ difficulty }) => {
    switch (difficulty) {
      case "easy":
        return "#d1fae5";
      case "medium":
        return "#fff3cd";
      case "hard":
        return "#f8d7da";
      default:
        return "#ccc";
    }
  }};

    @media (max-width: 768px) {
    font-size: 9px;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.primary ? props.theme.colors.secondary : props.theme.colors.light}; 
    color: ${(props) => props.secondary ? props.theme.colors.secondary : props.theme.colors.white};
  border: ${(props) => props.secondary ? "none" : `1px solid ${props.theme.colors.secondary}`};
  padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
  border-radius: 8px;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  border:1px solid ${(props) => props.theme.colors.secondary};

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  span {
    margin-right: 10px;
    font-size: 14px;
    color: #777;
  }

  img {
    width: 24px;
    height: 24px;
    margin: 0;
    position: relative;
    border-radius: 50%;
    border: 3px solid #fff;
    top: 10px;

    &:first-child {
      left: 0;
    }
  }
`;

export const MarginButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;  

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PreviouslyAsked = styled.div`
  margin-top: ${(props) => props.theme.spacing(2)};
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.textgray};
  text-align: right;
`;

const StatusBadge = styled.span`
  color: ${props =>
    props.status === 'completed' ? '#2ecc71' :
      props.status === 'attempted' ? '#f39c12' : '#e74c3c'};
  font-weight: bold;
  background-color: ${props =>
    props.status === 'completed' ? '#e8f8f0' :
      props.status === 'attempted' ? '#fef5e6' : '#fdedec'};
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 0.75rem;
  margin-left: 10px;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fdedec;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid #ef9a9a;
`;

const LoadingMessage = styled.div`
  color: #3498db;
  background-color: #e3f2fd;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid #bbdefb;
`;
export const Status = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100px;
  font-size: 12px;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  font-weight: 400;
  background-color: ${(props) =>
    props.status === "Completed" ? "#efffeb" : "#ffebeb"};
  color: ${(props) =>
    props.status === "Completed" ? "#68c184" : "#843838"};
  border: 1px solid
    ${(props) =>
    props.status === "Completed" ? "#defcd6" : "#fcd6d6"};

      @media (max-width: 1024px) {
        font-size: 0.7rem;
        width: 80px;
      }

      @media (max-width: 480px) {
        font-size: 0.6rem;
        width: 100px;
        margin-left: 0.5rem;
      }
`;
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
const TakeChallenge = ({ questionType = "coding" }) => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;

const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);

    const userData = await getUserByClerkId(user.id);
    console.log("User Data:", userData);
    const userId = userData.data.user._id;

    const response = await getTodaysUserChallenges(userId, questionType);
    console.log("Response from getTodaysUserChallenges:", response);
    const challengeList = response?.data;
    console.log("challengeList", challengeList);

    if (Array.isArray(challengeList)) {
      setChallenges(challengeList);
    } else {
      throw new Error("Invalid challenge data");
    }
  } catch (err) {
    console.error("API Error:", err); // ✅ fixed
    setError(err.response?.data?.message || err.message || "Failed to load challenges");
  } finally {
    setLoading(false);
  }
};


    fetchData();
  }, [user, isLoaded, questionType]);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Loading today's challenges...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#e74c3c" }}>
        {error}
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#7f8c8d" }}>
        No challenges available for today. Check back tomorrow!
      </div>
    );
  }
  const getStatus = (challenge) => {
    // hasAnswered → attempted; hasAnswered + finalResult → completed
    if (challenge.userStatus==="answered") {
      return challenge.finalResult ? "Completed" : "Attempted";
    }
    return "Not Attempted";
  };

  // Map UI colour variants in <Status>
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "Completed";
      case "Attempted":
        return "attempted";
      default:
        return "notAttempted";
    }
  };
  return (
    <>
      {challenges.map((challenge, index) => {
        const statusText = getStatus(challenge);
        const statusKey = getStatusColor(statusText);
       
        return (
          <Card key={challenge._id}>
            <div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           
          <small style={badgeStyle}>
            #Today's Challenge {challenge.serialNo} 
          </small>
                {/* <StatusBadge status={challenge.userStatus || 'not attempted'}>
                 {challenge.userStatus}
               </StatusBadge> */}
              </div>

              <ChallengeTitle>{challenge.QuestionText}</ChallengeTitle>

              {/* <ChallengeSubtitle>
                {challenge.question_type === "coding" ? "N/A" : (challenge.description || "No description provided.")}
              </ChallengeSubtitle> */}

              <Tags>
                {challenge.programming_language && <Tag>{challenge.programming_language}</Tag>}
                {challenge.difficulty && (
                  <Tag difficulty={challenge.difficulty.toLowerCase()}>
                    {challenge.difficulty}
                  </Tag>
                )}
                {challenge.tags?.map((tag, idx) => <Tag key={idx}>{tag}</Tag>)}

                 {/* New: Topic tags */}
  {challenge.topics?.map((topic, idx) => (
    <Tag key={`topic-${idx}`}>{topic.topic_name}</Tag>
  ))}
              </Tags>

              <Buttons>
                <Button
                  secondary
                  onClick={() => navigate(`/user/challengeInfo/${challenge._id}/false`)}
                >
                  Challenge Info
                </Button>
              </Buttons>
            </div>
            <div>
              <Status status={statusKey}>{statusText}</Status>
            </div>
          </Card>
        )
      })}
    </>
  );
};


const badgeStyle = {
  color: "#2390ac",
  fontWeight: "bold",
  backgroundColor: "#f0f8f1",
  borderRadius: "4px",
  padding: "3px 5px",
  fontSize: "0.7rem",
};

export default TakeChallenge;