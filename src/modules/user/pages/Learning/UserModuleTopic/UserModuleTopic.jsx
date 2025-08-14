// UserModuleTopic.js
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  SummaryContainer,
  SummaryTitle,
  SummaryText,
  ButtonGroup,
  ModalOverlay,
  ModalContent,
  CCModalContent,
  CloseButton,
  TryItYourself,
  TryButton,
  FeedbackPopup,
  FeedbackIcon,
  FeedbackContent,
  FeedbackTitle,
  FeedbackMessage,
  FeedbackCloseButton,
  FeedbackButton,
  FeedbackIconWrapper,
  Spinner
} from "./UserModuleTopic.style";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { BsHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";
import {
  getLastSubTopicByTopicCode,
  getLastTopicByModuleCode,
  getModuleById,
} from "../../../../../api/addNewModuleApi";
import { useLocation, useParams, useNavigate, useOutletContext } from "react-router-dom";
import { summariseTopic } from "../../../../../api/gptApi";
import SkillAssessment from "../SkillAssessment/SkillAssessment";
import {
  completeModule,
  completeSubTopic,
  completeTopic,
  getAllTopicsCompletionStatus,
  getSubtopicCompletionStatus,
  getUserProgressBySubTopic,
  getUserProgressStats,
  startSubTopic,
  startTopic,
} from "../../../../../api/userProgressApi";
import { getUserByClerkId } from "../../../../../api/userApi";
import { useUser } from "@clerk/clerk-react";
import { IoCloseSharp } from "react-icons/io5";
import UserFeedback from "../../../../../components/Feedback/UserFeedback/UserFeedback";
import { checkUserFeedBackExists } from "../../../../../api/moduleFeedbackApi";
import SummarizeIcon from "../../../../../assets/SampleInterviewIcon.svg";
import DOMPurify from 'dompurify';

const courseData1 = {
  title: "",
  topicsList: [
    {
      title: "",
      subtopics: [
        {
          title: "",
          time: "",
          completed: true,
          subtopicContent: "",
          subtopicSummary: "",
          gptSummary: "",
          cheatSheetURL: "",
        },
        { title: "", time: "", completed: false },
        { title: "", time: "", completed: false },
      ],
    },
    {
      title: "",
      subtopics: [],
    },
    {
      title: "",
      subtopics: [],
    },
    {
      title: "",
      subtopics: [],
    },
    {
      title: "",
      subtopics: [],
    },
  ],
};

const apiCache = new Map();

const UserModuleTopic = () => {
  const [moduleNavigationState, setModuleNavigationState] = useOutletContext();
  const [feedback, setFeedback] = useState("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isHelpful, setIsHelpful] = useState(null);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [dislikeAnimation, setDislikeAnimation] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const moduleId = useParams().id;
  const location = useLocation();
  const [courseData, setCourseData] = useState(courseData1);
  const [topicData, setTopicData] = useState(null);
  const [gptSummaryText, setGptSummaryText] = useState([]);
  const [delayedText, setDelayedText] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [markAsCompleteBtnStatus, setMarkAsCompleteBtnStatus] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [popupContent, setPopupContent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isModuleCompleted, setIsModuleCompleted] = useState(false);
  const [feedbackOrder, setFeedbackOrder] = useState(1);
  const [returnUrl, setReturnUrl] = useState(null);
  const [moduleCODE, setModuleCODE] = useState(null);
  const [topicCODE, setTopicCODE] = useState(null);
  const [contentReady, setContentReady] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [assessmentParams, setAssessmentParams] = useState({});
  const [networkError, setNetworkError] = useState(false);

  const { topicCode, subtopicCode } = useMemo(() => location.state || {}, [location.state]);

  // Find the topic and subtopic by their codes
  const currentTopic = useMemo(() => {
    return courseData.topicsList?.find(t => t.topic_code === topicCode);
  }, [courseData, topicCode]);

  const currentSubtopic = useMemo(() => {
    return currentTopic?.subtopics?.find(s => s.subtopic_code === subtopicCode);
  }, [currentTopic, subtopicCode]);

  useEffect(() => {
    // Handle direct subtopic navigation
    if (location.state?.scrollToSubtopic && subtopicCode) {
      const subtopicElement = document.getElementById(`subtopic-${subtopicCode}`);
      if (subtopicElement) {
        setTimeout(() => {
          subtopicElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.state, subtopicCode]);

  // Network error handling
  const withNetworkErrorHandling = async (fn, errorMessage) => {
    try {
      setNetworkError(false);
      return await fn();
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        setNetworkError(true);
        setFeedbackMessage('Network error - please check your connection');
        setShowFeedbackPopup(true);
        throw new Error('Network error');
      }
      console.error(errorMessage, error);
      setFeedbackMessage(errorMessage);
      setShowFeedbackPopup(true);
      throw error;
    }
  };

  // Pre-fetch module data when component mounts
  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await withNetworkErrorHandling(
          () => getModuleById(moduleId),
          "Error fetching module data"
        );
        setModuleName(response.data.moduleName);
        setModuleCODE(response.data.module_code);
        setContentReady(true);
      } catch (error) {
        console.error("Error in fetchModuleData:", error);
      }
    };

    fetchModuleData();
  }, [moduleId]);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setDelayedText((prevText) => [...prevText, nextWord]);
    }, 25 * index);
  };

  const delayText = () => {
    for (let i = 0; i < gptSummaryText.length; i++) {
      delayPara(i, gptSummaryText[i]);
    }
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    
    try {
      const [userData, moduleResponse] = await Promise.all([
        withNetworkErrorHandling(
          () => getUserByClerkId(user.id),
          "Error fetching user data"
        ),
        withNetworkErrorHandling(
          () => getModuleById(moduleId),
          "Error fetching module data"
        )
      ]);

      const module_code = moduleResponse.data.module_code;
      
      // Mark current subtopic as completed
      await withNetworkErrorHandling(
        () => completeSubTopic(userData.data.user._id, module_code, topicCode, subtopicCode),
        "Error completing subtopic"
      );

      // Find next subtopic
      const currentTopic = moduleResponse.data.topicData.find(t => t.topic_code === topicCode);
      const currentSubtopicIndex = currentTopic.subtopicData.findIndex(s => s.subtopic_code === subtopicCode);
      
      let nextTopicCode = topicCode;
      let nextSubtopicCode = subtopicCode;

      // Check if there's a next subtopic in current topic
      if (currentSubtopicIndex < currentTopic.subtopicData.length - 1) {
        nextSubtopicCode = currentTopic.subtopicData[currentSubtopicIndex + 1].subtopic_code;
      } else {
        // Move to next topic
        const currentTopicIndex = moduleResponse.data.topicData.findIndex(t => t.topic_code === topicCode);
        if (currentTopicIndex < moduleResponse.data.topicData.length - 1) {
          nextTopicCode = moduleResponse.data.topicData[currentTopicIndex + 1].topic_code;
          nextSubtopicCode = moduleResponse.data.topicData[currentTopicIndex + 1].subtopicData[0].subtopic_code;
        } else {
          // Last topic completed - check if module is complete
          const topicCompletionData = await withNetworkErrorHandling(
            () => getAllTopicsCompletionStatus(userData.data.user._id, module_code),
            "Error checking topic completion"
          );
          
          if (topicCompletionData.allTopicsCompleted) {
            await withNetworkErrorHandling(
              () => completeModule(userData.data.user._id, module_code),
              "Error completing module"
            );

            const feedbackExists = await withNetworkErrorHandling(
              () => checkUserFeedBackExists({
                userId: userData.data.user._id,
                moduleId: moduleResponse.data._id,
              }),
              "Error checking feedback"
            );

            if (!feedbackExists.found) {
              setShowFeedbackModal(true);
              setFeedbackOrder(1);
              setReturnUrl(`/user/learning`);
              return;
            }
          }
        }
      }

      // Navigate to next subtopic
      navigate(`/user/learning/${moduleId}/topic`, {
        state: {
          topicCode: nextTopicCode,
          subtopicCode: nextSubtopicCode
        }
      });
    } catch (error) {
      console.error('Error in handleCloseModal:', error);
    } finally {
      setLoading(false);
    }
  };

  const cachedApiCall = useCallback(async (key, apiFunction, ...args) => {
    if (apiCache.has(key)) {
      return apiCache.get(key);
    }
    const result = await withNetworkErrorHandling(
      () => apiFunction(...args),
      `Error in cached API call for key: ${key}`
    );
    apiCache.set(key, result);
    return result;
  }, []);

  const loadSubtopic = useCallback(async () => {
    if (!user || !moduleId || !topicCode || !subtopicCode) return;

    setLoading(true);
    setContentReady(false);

    try {
      const cacheKey = `content-${moduleId}-${topicCode}-${subtopicCode}`;
      if (apiCache.has(cacheKey)) {
        const cachedData = apiCache.get(cacheKey);
        setTopicData([cachedData]);
        setGptSummaryText(cachedData.summary);
        setContentReady(true);
        setLoading(false);
        return;
      }

      const [userData, moduleResponse] = await Promise.all([
        cachedApiCall(`user-${user.id}`, getUserByClerkId, user.id),
        cachedApiCall(`module-${moduleId}`, getModuleById, moduleId)
      ]);

      // Find the topic and subtopic by their codes
      const topic = moduleResponse.data.topicData.find(t => t.topic_code === topicCode);
      const subtopic = topic?.subtopicData.find(s => s.subtopic_code === subtopicCode);

      if (!topic || !subtopic) {
        throw new Error('Topic or subtopic not found');
      }

      const subtopicData = {
        title: subtopic.subtopicName,
        description: subtopic.subtopicContent,
        summary: subtopic.subtopicSummary,
        cheatSheetURL: subtopic.cheatSheetURL || "#"
      };

      apiCache.set(cacheKey, subtopicData);
      setTopicData([subtopicData]);
      setGptSummaryText(subtopic.subtopicSummary);

      // Start progress tracking
      await Promise.all([
        withNetworkErrorHandling(
          () => startTopic(
            userData.data.user._id,
            topicCode,
            topic._id,
            moduleResponse.data.module_code,
            moduleId
          ),
          "Error starting topic"
        ),
        withNetworkErrorHandling(
          () => startSubTopic(
            userData.data.user._id,
            moduleResponse.data.module_code,
            topicCode,
            topic._id,
            moduleId,
            subtopicCode,
            subtopic._id
          ),
          "Error starting subtopic"
        )
      ]);

      setContentReady(true);
    } catch (error) {
      console.error("Error loading subtopic:", error);
    } finally {
      setLoading(false);
    }
  }, [user, moduleId, topicCode, subtopicCode, cachedApiCall]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadSubtopic();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadSubtopic]);

  useEffect(() => {
    const apiCaller = async () => {
      try {
        setLoading(true);
        const response = await withNetworkErrorHandling(
          () => getModuleById(moduleId),
          "Error fetching module data"
        );
        
        setModuleName(response.data.moduleName);
        setModuleCODE(response.data.module_code);

        const data = {
          title: response.data.moduleName,
          topicsList: await Promise.all(
            response.data.topicData.map(async (item, topicIndex) => {
              return {
                title: item.topicName,
                topic_code: item.topic_code || "",
                subtopics: await Promise.all(
                  item.subtopicData.map(async (subitem, subIndex) => {
                    return {
                      title: subitem.subtopicName,
                      subtopic_code: subitem.subtopic_code || "",
                      completed: subitem.completed,
                      subtopicContent: subitem.subtopicContent,
                      subtopicSummary: subitem.subtopicSummary,
                      cheatSheetURL: subitem.cheatSheetURL || "#",
                      conceptClarifiers: subitem.conceptClarifier || [],
                    };
                  })
                ),
              };
            })
          ),
        };
        setCourseData(data);
      } catch (error) {
        console.error("Error in apiCaller:", error);
      } finally {
        setLoading(false);
      }
    };

    window.showPopupHandler = (explanation) => {
      if (explanation) {
        setPopupContent(explanation);
        setShowPopup(true);
      }
    };

    apiCaller();
  }, [moduleId]);

  const renderConceptClarifiers = (text, clarifiers) => {
    if (!text || !clarifiers || !Array.isArray(clarifiers)) return text;

    let result = text;

    clarifiers.forEach((clarifier) => {
      if (!clarifier?.conceptClarifier) return;

      try {
        const escapedConcept = clarifier.conceptClarifier.replace(
          /[.*+?^${}()|[\]\\]/g, 
          '\\$&'
        );

        const escapedHover = (clarifier.hoverExplanation || '')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');

        const escapedPopup = DOMPurify.sanitize(clarifier.popupExplanation || '');

        const replacement = `<span class="concept-tooltip" 
          title="${escapedHover}" 
          onClick="window.showPopupHandler('${escapedPopup.replace(/'/g, "\\'")}')"
          style="color: #2390ac; cursor: pointer; text-decoration: underline;"
        >
          ${clarifier.conceptClarifier}
        </span>`;

        const regex = new RegExp(`\\b${escapedConcept}\\b`, "gi");
        result = result.replace(regex, replacement);
      } catch (error) {
        console.error('Error processing clarifier:', clarifier, error);
      }
    });

    return result;
  };

  const handleSummarizeClick = async () => {
    setLoadingSummary(true);
    setShowSummary(true);
    setDelayedText([]);

    setTimeout(() => {
      delayText();
      setLoadingSummary(false);
    }, 1000);
  };

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      console.log("Feedback submitted:", feedbackData);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleSummaryFeedback = (isHelpful) => {
    try {
      if (isHelpful) {
        setLikeAnimation(true);
        setTimeout(() => setLikeAnimation(false), 1000);
      } else {
        setDislikeAnimation(true);
        setTimeout(() => setDislikeAnimation(false), 1000);
      }

      setSelectedFeedback(isHelpful);
      setFeedbackSubmitted(true);
      setIsHelpful(isHelpful);
      setFeedbackMessage(`Thank you for your feedback! The summary was ${isHelpful ? 'helpful' : 'not helpful'}.`);
      setShowFeedbackPopup(true);

      setTimeout(() => {
        setShowFeedbackPopup(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting summary feedback:", error);
    }
  };

const handleMarkAsCompleted = async () => {
  try {
    setLoading(true);
    
    const [moduleResponse, userData] = await Promise.all([
      withNetworkErrorHandling(
        () => getModuleById(moduleId),
        "Error fetching module data"
      ),
      withNetworkErrorHandling(
        () => getUserByClerkId(user.id),
        "Error fetching user data"
      )
    ]);

    if (!moduleResponse?.data || !userData?.data?.user?._id) {
      throw new Error('Required data not available');
    }

    const moduleCode = moduleResponse.data.module_code;
    const userId = userData.data.user._id;

    // Find the current topic and subtopic
    const currentTopic = moduleResponse.data.topicData.find(t => t.topic_code === topicCode);
    if (!currentTopic) {
      throw new Error('Current topic not found');
    }

    const currentSubtopic = currentTopic.subtopicData.find(s => s.subtopic_code === subtopicCode);
    if (!currentSubtopic) {
      throw new Error('Current subtopic not found');
    }

    // Mark current subtopic as completed
    await withNetworkErrorHandling(
      () => completeSubTopic(
        userId,
        moduleCode,
        topicCode,
        subtopicCode,
        currentTopic._id, // Pass topic ID
        currentSubtopic._id // Pass subtopic ID
      ),
      "Error completing subtopic"
    );

    // Check if all subtopics in topic are completed
    const subTopicCompletionData = await withNetworkErrorHandling(
      () => getSubtopicCompletionStatus(
        userId,
        moduleCode,
        topicCode
      ),
      "Error checking subtopic completion"
    );

    if (subTopicCompletionData.allSubtopicCompleted) {
      await withNetworkErrorHandling(
        () => completeTopic(
          userId,
          moduleCode,
          topicCode,
          currentTopic._id
        ),
        "Error completing topic"
      );
      
      // Check if all topics are completed
      const topicCompletionData = await withNetworkErrorHandling(
        () => getAllTopicsCompletionStatus(
          userId,
          moduleCode
        ),
        "Error checking topic completion"
      );

      if (topicCompletionData.allTopicsCompleted) {
        await withNetworkErrorHandling(
          () => completeModule(
            userId,
            moduleCode,
            moduleId
          ),
          "Error completing module"
        );
        setIsModuleCompleted(true);
        return;
      }
    }

    // Navigate to next subtopic
    handleNext();
  } catch (error) {
    console.error("Error marking as completed:", error);
    let errorMessage = 'An error occurred while marking as completed. Please try again.';
    
    if (error.response?.status === 404) {
      errorMessage = 'The requested resource was not found. Please refresh the page.';
    } else if (error.message.includes('not found')) {
      errorMessage = 'The learning content could not be found.';
    }
    
    setFeedbackMessage(errorMessage);
    setShowFeedbackPopup(true);
  } finally {
    setLoading(false);
  }
};

  const handleTryButton = () => {
    navigate(`/user/QusnsTryitYourself/${moduleCODE}/${topicCODE}`);
  };

  const handleNext = async () => {
    try {
      const moduleResponse = await withNetworkErrorHandling(
        () => getModuleById(moduleId),
        "Error fetching module data"
      );

      const currentTopic = moduleResponse.data.topicData.find(t => t.topic_code === topicCode);
      const currentSubtopicIndex = currentTopic.subtopicData.findIndex(s => s.subtopic_code === subtopicCode);

      let nextTopicCode = topicCode;
      let nextSubtopicCode = subtopicCode;

      // Check if there's a next subtopic in the current topic
      if (currentSubtopicIndex < currentTopic.subtopicData.length - 1) {
        nextSubtopicCode = currentTopic.subtopicData[currentSubtopicIndex + 1].subtopic_code;
      } 
      // Otherwise move to next topic
      else {
        const currentTopicIndex = moduleResponse.data.topicData.findIndex(t => t.topic_code === topicCode);
        if (currentTopicIndex < moduleResponse.data.topicData.length - 1) {
          nextTopicCode = moduleResponse.data.topicData[currentTopicIndex + 1].topic_code;
          nextSubtopicCode = moduleResponse.data.topicData[currentTopicIndex + 1].subtopicData[0].subtopic_code;
        } else {
          // Last topic and subtopic - navigate to learning home
          navigate(`/user/learning`);
          return;
        }
      }

      navigate(`/user/learning/${moduleId}/topic`, {
        state: {
          topicCode: nextTopicCode,
          subtopicCode: nextSubtopicCode
        }
      });
    } catch (error) {
      console.error("Error in handleNext:", error);
    }
  };

  return (
    <Container>
      {networkError ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h3>Network Error</h3>
          <p>Please check your internet connection and try again</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      ) : !contentReady ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Spinner />
          <p>Loading subtopic...</p>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <TryItYourself>
              <TryButton onClick={handleTryButton}>Try it yourself</TryButton>
            </TryItYourself>
          </div>

          <div>
            {topicData && (
              <>
                {topicData?.map((topic, index) => (
                  <div key={index}>
                    <Title>{topic.title}</Title>
                    <Text
                      dangerouslySetInnerHTML={{
                        __html: renderConceptClarifiers(
                          topic.description,
                          currentSubtopic?.conceptClarifiers || []
                        ),
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          {contentReady && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                {!showSummary && (
                  <Button
                    style={{
                      border: "2px solid #2390ac",
                      backgroundColor: "transparent",
                      color: "#2390ac",
                      fontWeight: "bold",
                      margin: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={handleSummarizeClick}
                  >
                    <img
                      src={SummarizeIcon}
                      alt="Summarize"
                      style={{ marginRight: "10px" }}
                    />
                    Summarize for me
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {showSummary && (
            <SummaryContainer>
              <SummaryTitle>Summary</SummaryTitle>
              {loadingSummary ? (
                <SummaryText style={{ fontStyle: "italic", color: "#888" }}>
                  Generating summary...
                </SummaryText>
              ) : (
                <SummaryText
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(delayedText.join("")),
                  }}
                />
              )}
              <ButtonGroup
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: "100%",
                  alignContent: "flex-end",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: "20px",
                    marginRight: "20px",
                  }}
                >
                  <FeedbackButton
                    onClick={() => handleSummaryFeedback(true)}
                    isActive={likeAnimation || (feedbackSubmitted && selectedFeedback === true)}
                    style={{ opacity: feedbackSubmitted && selectedFeedback !== true ? 0.5 : 1 }}
                  >
                    <FeedbackIconWrapper isActive={likeAnimation || (feedbackSubmitted && selectedFeedback === true)}>
                      {feedbackSubmitted && selectedFeedback === true ? <BsHandThumbsUpFill /> : <SlLike />}
                    </FeedbackIconWrapper>
                    Helpful
                  </FeedbackButton>
                  <FeedbackButton
                    onClick={() => handleSummaryFeedback(false)}
                    isActive={dislikeAnimation || (feedbackSubmitted && selectedFeedback === false)}
                    style={{ opacity: feedbackSubmitted && selectedFeedback !== false ? 0.5 : 1 }}
                  >
                    <FeedbackIconWrapper isActive={dislikeAnimation || (feedbackSubmitted && selectedFeedback === false)}>
                      {feedbackSubmitted && selectedFeedback === false ? <BsHandThumbsDownFill /> : <SlDislike />}
                    </FeedbackIconWrapper>
                    Not helpful
                  </FeedbackButton>
                </div>
              </ButtonGroup>
            </SummaryContainer>
          )}
        </>
      )}

      {contentReady && (
        <>
          {markAsCompleteBtnStatus ? (
            <Button
              style={{
                backgroundColor: "#2390ac",
                color: "white",
                fontWeight: "bold",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              style={{
                backgroundColor: "#2390ac",
                color: "white",
                fontWeight: "bold",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
              onClick={handleMarkAsCompleted}
            >
              Mark as completed
            </Button>
          )}
        </>
      )}
      
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <SkillAssessment
              {...assessmentParams}
              onCloseModal={handleCloseModal}
              topicCode={topicCode}
              subtopicCode={subtopicCode}
              moduleId={moduleId}
            />
          </ModalContent>
        </ModalOverlay>
      )}

      {(isModuleCompleted || showFeedbackModal) && (
        <ModalOverlay>
          <ModalContent>
            <UserFeedback
              moduleId={moduleId}
              onFeedbackSubmit={handleFeedbackSubmit}
              autoOpen={true}
              returnUrl={returnUrl}
              closeModel={() => setShowFeedbackModal(false)}
              feedbackOrder={feedbackOrder}
            />
          </ModalContent>
        </ModalOverlay>
      )}

      {showPopup && (
        <ModalOverlay onClick={() => setShowPopup(false)}>
          <CCModalContent onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: "0px 0px 30px 0px" }}>Concept Explanation</h2>
            <div dangerouslySetInnerHTML={{ __html: popupContent }} />
            <CloseButton onClick={() => setShowPopup(false)} className="">
              <IoCloseSharp />
            </CloseButton>
          </CCModalContent>
        </ModalOverlay>
      )}

      {showFeedbackPopup && (
        <FeedbackPopup>
          <FeedbackIcon isHelpful={isHelpful}>
            {isHelpful ? '✓' : '✕'}
          </FeedbackIcon>
          <FeedbackContent>
            <FeedbackTitle>Feedback Received</FeedbackTitle>
            <FeedbackMessage>{feedbackMessage}</FeedbackMessage>
          </FeedbackContent>
          <FeedbackCloseButton onClick={() => setShowFeedbackPopup(false)}>
            <IoCloseSharp />
          </FeedbackCloseButton>
        </FeedbackPopup>
      )}
    </Container>
  );
};

export default UserModuleTopic;