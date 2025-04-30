import React from 'react';
import { ArsenalContainer, Heading, CardContainer, Card, IconWrapper, Title, Description } from './Arsenal.styles';
import Arsenal1 from '../../../assets/Arsenal1.svg';
import Arsenal2 from '../../../assets/Arsenal2.svg';

const arsenalItems = [
  {
    icon: Arsenal2,
    title: "Practice Unlimited:",
    description: "Grind with questions they actually ask"
  },
  {
    icon: Arsenal1,
    title: "Interview Practice:",
    description: "Practice with our cutting-edge AI agents tuned to crack real interviews."
  },
  {
    icon: Arsenal2,
    title: "Instant Feedback:",
    description: "Receive AI-powered, instant insights to sharpen your approach."
  }
];

const Arsenal = () => {
  return (
    <ArsenalContainer>
      <Heading>Your Prep Arsenal</Heading>
      <CardContainer>
        {arsenalItems.map((item, index) => (
          <Card key={index}>
            <IconWrapper>
              <img src={item.icon} alt={item.title} />
            </IconWrapper>
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
          </Card>
        ))}
      </CardContainer>
    </ArsenalContainer>
  );
};

export default Arsenal;