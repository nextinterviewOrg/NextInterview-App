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
import { getAllChallengesWithUserResults } from "../../../../api/challengesApi"; // adjust path
import { format } from "date-fns"; // optional: for better date formatting
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
const PastChallenge = ({ userId }) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
const { user} = useUser();
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const userData = await getUserByClerkId(user.id);
        const userId = userData.data.user._id;


        const response = await getAllChallengesWithUserResults(userId);
        setChallenges(response.data); // access `data` from API
      } catch (error) {
        console.error("Failed to fetch past challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [userId]);

  if (loading) return <div>Loading past challenges...</div>;

  return (
    <Wrapper>
      <Title>Past Challenges</Title>

      {challenges.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Image src={quicklyimage} alt="No any past challenges" />
          <Text>No any past challenges</Text>
        </div>
      ) : (
        challenges.map((challenge, index) => (
          <ChallengeItem key={challenge.challengeId}>
            {/* <ChallengeNumber>#{index + 1}</ChallengeNumber> */}
            {/* //newly added challenges should come first in the list */}
             <ChallengeNumber>#{challenges.length - index}</ChallengeNumber>
            <ChallengeDetails>
              <ChallengeDate>
                {challenge.lastAttempted
                  ? format(new Date(challenge.lastAttempted), "dd MMM yyyy")
                  : "Not Attempted"}
              </ChallengeDate>
             
              <ChallengeTitle>{challenge.questionText}</ChallengeTitle>
              <ChallengeDescription>{challenge.description}</ChallengeDescription>
            </ChallengeDetails>
            <Status status={challenge.userStatus === "attempted" ? "Completed" : "Missed"}>
              {challenge.userStatus === "attempted" ? "Completed" : "Missed"}
            </Status>
          </ChallengeItem>
        ))
      )}
    </Wrapper>
  );
};

export default PastChallenge;
