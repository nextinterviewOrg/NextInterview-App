import React, { useEffect, useState } from 'react';
import {
    TopicContainer,
    TopicHeader,
    TopicTopicInfo,
    TopicFaqSection,
    TopicFaq,
    TopicFaqTitle,
    TopicFaqContent,
    TopicToggleIcon,
    TopicStartButton,
    TopicFaqLink,
    Text
} from './QuicklyReviseTopicDetails.styles';
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { Link, Navigate, useParams } from 'react-router-dom';
import { getModuleById } from '../../../../../api/addNewModuleApi';

const QuicklyReviseTopicDetails = () => {
    const [activeFaq, setActiveFaq] = useState(null);
    const [topicData, setTopicData] = useState({});

    const params = useParams();
    useEffect(() => {
        const apiCaller = async () => {
            const response = await getModuleById(params.id);
            console.log("response heheh", response.data.topicData[params.topic]);
            setTopicData(response.data.topicData[params.topic]);
        }
        apiCaller();
    }, []);
    const handleToggleFaq = (faqId) => {
        setActiveFaq(prev => (prev === faqId ? null : faqId)); // Toggle the FAQ
    };

    return (
        <TopicContainer>
            <TopicHeader>
                <TopicTopicInfo>
                    <h1>{topicData.topicName}</h1>

                </TopicTopicInfo>
            </TopicHeader>

            <TopicFaqSection>
                {topicData &&
                    topicData?.subtopicData?.map((faq, index) => {
                        return (
                            <TopicFaq>
                                <TopicFaqTitle>
                                    <span>{faq.subtopicName}</span>
                                    <TopicToggleIcon onClick={() => handleToggleFaq(`faq${index+1}`)}>
                                        {activeFaq === `faq${index+1}` ? <FiMinusCircle /> : <FiPlusCircle />}
                                    </TopicToggleIcon>
                                </TopicFaqTitle>
                                {activeFaq === `faq${index+1}` && (<>

                                    <TopicFaqContent>
                                        <Text
                                            dangerouslySetInnerHTML={{
                                                __html: parseJSONContent(faq.revisionPoints),
                                            }}
                                        ></Text>
                                    </TopicFaqContent>
                                  <Link to={`/user/learning/${params.id}/topic`}
                                   state={{ topicIndex: Number(params.topic), subtopicIndex: index }}
                                    style={{ textDecoration: 'none' }}> <TopicFaqLink >Read more</TopicFaqLink></Link> 
                                </>
                                )}
                            </TopicFaq>
                        )
                    })
                }
            </TopicFaqSection>

        </TopicContainer>
    );
};
const parseJSONContent = (content) => {
    try {
        const parsedContent = JSON.parse(content);
        return parsedContent; // Return parsed content if it's valid JSON
    } catch (error) {
        console.error("Error parsing JSON content:", error);
        return content; // Return original content if parsing fails
    }
};

export default QuicklyReviseTopicDetails;
