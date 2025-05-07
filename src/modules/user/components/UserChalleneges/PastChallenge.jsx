import React from "react";
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


const challenges = [
  {
    id: 120,
    date: "19 Nov 2024",
    status: "Completed",
    title: "Predicting Customer Churn in a ghg Subscription–Based Business",
    description:
      "You are given a dataset from a subscription-based business that includes customer demographics, subscription details, usage patterns, and past customer interactions. The goal is to predict whether a customer is likely to churn (cancel their subscription) within the next three months.",
  },
  {
    id: 119,
    date: "19 Nov 2024",
    status: "Missed",
    title: "Predicting Customer Churn in a Subscription–Based Business",
    description:
      "You are given a dataset from a subscription-based business that includes customer demographics, subscription details, usage patterns, and past customer interactions. The goal is to predict whether a customer is likely to churn (cancel their subscription) within the next three months.",
  },
  {
    id: 118,
    date: "19 Nov 2024",
    status: "Completed",
    title: "Predicting Customer Churn in a Subscription–Based Business",
    description:
      "You are given a dataset from a subscription-based business that includes customer demographics, subscription details, usage patterns, and past customer interactions. The goal is to predict whether a customer is likely to churn (cancel their subscription) within the next three months.",
  },
  {
    id: 117,
    date: "19 Nov 2024",
    status: "Completed",
    title: "Predicting Customer Churn in a Subscription–Based Business",
    description:
      "You are given a dataset from a subscription-based business that includes customer demographics, subscription details, usage patterns, and past customer interactions. The goal is to predict whether a customer is likely to churn (cancel their subscription) within the next three months.",
  },
];


const PastChallenge = () => {
  return (
    <Wrapper>
      <Title>Past Challenges</Title>

      {challenges.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Image src={quicklyimage} alt="No any past challenges" />
          <Text>No any past challenges</Text>
        </div>
      ) : (
        challenges.map((challenge) => (
          <ChallengeItem key={challenge.id}>
            <ChallengeNumber>#{challenge.id}</ChallengeNumber>
            <ChallengeDetails>
              <ChallengeDate>{challenge.date}</ChallengeDate>
              <ChallengeTitle>{challenge.title}</ChallengeTitle>
              <ChallengeDescription>{challenge.description}</ChallengeDescription>
            </ChallengeDetails>
            <Status status={challenge.status}>{challenge.status}</Status>
          </ChallengeItem>
        ))
      )}
    </Wrapper>
  );
};

export default PastChallenge;
