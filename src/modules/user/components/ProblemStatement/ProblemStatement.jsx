import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
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

const ProblemStatement = (props) => {
  const location = useLocation();

  const feedbackData = props.feedback || location.state?.feedback || {};
  const metricsData = props.metrics || location.state?.metrics || {};
  const summaryData = props.summary || location.state?.summary || '';
  const baseQuestion = props.base_question || location.state?.base_question || '';
  const questions = props.questions || location.state?.questions || [];

  
    // Fallbacks for static content if not provided
    const summary = summaryData || [
        {
            title: 'Summary',
            content: feedbackData?.summary || 'No summary available.'
        }
    ];

    const feedback = feedbackData ? {
        positives: [
            {
                title: 'Positive points',
                content: feedbackData.positive_points || []
            }
        ],
        address: [
            {
                title: 'Points to address',
                content: feedbackData.points_to_address || []
            }
        ],
        improvement: [
            {
                title: 'Areas for improvement',
                content: feedbackData.areas_for_improvement || []
            }
        ]
    } : {
        positives: [],
        address: [],
        improvement: []
    };
  
    const metrics = Object.keys(metricsData).length
    ? Object.entries(metricsData).map(([key, value]) => ({
        title: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        label: value,
      }))
    : [{ title: 'No metrics available', label: '' }];

  // Render HTML safely for base question
  const renderBaseQuestion = () => (
    <div dangerouslySetInnerHTML={{ __html: baseQuestion }} />
  );

  return (
    <Container>
      <MainHeading>Interview Feedback</MainHeading>

      {/* Problem Statement Section */}
      <Section>
        <Heading>Problem Statement</Heading>
        <Text>{renderBaseQuestion()}</Text>
      </Section>

      {/* Metrics */}
      <CardContainer>
        {metrics.map((metric, idx) => (
          <Card key={idx}>
            <CardTitle>{metric.title}</CardTitle>
            <CardSubtitle>{metric.label}</CardSubtitle>
          </Card>
        ))}
      </CardContainer>

  {/* Summary Section (always show) */}
            <SummaryContainer>
                {(summary.length > 0 ? summary : [{ title: 'Summary', content: 'No summary available.' }]).map((section, idx) => (
                    <SummarySection key={idx}>
                        <SummaryHeading>{section.title}</SummaryHeading>
                        <SummaryText>{section.content}</SummaryText>
                    </SummarySection>
                ))}
            </SummaryContainer>

            {/* Feedback Points Section (always show) */}
            <CardContainer>
                {['positives', 'address', 'improvement'].map((key, idx) => (
                    (feedback[key] && feedback[key].length > 0 ? feedback[key] : [{ title: feedbackTitles[key], content: ['No points available.'] }]).map((section, sIdx) => (
                        <Card key={`${idx}-${sIdx}`}>
                            <SubHeading>{section.title}</SubHeading>
                            <List>
                                {section.content.map((point, pIdx) => (
                                    <ListItem key={pIdx}>{point}</ListItem>
                                ))}
                            </List>
                        </Card>
                    ))
                ))}
            </CardContainer>

            {/* Practice Questions Section (always show) */}
            <Practisequsns>
                <PSHeading>Practise similar questions</PSHeading>
                <PSQuestionsList>
                    {(questions && questions.length > 0 ? questions : ['No practice questions available.']).map((question, idx) => (
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
  feedback: PropTypes.object,
  metrics: PropTypes.object,
  summary: PropTypes.string,
  base_question: PropTypes.string,
  questions: PropTypes.array,
};

export default ProblemStatement;
