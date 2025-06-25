import React from 'react';
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
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProblemStatement = (props) => {
    // Accept feedback and interview data via props or location.state
    const location = useLocation();
    const feedbackData = props.feedback || location.state?.feedback;
    const metricsData = props.metrics || location.state?.metrics;
    const summaryData = props.summary || location.state?.summary;
    const problemStatement = props.problemStatement || location.state?.base_question;
    const questions = props.questions || location.state?.questions;

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

const metrics =
  metricsData && Object.keys(metricsData).length > 0
    ? Object.entries(metricsData).map(([key, value]) => ({
        title: key
          .replace(/_/g, ' ')
          .replace(/\b\w/g, char => char.toUpperCase()), // Capitalize each word
        label: value
      }))
    : [];


    return (
        <Container>
            <MainHeading>Interview Feedback</MainHeading>
            {/* Problem Statement Section (always show) */}
            <Section>
                <Heading>Problem statement</Heading>
                <Text>{problemStatement || 'No problem statement available.'}</Text>
            </Section>

            {/* Metrics Section (always show) */}
<CardContainer>
  {(metrics.length > 0 ? metrics : [{ title: 'No metrics available.', label: '' }]).map((metric, idx) => (
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

// Add feedbackTitles for placeholder titles
const feedbackTitles = {
    positives: 'Positive points',
    address: 'Points to address',
    improvement: 'Areas for improvement',
};

ProblemStatement.propTypes = {
    feedback: PropTypes.object,
    metrics: PropTypes.array,
    summary: PropTypes.array,
    problemStatement: PropTypes.string,
    questions: PropTypes.array,
};

export default ProblemStatement;
