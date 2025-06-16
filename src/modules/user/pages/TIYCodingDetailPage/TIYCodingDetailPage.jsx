// TIYCodingDetailPage.jsx
import React, { useEffect, useState } from 'react';
import {
    PageWrapper,
    Title,
    Description,
    Divider,
    SectionTitle,
    TopicsList,
    TopicItem,
    TryButton,
    BackIcon
} from './TIYCodingDetailPage.styles';
import { getTiyQbCodingQuestionById } from '../../../../api/tiyQbCodingQuestionApi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { use } from 'react';
import { RxArrowLeft } from "react-icons/rx";
import { getmainQuestionById } from '../../../../api/userMainQuestionBankApi';

const TIYCodingDetailPage = () => {
    const [question, setQuestion] = useState(null);
    // const [questionID, setQuestionID] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
   const { questionID } = useParams();
    useEffect(() => {
        const apiCaller = async () => {
            if (!questionID) return;
            const data = await getmainQuestionById(questionID);
            console.log("data", data);
            console.log(data);
            setQuestion(data.data);
        }
        apiCaller();
    }, [questionID]);
    return (
        <PageWrapper>{
            question &&
            <>
                <BackIcon
                    onClick={() => window.history.back()}
                    style={{ borderRadius: "10%", border: "1px solid grey", padding: "8px" }}
                >
                    <RxArrowLeft />
                </BackIcon>

                <Title>{question.question}</Title>
                <Description dangerouslySetInnerHTML={{ __html: question?.description }} />

                <Divider />

                <SectionTitle>Topics Covered</SectionTitle>
                <TopicsList>
                    {
                        question.topics.length > 0 &&
                        question.topics.map((topic, index) => (
                            <TopicItem key={index}>{topic.topic_name}</TopicItem>
                        ))
                    }
                </TopicsList>

                <TryButton onClick={() => {
                    navigate('/user/titcodingRun', { state: { moduleCode: location.state.moduleCode, topicCode: location.state.topicCode, questionID: location.state.questionID } })
                }}>Try Coding</TryButton>
            </>
        }
        </PageWrapper>
    );
};

export default TIYCodingDetailPage;
