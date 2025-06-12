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
  const { user } = useUser();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchChallenges = async () => {
      try {
        const { data: userData } = await getUserByClerkId(user.id);
        const userId = userData.user._id;
console.log("Userid",userId);
        /** -----------------------------------------------------------------
         *  The API already returns the array of challenge objects we need.
         *  If your backend nests it one level deeper (e.g. res.data.data),
         *  just tweak the line below accordingly.
         *  ----------------------------------------------------------------*/
        const { data } = await getAllChallengesWithUserResults(
          userId,
          "coding"
        );
        console.log("data hvhvhv",data);

        setChallenges(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch past challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [user?.id]);

  /* ------------ Helpers ------------------------------------------------ */

  const getStatus = (challenge) => {
    // hasAnswered → attempted; hasAnswered + finalResult → completed
    if (challenge.hasAnswered) {
      return challenge.finalResult ? "Completed" : "Attempted";
    }
    return "Not Attempted";
  };

  // Map UI colour variants in <Status>
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "completed";
      case "Attempted":
        return "attempted";
      default:
        return "notAttempted";
    }
  };

  /* --------------------------------------------------------------------- */

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
          <Image src={quicklyimage} alt="No past challenges" />
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

                <ChallengeTitle>
                  {challenge.QuestionText || challenge.questionText}
                </ChallengeTitle>

                {challenge.description && (
                  <ChallengeDescription>
                  {challenge.question_type==="coding" ?"N/A": (challenge.description || "No description provided.")}
                  </ChallengeDescription>
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
