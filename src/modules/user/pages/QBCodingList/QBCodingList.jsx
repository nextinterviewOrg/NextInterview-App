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
} from './QBCodingList.styles';
import { getAllTIYCodingQuestions, getTiyQbQuestionWithFilterWithResults } from '../../../../api/tiyQbCodingQuestionApi';
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from '../../../../api/userApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RxArrowLeft } from "react-icons/rx";
import { getModuleCode } from '../../../../api/addNewModuleApi';
import { Select, notification } from 'antd';
import api from '../../../../config/axiosconfig';
// Adjust the path as needed

const QBCodingList = () => {
    const [questions, setQuestions] = useState([]);
    const [userID, setUserID] = useState(null);
    const [moduleCode, setModuleCode] = useState(null);
    const [TopicCode, setTopicCode] = useState(null);
    const { isSignedIn, user, isLoaded } = useUser();
    const [moduleOptions, setModuleOptions] = useState([]);
    const [selectedModuleCode, setSelectedModuleCode] = useState(null);
    const location = useLocation()
    const navigate = useNavigate();
    useEffect(() => {
        const apiCaller = async () => {
            const moduleCodesData = await getModuleCode();
            const preparedModuleOptions = moduleCodesData.data.map((module) => { return ({ value: module.module_code, label: module.module_name }) })
            setModuleOptions(preparedModuleOptions);
            setSelectedModuleCode(preparedModuleOptions.length > 0 ? preparedModuleOptions[0].value : null);
            const userData = await getUserByClerkId(user.id);
            setUserID(userData.data.user._id);
        }
        apiCaller();

    }, [user])

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                if (!selectedModuleCode|| !userID) { return }

                console.log('Fetching coding questions...', location);
               

                const res = await getTiyQbQuestionWithFilterWithResults(selectedModuleCode, null, null, 'questionBank', userID);
                console.log("res.data", res.data);
                setQuestions(res.data);
            } catch (error) {
                console.error('Failed to fetch coding questions:', error);
            }
        };
        fetchQuestions();
    }, [selectedModuleCode, userID]);
    // useEffect(() => {
    //     const fetchQuestions = async () => {
    //         try {
    //               if(!location.state.moduleCode || !location.state.topicCode ){return}
    //             console.log('Fetching coding questions...',location);
    //             const userData = await getUserByClerkId(user.id);
    //             setUserID(userData.data.user._id);
    //             setModuleCode(location.state.moduleCode);
    //             setTopicCode(location.state.topicCode);
    //             const res = await getTiyQbQuestionWithFilterWithResults(moduleCode, TopicCode, null, 'tiy', userID);
    //             console.log(res.data);
    //             setQuestions(res.data);
    //         } catch (error) {
    //             console.error('Failed to fetch coding questions:', error);
    //         }
    //     };
    //     fetchQuestions();
    // }, [moduleCode, TopicCode]);

    return (
        <Wrapper>
            {/* <BackIcon
                onClick={() => {
                    console.log("Return URL:", location.state);
                    navigate(location.state.returnUrl, { state: location.state });
                }}
                style={{ borderRadius: "10%", border: "1px solid grey", padding: "8px" }}
            >
                <RxArrowLeft />
            </BackIcon> */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title>Coding Questions</Title>
                <Select
                    style={{ width: '40%' }}
                    showSearch

                    placeholder="Select a module"
                    filterOption={(input, option) => {
                        var _a;
                        return (
                            (_a = option === null || option === void 0 ? void 0 : option.label) !== null &&
                                _a !== void 0
                                ? _a
                                : ''
                        )
                            .toLowerCase()
                            .includes(input.toLowerCase());
                    }}
                    options={moduleOptions}
                    value={selectedModuleCode}
                    onChange={(e) => { setSelectedModuleCode(e); }}
                />
            </div>

            <List>
                {questions.map((q, index) => (
                    <Link to={`/user/mainQuestionBank/qbdetail`} state={{ questionID: q.questionId,  }} style={{ textDecoration: "none" }} >
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

export default QBCodingList;
