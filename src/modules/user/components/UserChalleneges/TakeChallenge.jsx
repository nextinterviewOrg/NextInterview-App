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

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ChallengeTitle = styled.h2`
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.text};
  font-size: 32px;
  margin: ${(props) => props.theme.spacing(1)} 0;

  @media (max-width: 768px) {
    font-size: 24px;
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
  margin-bottom: ${(props) => props.theme.spacing(3)};
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const Tag = styled.span`
  background-color: ${(props) => props.theme.colors.backgray};
  color: ${(props) => props.theme.colors.borderblue};
  padding: ${(props) => props.theme.spacing(0.2)}
    ${(props) => props.theme.spacing(1)};
  border-radius: 4px;
  font-size: 11px;
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
  color: ${(props) =>
    props.secondary ? props.theme.colors.secondary : props.theme.colors.white};
  border: ${(props) =>
    props.secondary ? "none" : `1px solid ${props.theme.colors.secondary}`};
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
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
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";const TakeChallenge = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. Get user data
        const userResponse = await getUserByClerkId(user.id);
        if (!userResponse?.data?.user?._id) {
          throw new Error("Failed to get user ID");
        }
        
        // 2. Get challenges
        const challengesResponse = await getTodaysUserChallenges(userResponse.data.user._id);
        const challengesArray = challengesResponse?.data;
        
        if (Array.isArray(challengesArray)) {
          // Filter out completed challenges
          const filteredChallenges = challengesArray.filter(
            challenge => challenge.userStatus !== 'answered'
          );
          setChallenges(filteredChallenges);
        } else {
          throw new Error("Invalid challenges data format");
        }
        
      } catch (err) {
        console.error("API Error:", err);
        setError(err.response?.data?.message || err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isLoaded]);

  // ... (keep all your loading/error states as they are)

  if (challenges.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#7f8c8d" }}>
        {loading ? "Loading..." : "No challenges available for today. Check back tomorrow!"}
      </div>
    );
  }

  return (
    <>
      {challenges.map((challenge) => (
        <Card key={challenge._id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <small style={badgeStyle}>
              #Today's Challenge
            </small>
            {/* <StatusBadge status={challenge.userStatus || 'not attempted'}>
              {challenge.userStatus === 'completed' ? 'Completed' : 
               challenge.userStatus === 'attempted' ? 'Attempted' : 'Not Attempted'}
            </StatusBadge> */}
          </div>
          
          <ChallengeTitle>{challenge.QuestionText}</ChallengeTitle>
          <ChallengeSubtitle>{challenge.description}</ChallengeSubtitle>
          
          <Tags>
            <Tag>{challenge.programming_language}</Tag>
            <Tag>{challenge.difficulty}</Tag>
            {challenge.tags?.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tags>
          
          <MarginButton>
            <Buttons>
              <Button
                secondary
                onClick={() => navigate(`/user/challengeInfo/${challenge._id}`)}
              >
                Challenge Info
              </Button>
            </Buttons>
          </MarginButton>
        </Card>
      ))}
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