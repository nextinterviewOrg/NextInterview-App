import React from "react";
import amazon from "../../../../assets/Avatar.svg";
import flipkart from "../../../../assets/PersonPhoto.svg";
import google from "../../../../assets/image.svg";

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
} from "./NewChallenges.style";
import { useNavigate } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";


const NewChallenge = () => {
  const iconList = [
    { src: amazon, alt: "" },
    { src: flipkart, alt: "" },
    { src: google, alt: "" },
  ];

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/user/TakeChallenge");
  };
 
  const handleGoBack = () => {
    navigate('/user/challenges'); // Navigate back to the previous page
  };

  return (
    <>
    <BackIcon              onClick={handleGoBack}
          style={{
            borderRadius: "10%",
            border: "1px solid grey",
            padding: "8px",
          }}><RxArrowLeft /></BackIcon>
    <Card>
      <Header>
        <Tag>#Today's Challenge 123</Tag>
        <Title>
          Predicting Customer Churn in a Subscription-Based Business
        </Title>
        <Description>
          You are given a dataset from a subscription-based business that
          includes customer demographics, subscription details, usage patterns,
          and past customer interactions. The goal is to predict whether a
          customer is likely to churn (cancel their subscription) within the
          next three months.
        </Description>
      </Header>

      <hr className="hrtag" />

      <TopicsList>
        <TopicItem>Topic 1</TopicItem>
        <TopicItem>Topic 2</TopicItem>
        <TopicItem>Topic 3</TopicItem>
        <TopicItem>Topic 4</TopicItem>
      </TopicsList>

      <hr className="hrtag" />

      <Footer>
        <Button onClick={handleClick}>Take Challenge</Button>
        <Icons>
          <div className="icons-container">
            <span>Previously Asked In</span>

            {iconList.map((icon, index) => (
              <img
                key={index}
                src={icon.src}
                alt={icon.alt}
                style={{ right: `${index * 10}px` }} // Adjust overlap dynamically
              />
            ))}
          </div>
        </Icons>
      </Footer>
    </Card>
    </>
  );
};

export default NewChallenge;
