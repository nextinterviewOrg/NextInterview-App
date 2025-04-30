import React from 'react';
import {
  FeaturesWrapper,
  Wrapper,
  FeaturesHeading,
  FeatureGrid,
  FeatureCard,
  FeatureImage,
  FeatureTitle,
  PlayIconWrapper
} from './OurFeatures.styles';
import { IoPlay } from "react-icons/io5";
import interview from "../../../assets/interview.jpg";
import approach from "../../../assets/approach.gif";
import topicSummarizer from "../../../assets/topicSummarizer.gif";
import codeExplainer from "../../../assets/codeExplainer.jpg";
import onlinesales from "../../../assets/onlinesales.gif";
import qucikRevise from "../../../assets/qucikRevise.jpg";

const features = [
  {
    title: 'AI Interview Practice',
    image: interview,
    video: true,
  },
  {
    title: 'Approach analyser',
    image: approach,
  },
  {
    title: 'Topic Summariser',
    image: topicSummarizer,
  },
  {
    title: 'Code Explainer',
    image: codeExplainer,
    video: true,
  },
  {
    title: 'Dynamic Difficulty Variations',
    image: topicSummarizer,
  },
  {
    title: 'Code Polish',
    image: onlinesales,
  },
  {
    title: 'Quick Revise',
    image: qucikRevise,
    video: true,
  },
];

const OurFeatures = () => {
  return (
    <FeaturesWrapper>
        <Wrapper>
      <FeaturesHeading>Our Features</FeaturesHeading>
      <FeatureGrid>
        {features.map((item, index) => (
          <FeatureCard key={index}>
            <FeatureImage src={item.image} alt={item.title} />
            {item.video &&
             <PlayIconWrapper><IoPlay /></PlayIconWrapper>
             }
            <FeatureTitle>{item.title}</FeatureTitle>
          </FeatureCard>
        ))}
      </FeatureGrid>
      </Wrapper>
    </FeaturesWrapper>
  );
};

export default OurFeatures;
