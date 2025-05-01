// OurMission.jsx
import React from 'react';
import {
  Wrapper,
  Title,
  Description,
  SectionCard,
  CardHeader,
  CardText,
  CardContent,
  QuoteIcon,
  CardImage,
  MissionContent,
  CardTitle,
  VisionContent
} from './OurMission.styles';

import missionImg from '../../../assets/Mission.svg'; // Replace with actual mission image path
import visionImg from '../../../assets/Vision.svg';   // Replace with actual vision image path

const OurMission = () => {
  return (
    <Wrapper>
      <Title>Who Are We</Title>
      <Description>
        We know how difficult it can be to get an interview call—and even more challenging to land a job
        in today’s competitive market. Preparing for interviews often means juggling countless browser
        tabs filled with blogs, coding websites, and endless resources. That’s why we, a group of
        seasoned professionals with deep industry experience, created Nextinterview. Our personalized
        interview prep platform is designed to revolutionize how data aspirants prepare for interviews,
        transforming academic knowledge into the language companies need. We're here to simplify the
        journey, helping you confidently secure that dream job.
      </Description>

      <SectionCard>
        <CardContent>
          <CardHeader>Our Mission</CardHeader>
          <MissionContent>
          <CardImage src={missionImg} alt="Our Mission" />
          <CardText>
          <QuoteIcon>❝</QuoteIcon>
          <CardTitle>
            Help every data candidate interview smarter, faster, and with confidence.  <QuoteIcon right>❝</QuoteIcon>
            </CardTitle>

          </CardText>
          
          </MissionContent>
        </CardContent>
        
      </SectionCard>

      <SectionCard reverse>

        <CardContent>
          <CardHeader>Our Vision</CardHeader>
          <VisionContent>

          <CardText>
          <QuoteIcon>❝</QuoteIcon>
          <CardTitle>
            Make interview prep smarter, sharper, and radically personalized.
          <QuoteIcon right>❝</QuoteIcon>
          </CardTitle>
          </CardText>
          <CardImage src={visionImg} alt="Our Vision" />
        </VisionContent>
        </CardContent>

      </SectionCard>
    </Wrapper>
  );
};

export default OurMission;
