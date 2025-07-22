import React, { useEffect, useState } from 'react';
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
import { getPastChallengesWithUserResults } from '../../../../api/challengesApi';
import { useUser } from '@clerk/clerk-react';
import { getUserByClerkId } from '../../../../api/userApi';

const UserChallenges = () => {
    const navigate = useNavigate();
    const [challenges, setChallenges] = useState([]);
    const [userId, setUserId] = useState(null);
    const { user } = useUser();

    const capitalizeFirstLetter = (string) => {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    };

    // Load user ID and fetch challenges
    useEffect(() => {
        const loadUserDataAndChallenges = async () => {
            try {
                // Fetch user data
                const userDataRes = await getUserByClerkId(user.id);
                const userId = userDataRes.data.user._id;
                setUserId(userId);

                // Fetch past challenges
                const challengesRes = await getPastChallengesWithUserResults(userId);
                if (challengesRes?.success && Array.isArray(challengesRes.data)) {
                    const mappedChallenges = challengesRes.data.map((challenge) => {
                        // Safely parse challenge date
                        let challengeDate = challenge.challenge_date;
                        let formattedChallengeDate = 'No date available';

                        if (challengeDate) {
                            const dateObj = new window.Date(challengeDate);
                            if (!isNaN(dateObj.getTime())) {
                                formattedChallengeDate = dateObj.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                });
                            }
                        }

                        return {
                            id: challenge.challengeId || challenge._id,
                            title: challenge.questionText || "Untitled Challenge",
                            description: challenge.description || "",
                            category: challenge.category || "Other",
                            difficulty: challenge.difficulty ? capitalizeFirstLetter(challenge.difficulty) : "Easy",
                            type: challenge.type === 'text' ? 'text' : 'code',
                            status: challenge.isCompleted ? 'Completed' : (challenge.userStatus || 'Pending'),
                            date: formattedChallengeDate,
                            question_type: challenge.question_type
                        };
                    });

                    setChallenges(mappedChallenges);
                }
            } catch (error) {
                console.error("Failed to fetch past challenges:", error);
            }
        };

        if (user?.id) {
            loadUserDataAndChallenges();
        }
    }, [user]);
    const questionTypeDisplayNames = {
        'mcq': 'MCQ',
        'single-line': 'Single Line',
        'multi-line': 'Multi Line',
        'approach': 'Approach',
        'coding': 'Coding',
        'case-study': 'Case Study'
    };
    return (
        <Wrapper>
            <TakeChallenge />

            <Title>Past Challenges</Title>

            {challenges.length > 0 ? (
                challenges.map((challenge) => {
                    return (
                        <Card
                            key={challenge.id}
                            onClick={() => navigate(`/user/challengeInfo/${challenge.id}/true`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <IconWrapper>
                                <Icon type={challenge.question_type} status={challenge.status}>
                                    {challenge.status === 'attempted' ? (
                                        <FaCheck />
                                    ) : challenge.question_type === 'coding' ? (
                                        <FaCode />
                                    ) : (
                                        <MdOutlineModeEditOutline />

                                    )}
                                </Icon>
                            </IconWrapper>

                            <CardDesc>
                                <CardLabels>
                                    {/* <Label>{questionTypeDisplayNames[challenge.question_type] || challenge.question_type}</Label> */}
                                    <Label difficulty={challenge.difficulty.toLowerCase()}>
                                        {challenge.difficulty}
                                    </Label>
                                </CardLabels>
                                <CardTitle>{challenge.title}</CardTitle>
                                <CardSubtitle>
                                    {challenge.question_type === "coding" ? "N/A" : (challenge.description || "No description provided.")}
                                </CardSubtitle>
                            </CardDesc>

                            <CardStatus>
                                <Status status={challenge.status}>
                                    {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                                </Status> <Date>{challenge.date}</Date>
                            </CardStatus>
                        </Card>
                    )
                })
            ) : (
                <p>No past challenges found.</p>
            )}
        </Wrapper>
    );
};

export default UserChallenges;