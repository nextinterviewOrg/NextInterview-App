import React, { useEffect, useState } from "react";
import {
  Wrapper,
  Image,
  Text,
  Title,
  ChallengeItem,
  ChallengeNumber,
  ChallengeDetails,
  ChallengeTitle,
  ChallengeDate,
  ChallengeDescription,
  Status,
} from "./PastChallenge.styles";
import quicklyimage from "../../assets/quicklyimage.png";
import { getAllChallengesWithUserResults } from "../../../../api/challengesApi";
import { format } from "date-fns";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";

const PastChallenge = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const userData = await getUserByClerkId(user.id);
        const userId = userData.data.user._id;

        const response = await getAllChallengesWithUserResults(userId, "coding"); // or "mcq", etc.
        setChallenges(response.data || []);
        console.log("API response: track", response);
      } catch (error) {
        console.error("Failed to fetch past challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [user.id]);

  const getStatus = (challenge) => {
    if (challenge.userStatus === "answered") {
      return challenge.finalResult === true ? "Completed" : "Missed";
    }
    return "Not Attempted";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "completed";
      case "Missed":
        return "missed";
      default:
        return "notAttempted";
    }
  };

  if (loading) return <div>Loading past challenges...</div>;

  return (
    <Wrapper>
      <Title>Past Challenges</Title>

      {challenges.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={quicklyimage} alt="No any past challenges" />
          <Text>No past challenges</Text>
        </div>
      ) : (
        challenges.map((challenge, index) => {
          const statusText = getStatus(challenge);
          const statusKey = getStatusColor(statusText);

          return (
            <ChallengeItem key={challenge._id || challenge.challengeId}>
              <ChallengeNumber>#{challenges.length - index}</ChallengeNumber>

              <ChallengeDetails>
                <ChallengeDate>
                  {challenge.lastAttempted
                    ? format(new Date(challenge.lastAttempted), "dd MMM yyyy")
                    : "Not Attempted"}
                </ChallengeDate>

                <ChallengeTitle>{challenge.QuestionText || challenge.questionText}</ChallengeTitle>

                {challenge.description && (
                  <ChallengeDescription>{challenge.description}</ChallengeDescription>
                )}
              </ChallengeDetails>

              <Status status={statusKey}>{statusText}</Status>
            </ChallengeItem>
          );
        })
      )}
    </Wrapper>
  );
};

export default PastChallenge;
