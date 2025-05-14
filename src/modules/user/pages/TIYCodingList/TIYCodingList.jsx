// TIYCodingList.jsx
import React, { useEffect, useState } from 'react';
import {
    Wrapper,
    Title,
    List,
    ListItem,
    Meta,
    Badge,
    MainText,
    SubText,
    Status,
    BackIcon
} from './TIYCodingList.styles';
import { getAllTIYCodingQuestions, getTiyQbQuestionWithFilterWithResults } from '../../../../api/tiyQbCodingQuestionApi';
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from '../../../../api/userApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RxArrowLeft } from "react-icons/rx";
// Adjust the path as needed

const TIYCodingList = () => {
    const [questions, setQuestions] = useState([]);
    const [userID, setUserID] = useState(null);
    const [moduleCode, setModuleCode] = useState(null);
    const [TopicCode, setTopicCode] = useState(null);
    const { isSignedIn, user, isLoaded } = useUser();
    const location = useLocation()
    const navigate= useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                if(!location.state.moduleCode || !location.state.topicCode ){return}
                console.log('Fetching coding questions...',location);
                const userData = await getUserByClerkId(user.id);
                setUserID(userData.data.user._id);
                setModuleCode(location.state.moduleCode);
                setTopicCode(location.state.topicCode);
                const res = await getTiyQbQuestionWithFilterWithResults(moduleCode, TopicCode, null, 'tiy', userID);
                console.log(res.data);
                setQuestions(res.data);
            } catch (error) {
                console.error('Failed to fetch coding questions:', error);
            }
        };
        fetchQuestions();
    }, []);
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                  if(!location.state.moduleCode || !location.state.topicCode ){return}
                console.log('Fetching coding questions...',location);
                const userData = await getUserByClerkId(user.id);
                setUserID(userData.data.user._id);
                setModuleCode(location.state.moduleCode);
                setTopicCode(location.state.topicCode);
                const res = await getTiyQbQuestionWithFilterWithResults(moduleCode, TopicCode, null, 'tiy', userID);
                console.log(res.data);
                setQuestions(res.data);
            } catch (error) {
                console.error('Failed to fetch coding questions:', error);
            }
        };
        fetchQuestions();
    }, [moduleCode, TopicCode]);

    return (
        <Wrapper>
            <BackIcon
                onClick={() => {
                    console.log("Return URL:", location.state);   
                  navigate(location.state.returnUrl, { state:location.state });  
                }}
                style={{ borderRadius: "10%", border: "1px solid grey", padding: "8px" }}
            >
                <RxArrowLeft />
            </BackIcon>
            <Title>Coding Questions</Title>
            <List>
                {questions.map((q, index) => (
                    <Link to={`/user/titcodingDetail` } state={{ moduleCode: location.state.moduleCode, topicCode: location.state.topicCode,questionID: q.questionId }} style={{ textDecoration: "none" }}>
                        <ListItem key={index}>
                            <Meta>
                                <Badge>{q.programming_language}</Badge>
                                <MainText>{q.questionText}</MainText>
                                {/* {q.description && <SubText>{q.description}</SubText>} */}
                            </Meta>
                            <Status status={q.userStatus}>{q.userStatus === "attempted" ? "Attempted" : "Not Attempted"}</Status>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Wrapper>
    );
};

export default TIYCodingList;
