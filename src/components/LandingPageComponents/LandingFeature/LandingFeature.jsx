import React, { useState } from "react";
import {
  SectionWrapper,
  Sidebar,
  Tab,
  ActiveTab,
  MainTitle,
  Content,
  Title,
  Title2,
  Description,
  HowItWorks,
  Step,
  StepNumber,
  StepText,
  ButtonRow,
  GetStartedButton,
  VideoContainer,
  VideoImage,
  PlayButton,
  WatchText,
  SectionVideo,
  ContainerWrapper,
  How
} from "../LandingFeature/LandingFeature.style";

import interviewVideoImage from "../../../assets/featureLanding.jpg"; // Video thumbnail
import analyserIllustration from "../../../assets/featureLanding2.png"; // New image for Approach Analyser
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const features = [
  {
    key: "AI Interview Practice",
    title: "AI Interview Practice",
    description:
      "Our premium mock interview feature is designed to simulate real interview scenarios, letting you practice in a realistic, pressure-free environment. It helps you gain confidence and refine your responses through hands-on experience and comprehensive feedback.",
    steps: [
      "Pick an interview round or topic and kick off your session.",
      "Answer or code responses as an AI interviewer posts questions, mimicking real–world challenges.",
      "Receive holistic, actionable feedback to improve and excel in your next interview."
    ],
    mediaType: "video",
    mediaSrc: interviewVideoImage
  },
  {
    key: "Approach analyser",
    title: "Approach Analyser",
    description:
      "Our premium mock interview feature is designed to simulate real interview scenarios, letting you practice in a realistic, pressure-free environment. It helps you gain confidence and refine your responses through hands-on experience and comprehensive feedback.",
    steps: [
        "Pick an interview round or topic and kick off your session.",
        "Answer or code responses as an AI interviewer posts questions, mimicking real–world challenges.",
        "Receive holistic, actionable feedback to improve and excel in your next interview."
    ],
    mediaType: "image",
    mediaSrc: analyserIllustration
  },
  {
    key: "Topic Summariser",
    title: "Topic Summariser",
    description:
      "Our premium mock interview feature is designed to simulate real interview scenarios, letting you practice in a realistic, pressure-free environment. It helps you gain confidence and refine your responses through hands-on experience and comprehensive feedback.",
    steps: [
        "Pick an interview round or topic and kick off your session.",
        "Answer or code responses as an AI interviewer posts questions, mimicking real–world challenges.",
        "Receive holistic, actionable feedback to improve and excel in your next interview."
    ],
    mediaType: "image",
    mediaSrc: analyserIllustration
  },
  {
    key: "Code Explainer",
    title: "Code Explainer",
    description:
      "Our premium mock interview feature is designed to simulate real interview scenarios, letting you practice in a realistic, pressure-free environment. It helps you gain confidence and refine your responses through hands-on experience and comprehensive feedback.",
    steps: [
        "Pick an interview round or topic and kick off your session.",
        "Answer or code responses as an AI interviewer posts questions, mimicking real–world challenges.",
        "Receive holistic, actionable feedback to improve and excel in your next interview."
    ],
    mediaType: "image",
    mediaSrc: analyserIllustration
  },
  {
    key: "Dynamic Difficulty Variations",
    title: "Dynamic Difficulty Variations",
    description:
      "Our premium mock interview feature is designed to simulate real interview scenarios, letting you practice in a realistic, pressure-free environment. It helps you gain confidence and refine your responses through hands-on experience and comprehensive feedback.",
    steps: [
        "Pick an interview round or topic and kick off your session.",
        "Answer or code responses as an AI interviewer posts questions, mimicking real–world challenges.",
        "Receive holistic, actionable feedback to improve and excel in your next interview."
    ],
    mediaType: "image",
    mediaSrc: analyserIllustration
  },
  {
    key: "Code Polish",
    title: "Code Polish",
    description:
      "Our premium mock interview feature is designed to simulate real interview scenarios, letting you practice in a realistic, pressure-free environment. It helps you gain confidence and refine your responses through hands-on experience and comprehensive feedback.",
    steps: [
        "Pick an interview round or topic and kick off your session.",
        "Answer or code responses as an AI interviewer posts questions, mimicking real–world challenges.",
        "Receive holistic, actionable feedback to improve and excel in your next interview."
    ],
    mediaType: "image",
    mediaSrc: analyserIllustration
  },
  {
    key: "Quick Revise",
    title: "Quick Revise",
    description:
      "Our premium mock interview feature is designed to simulate real interview scenarios, letting you practice in a realistic, pressure-free environment. It helps you gain confidence and refine your responses through hands-on experience and comprehensive feedback.",
    steps: [
        "Pick an interview round or topic and kick off your session.",
        "Answer or code responses as an AI interviewer posts questions, mimicking real–world challenges.",
        "Receive holistic, actionable feedback to improve and excel in your next interview."
    ],
    mediaType: "image",
    mediaSrc: analyserIllustration
  },
  
];

const LandingFeature = () => {
  const [activeTab, setActiveTab] = useState("AI Interview Practice");
  const currentFeature = features.find(f => f.key === activeTab);
  const navigate= useNavigate();

  return (
    <ContainerWrapper>
           <MainTitle>Our Features</MainTitle>
      <SectionWrapper>
     
        <Sidebar>
          {features.map(feature =>
            feature.key === activeTab ? (
              <ActiveTab key={feature.key}>{feature.key}</ActiveTab>
            ) : (
              <Tab key={feature.key} onClick={() => setActiveTab(feature.key)}>
                {feature.key}
              </Tab>
            )
          )}
        </Sidebar>


        <Content>

          <Title>{currentFeature.title}</Title>
          <Description>{currentFeature.description}</Description>
          <Title2> How it Works</Title2>
          <SectionVideo>
          <How>
            <HowItWorks>
              {currentFeature.steps.map((step, index) => (
                <Step key={index}>
                  <StepNumber>{String(index + 1).padStart(2, "0")}</StepNumber>
                  <StepText>{step}</StepText>
                </Step>
              ))}
            </HowItWorks>
            <ButtonRow>
            <GetStartedButton onClick={() => navigate("/login")}>Get Started</GetStartedButton>
          </ButtonRow>
          </How>
            <VideoContainer>
              <VideoImage
                src={currentFeature.mediaSrc}
                alt={`${currentFeature.title} visual`}
              />
              {currentFeature.mediaType === "video" && (
                <>
                  <PlayButton>
                    <FaPlay />
                  </PlayButton>
                  <WatchText>Watch this video to learn more</WatchText>
                </>
              )}
            </VideoContainer>
          </SectionVideo>
        </Content>
      </SectionWrapper>
    </ContainerWrapper>
  );
};

export default LandingFeature;
