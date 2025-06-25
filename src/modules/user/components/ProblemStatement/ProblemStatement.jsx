import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Container,
  MainHeading,
  Section,
  Heading,
  Text,
  CardContainer,
  CardTitle,
  CardSubtitle,
  Card,
  SubHeading,
  SummaryText,
  List,
  ListItem,
  SummaryHeading,
  Practisequsns,
  PSQuestionsList,
  PSHeading,
  PSQuestionItem,
  SummaryContainer,
  SummarySection
} from './ProblemStatement.styles';
import { IoOpenOutline } from "react-icons/io5";

const feedbackTitles = {
  positives: 'Positive points',
  address: 'Points to address',
  improvement: 'Areas for improvement',
};

const ProblemStatement = () => {
  const location = useLocation();
  const state = location.state || {};

  const feedbackData = state.feedback || {};
  const metricsData = state.metrics || {};
  const summaryData = state.summary || '';
  const baseQuestion = state.base_question || '';
  const questions = state.questions || [];

  const summary = Array.isArray(summaryData)
    ? summaryData
    : [{
        title: 'Summary',
        content: summaryData || feedbackData?.summary || 'No summary available.',
      }];

  const feedback = {
    positives: [{
      title: feedbackTitles.positives,
      content: feedbackData.positive_points || ['No points available.'],
    }],
    address: [{
      title: feedbackTitles.address,
      content: feedbackData.points_to_address || ['No points available.'],
    }],
    improvement: [{
      title: feedbackTitles.improvement,
      content: feedbackData.areas_for_improvement || ['No points available.'],
    }],
  };

  const metrics = Object.keys(metricsData).length
    ? Object.entries(metricsData).map(([key, value]) => ({
        title: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        label: value,
      }))
    : [{ title: 'No metrics available', label: '' }];

  const renderBaseQuestion = () => (
    <div dangerouslySetInnerHTML={{ __html: baseQuestion }} />
  );

  return (
    <Container>
      <MainHeading>Interview Feedback</MainHeading>

      <Section>
        <Heading>Problem Statement</Heading>
        <Text>{renderBaseQuestion()}</Text>
      </Section>

      <CardContainer>
        {metrics.map((metric, idx) => (
          <Card key={idx}>
            <CardTitle>{metric.title}</CardTitle>
            <CardSubtitle>{metric.label}</CardSubtitle>
          </Card>
        ))}
      </CardContainer>

      <SummaryContainer>
        {summary.map((section, idx) => (
          <SummarySection key={idx}>
            <SummaryHeading>{section.title}</SummaryHeading>
            <SummaryText>{section.content}</SummaryText>
          </SummarySection>
        ))}
      </SummaryContainer>

      <CardContainer>
        {['positives', 'address', 'improvement'].map((key, idx) =>
          feedback[key].map((section, sIdx) => (
            <Card key={`${key}-${sIdx}`}>
              <SubHeading>{section.title}</SubHeading>
              <List>
                {section.content.map((point, pIdx) => (
                  <ListItem key={pIdx}>{point}</ListItem>
                ))}
              </List>
            </Card>
          ))
        )}
      </CardContainer>

      <Practisequsns>
        <PSHeading>Practise similar questions</PSHeading>
        <PSQuestionsList>
          {(questions.length > 0 ? questions : ['No practice questions available.']).map((question, idx) => (
            <PSQuestionItem key={idx}>
              <p className='questions'>{question}</p>
              <IoOpenOutline className='openicon' />
            </PSQuestionItem>
          ))}
        </PSQuestionsList>
      </Practisequsns>
    </Container>
  );
};

ProblemStatement.propTypes = {
  // props no longer used, but keeping for potential future support
  feedback: PropTypes.object,
  metrics: PropTypes.object,
  summary: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  base_question: PropTypes.string,
  questions: PropTypes.array,
};

export default ProblemStatement;
