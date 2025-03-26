import React, { useState, useRef, useEffect } from 'react';
import {
    Container,
    Header,
    ModuleInfo,
    StartButton,
    TabsContainer,
    Tab,
    ContentContainer,
    FaqSection,
    Faq,
    FaqTitle,
    FaqContent,
    ToggleIcon,
    ModuleImage,
    PageTitle,
    HeaderHeading,
    HeaderDiscription,
    HeaderInfo,
    ArrowButton
} from './QuicklyDetailed.styles';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { getModuleById } from '../../../../../api/addNewModuleApi';

// const topics = [
//     { id: 'topic1', name: 'Topic 1', content: 'Content for Topic 1' },
//     { id: 'topic2', name: 'Topic 2', content: 'Content for Topic 2' },
//     { id: 'topic3', name: 'Topic 3', content: 'Content for Topic 3' },
//     { id: 'topic4', name: 'Topic 4', content: 'Content for Topic 4' },
//     { id: 'topic5', name: 'Topic 5', content: 'Content for Topic 5' },
//     { id: 'topic6', name: 'Topic 6', content: 'Content for Topic 1' },
//     { id: 'topic7', name: 'Topic 7', content: 'Content for Topic 2' },
//     { id: 'topic8', name: 'Topic 8', content: 'Content for Topic 3' },
//     { id: 'topic9', name: 'Topic 9', content: 'Content for Topic 4' },
//     { id: 'topic10', name: 'Topic 10', content: 'Content for Topic 5' },
//     { id: 'topic11', name: 'Topic 11', content: 'Content for Topic 5' },
//     { id: 'topic12', name: 'Topic 12', content: 'Content for Topic 1' },
//     { id: 'topic13', name: 'Topic 13', content: 'Content for Topic 2' },
//     { id: 'topic14', name: 'Topic 14', content: 'Content for Topic 3' },
//     { id: 'topic15', name: 'Topic 15', content: 'Content for Topic 4' },
//     { id: 'topic16', name: 'Topic 16', content: 'Content for Topic 5' },
// ];

const QuicklyDetailed = () => {
    
    const [activeFaq, setActiveFaq] = useState(null); // Track which FAQ is open
    const tabsContainerRef = useRef(null);
    const [showArrows, setShowArrows] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const [moduleData, setModuleData] = useState({});
    const [topic, setTopic] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(topic[0]?.id);
    useEffect(() => {
        const apiCaller = async () => {
            const response = await getModuleById(params.id);
            console.log("response", response);
            setModuleData(response.data);
            const topics = [];
            response.data.topicData.map((item, ind) => {
             topics.push({ id: ind, name: `Topic ${ind + 1}` });
            });
            console.log("topics", topics);
            setSelectedTopic(topics[0]?.id);
           setTopic(topics);
        }
        apiCaller();

    }, []);

    const handleTabClick = (topicId) => {
        setSelectedTopic(topicId);
        navigate(`/user/revise/${params.id}/${topicId}`);

    };

    const handleToggleFaq = (faqId) => {
        setActiveFaq(prev => (prev === faqId ? null : faqId)); // Toggle the FAQ
    };

    const scrollTabs = (direction) => {
        const container = tabsContainerRef.current;
        container.scrollBy({
            left: direction === 'left' ? -200 : 200, // Scroll by 200px left or right
            behavior: 'smooth', // Smooth scrolling
        });
    };

    useEffect(() => {
        const checkOverflow = () => {
            if (tabsContainerRef.current) {
                const container = tabsContainerRef.current;
                // Check if the container's scroll width is greater than its client width (indicating overflow)
                setShowArrows(container.scrollWidth > container.clientWidth);
            }
        };

        // Initial check
        checkOverflow();

        // Add a resize event listener to detect when the window is resized
        window.addEventListener('resize', checkOverflow);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, []);

    const selectedTopicContent = topic.find(topic => topic.id === selectedTopic)?.content;

    return (
        <Container>
            <PageTitle>Data Science Lite Modules</PageTitle>
            <Header>

                <div>

                    <ModuleImage src={moduleData.imageURL} alt="Module Image" />
                    <ModuleInfo>
                        <HeaderHeading>{moduleData.moduleName}</HeaderHeading>
                        <HeaderDiscription>{moduleData.description}</HeaderDiscription>
                        <HeaderInfo>{moduleData?.topicData?.length} topics • Less than {moduleData?.approxTimeTaken} hrs</HeaderInfo>
                    </ModuleInfo>
                    <StartButton onClick={() => navigate(`/user/learning/${params.id}`)}>Revise Module</StartButton>
                </div>
            </Header>

            {showArrows ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
                    <ArrowButton onClick={() => scrollTabs('left')}><GrFormPrevious /></ArrowButton>
                    <TabsContainer ref={tabsContainerRef}>
                        {topic.map((topic) => (
                            <Tab
                                key={topic.id}
                                className={selectedTopic === topic.id ? 'active' : ''}
                                onClick={() => handleTabClick(topic.id)}
                            >
                                {topic.name}
                            </Tab>
                        ))}
                    </TabsContainer>
                    <ArrowButton onClick={() => scrollTabs('right')}><GrFormNext /></ArrowButton>
                </div>
            )
                : (
                    <TabsContainer ref={tabsContainerRef}>
                        {topic.map((topic) => (
                            <Tab
                                key={topic.id}
                                className={selectedTopic === topic.id ? 'active' : ''}
                                onClick={() => handleTabClick(topic.id)}
                            >
                                {topic.name}
                            </Tab>
                        ))}
                    </TabsContainer>
                )}

            <Outlet />

            {/* <ContentContainer>
                <h3>Machine Learning Description</h3>
                <p>{selectedTopicContent}</p>

                <FaqSection>
                    <Faq>
                        <FaqTitle>
                            <span>Is there a free trial available?</span>
                            <ToggleIcon onClick={() => handleToggleFaq('faq1')}>
                                {activeFaq === 'faq1' ? '-' : '+'}
                            </ToggleIcon>
                        </FaqTitle>
                        {activeFaq === 'faq1' && <FaqContent>Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.</FaqContent>}
                    </Faq>
                    <Faq>
                        <FaqTitle>
                            <span>What is your cancellation policy?</span>
                            <ToggleIcon onClick={() => handleToggleFaq('faq2')}>
                                {activeFaq === 'faq2' ? '-' : '+'}
                            </ToggleIcon>
                        </FaqTitle>
                        {activeFaq === 'faq2' && <FaqContent>Read more</FaqContent>}
                    </Faq>
                    <Faq>
                        <FaqTitle>
                            <span>Can I change my plan later?</span>
                            <ToggleIcon onClick={() => handleToggleFaq('faq3')}>
                                {activeFaq === 'faq3' ? '-' : '+'}
                            </ToggleIcon>
                        </FaqTitle>
                        {activeFaq === 'faq3' && <FaqContent>Read more</FaqContent>}
                    </Faq>
                    <Faq>
                        <FaqTitle>
                            <span>Can other info be added to an invoice?</span>
                            <ToggleIcon onClick={() => handleToggleFaq('faq4')}>
                                {activeFaq === 'faq4' ? '-' : '+'}
                            </ToggleIcon>
                        </FaqTitle>
                        {activeFaq === 'faq4' && <FaqContent>Read more</FaqContent>}
                    </Faq>
                    <Faq>
                        <FaqTitle>
                            <span>How does billing work?</span>
                            <ToggleIcon onClick={() => handleToggleFaq('faq5')}>
                                {activeFaq === 'faq5' ? '-' : '+'}
                            </ToggleIcon>
                        </FaqTitle>
                        {activeFaq === 'faq5' && <FaqContent>Read more</FaqContent>}
                    </Faq>
                </FaqSection>
            </ContentContainer> */}
        </Container>
    );
};

export default QuicklyDetailed;
