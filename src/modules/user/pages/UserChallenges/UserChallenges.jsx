// import React, { useState } from "react";
// import TakeChallenge from "../../components/UserChalleneges/TakeChallenge";
// import PastChallenge from "../../components/UserChalleneges/PastChallenge";
// import {
//     UserChallengesWrapper,
//     Challengescontainer,
//     Tabbuttons
// } from "./UserChallenges.styles";
// import ApproachAnalysis from "../../components/UserChalleneges/Approachanalysis/ApproachAnalysis";
// import CaseStudy from "../../components/UserChalleneges/CaseStudy/CaseStudy";
// import SingleLine from "../../components/UserChalleneges/SingleLine/SingleLine"
// import MultiLine from "../../components/UserChalleneges/MultiLine/MultiLine";
// import MCQ from "../../components/UserChalleneges/MCQ/MCQ";

// const UserChallenges = () => {
//     const [activeTab, setActiveTab] = useState("Coding");

//     return (
//         <UserChallengesWrapper>
//             <Challengescontainer>

//                 {/* Tab Navigation */}
//                 <Tabbuttons>
//                     <button
//                         className={activeTab === "Coding" ? "active" : ""}
//                         onClick={() => setActiveTab("Coding")}
//                     >
//                         Coding
//                     </button>
//                     <button
//                         className={activeTab === "Approach Analysis" ? "active" : ""}
//                         onClick={() => setActiveTab("Approach Analysis")}
//                     >
//                         Approach Analysis
//                     </button>
//                     <button
//                         className={activeTab === "Case Study" ? "active" : ""}
//                         onClick={() => setActiveTab("Case Study")}
//                     >
//                         Case Study
//                     </button>
//                     <button
//                         className={activeTab === "Single-line" ? "active" : ""}
//                         onClick={() => setActiveTab("Single-line")}
//                     >
//                         Single-line
//                     </button>
//                     <button
//                         className={activeTab === "Multi-line" ? "active" : ""}
//                         onClick={() => setActiveTab("Multi-line")}
//                     >
//                         Multi-line
//                     </button>
//                     <button
//                         className={activeTab === "MCQ" ? "active" : ""}
//                         onClick={() => setActiveTab("MCQ")}
//                     >
//                         MCQ
//                     </button>

//                 </Tabbuttons>

//                 <hr className="divider" />

//                 {/* Tab Content */}
//                 {activeTab === "Coding" && (
//                     <>
//                         <TakeChallenge />
//                         <hr className="divider" />
//                         <PastChallenge />
//                     </>
//                 )}

//                 {activeTab === "Approach Analysis" && (
//                     <>
//                         <ApproachAnalysis />
//                     </>
//                 )}

//                 {activeTab === "Case Study" && (
//                     <>
//                         <CaseStudy />
//                     </>
//                 )}

//                 {activeTab === "Single-line" && (
//                     <>
//                     <SingleLine />
//                     </>
//                 )}

//                 {activeTab === "Multi-line" && (
//                     <>
//                     <MultiLine/>
//                     </>
//                 )}

//                 {activeTab === "MCQ" && (
//                     <>
//                     <MCQ/>
//                     </>
//                 )}

//             </Challengescontainer>
//         </UserChallengesWrapper>
//     );
// };

// export default UserChallenges;



import React from 'react';
import {
    Title,
    Wrapper,
    Card,
    Icon,
    CardDesc,
    CardStatus,
    CardTitle,
    CardSubtitle,
    Date,
    Status,
    Label,
    CardLabels,
    IconWrapper
} from './UserChallenges.styles';

import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaCode } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import TakeChallenge from '../../components/UserChalleneges/TakeChallenge';
import { useNavigate } from 'react-router-dom'; 

const challengeData = [
    {
        id: 1,
        type: 'code',
        category: 'Machine learning',
        difficulty: 'Medium',
        status: 'Missed',
        date: '19 Nov 2024',
        title: 'Predicting Customer Churn in a Subscription-Based Business',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolor vitae nostrum? Voluptatem ullam temporibus nihil, eius obcaecati unde neque quos quibusdam recusandae necessitatibus nesciunt assumenda voluptates nostrum suscipit natus eligendi, modi inventore reprehenderit! Atque illo nihil ipsa amet adipisci alias voluptate aliquam accusantium. Soluta explicabo unde dolores quod natus ab perspiciatis repellat nemo, laudantium laborum tenetur nesciunt architecto doloremque ullam ex temporibus fugit aut consectetur accusantium ducimus vero beatae nisi neque itaque! Sint harum iusto cum sit ullam consequatur nihil quibusdam pariatur omnis aperiam, mollitia, numquam doloribus est recusandae, veritatis eaque odio eius enim sunt maxime magni similique ea!'
    },
    {
        id: 2,
        type: 'text',
        category: 'Python',
        difficulty: 'Hard',
        status: 'Missed',
        date: '19 Nov 2024',
        title: 'Predicting Churn Using Behavioral Data',
        description: 'This challenge involves identifying customer churn patterns based on user activity logs and product interactions...'
    },
    {
        id: 3,
        type: 'code',
        category: 'Machine learning',
        difficulty: 'Easy',
        status: 'Completed',
        date: '18 Nov 2024',
        title: 'Feature Engineering for Churn Models',
        description: 'In this task, you explore feature selection and transformation techniques to improve churn prediction accuracy...'
    },
    {
        id: 4,
        type: 'text',
        category: 'Data Science',
        difficulty: 'Medium',
        status: 'Missed',
        date: '17 Nov 2024',
        title: 'Visualizing Customer Lifetime Value',
        description: 'Use pandas and matplotlib to visualize and interpret the CLV of users over time with various business scenarios...'
    },
    {
        id: 5,
        type: 'code',
        category: 'Deep Learning',
        difficulty: 'Hard',
        status: 'Completed',
        date: '16 Nov 2024',
        title: 'Predicting Subscription Renewals with RNNs',
        description: 'Train a recurrent neural network on time series data to forecast subscription renewals and churn likelihood...'
    }
];


const UserChallenges = () => {

    const navigate = useNavigate();

    return (
        <Wrapper>
            <TakeChallenge />

            <Title>Past Challenges</Title>
            {challengeData.map((challenge) => (
                <Card key={challenge.id} onClick={() => navigate(`/user/mainQuestionBank/questionBank/${challenge.id - 1}`)} style={{ cursor: 'pointer' }}>

                    <IconWrapper>
                        <Icon type={challenge.type} status={challenge.status}>
                            {challenge.status === 'Completed' ? (
                                <FaCheck />
                            ) : challenge.type === 'text' ? (
                                <MdOutlineModeEditOutline />
                            ) : (
                                <FaCode />
                            )}
                        </Icon>
                    </IconWrapper>

                    <CardDesc>
                        <CardLabels>
                            <Label>{challenge.category}</Label>
                            <Label difficulty={challenge.difficulty.toLowerCase()}>{challenge.difficulty}</Label>
                        </CardLabels>
                        <CardTitle>{challenge.title}</CardTitle>
                        <CardSubtitle>{challenge.description}</CardSubtitle>
                    </CardDesc>

                    <CardStatus>
                        {challenge.status !== 'Completed' && <Status>{challenge.status}</Status>}
                        <Date>{challenge.date}</Date>
                    </CardStatus>


                </Card>
            ))}
        </Wrapper>
    );
};

export default UserChallenges;
