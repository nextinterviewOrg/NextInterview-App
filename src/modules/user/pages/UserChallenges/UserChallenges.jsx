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
    Date as StyledDate,
    Status,
    Label,
    CardLabels,
    IconWrapper
} from './UserChallenges.styles';
import star from '../../../../assets/SampleInterviewIcon.svg';
import DOMPurify from 'dompurify';
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
                console.log("User Data:", userDataRes);
                const userId = userDataRes.data.user._id;
                setUserId(userId);

                // Inside useEffect > loadUserDataAndChallenges
                const registeredDate = new Date(userDataRes.data.user.createdAt);
                console.log("Registered Date:", registeredDate);

                // Fetch past challenges
                const challengesRes = await getPastChallengesWithUserResults(userId);
                if (challengesRes?.success && Array.isArray(challengesRes.data)) {
                    const mappedChallenges = challengesRes.data
                        .filter((challenge) => {
                            const challengeDate = challenge.challenge_date ? new Date(challenge.challenge_date) : null;

                            return (
                                challengeDate &&
                                !isNaN(challengeDate) &&
                                challengeDate >= registeredDate &&
                                !challenge?.isDeleted || challenge.isDeleted === false
                            );
                        })
                        .map((challenge) => {
                            const challengeDate = new Date(challenge.challenge_date);
                            const formattedChallengeDate = isNaN(challengeDate)
                                ? 'No date available'
                                : challengeDate.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                });

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
                    console.log("Mapped Challenges:", mappedChallenges);
                }

                console.log("Challenges:", challengesRes.data);
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
                                    <Label difficulty={challenge.difficulty.toLowerCase()} variant="difficulty">
                                        {challenge.difficulty}
                                    </Label>
                                    {challenge.question_type === "approach" && (
                                        <Label variant="default"><img src={star} /> Test your Approach</Label>
                                    )}
                                </CardLabels>
                                <CardTitle>{challenge.title}</CardTitle>
                                {/* <CardSubtitle>
                                    {challenge.description ? (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(challenge.description),
                                            }}
                                        />
                                    ) : (
                                        "No description provided."
                                    )}
                                </CardSubtitle> */}
                            </CardDesc>

                            <CardStatus>
                                <Status status={challenge.status}>
                                    {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                                </Status> <StyledDate>{challenge.date}</StyledDate>
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