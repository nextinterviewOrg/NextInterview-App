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

  // Use navigation state from context if available, otherwise from location
  const { topicIndex, subtopicIndex } = useMemo(() => {
    return moduleNavigationState || location.state || {};
  }, [moduleNavigationState, location.state]);

  const cachedApiCall = useCallback(async (key, apiFunction, ...args) => {
    if (apiCache.has(key)) {
      return apiCache.get(key);
    }
    const result = await apiFunction(...args);
    apiCache.set(key, result);
    return result;
  }, []);

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await getModuleById(moduleId);
        setModuleName(response.data.moduleName);
        setModuleCODE(response.data.module_code);
        setContentReady(true);
      } catch (error) {
        console.error("Error fetching module data:", error);
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
  let finalTopicIndex = topicIndex;
  let finalSubTopicIndex = subtopicIndex;
  
  try {
    const userData = await getUserByClerkId(user.id);
    const moduleResponse = await getModuleById(moduleId);
    
    // Verify the subtopic exists before trying to complete it
    if (!moduleResponse.data?.topicData?.[topicIndex]?.subtopicData?.[subtopicIndex]) {
      throw new Error('Subtopic not found');
    }

    const module_code = moduleResponse.data.module_code;
    const topic_code = moduleResponse.data.topicData[topicIndex].topic_code;
    const subtopic_code = moduleResponse.data.topicData[topicIndex].subtopicData[subtopicIndex].subtopic_code;
    
    // Add loading state
    setLoading(true);
    
    const markingSubTopicCompleted = await completeSubTopic(
      userData.data.user._id, 
      module_code, 
      topic_code, 
      subtopic_code
    ).catch(error => {
      console.error('Error completing subtopic:', error);
      throw error; // Re-throw to be caught by outer try-catch
    });

    finalSubTopicIndex = finalSubTopicIndex + 1;

    const subTopicCompletionData = await getSubtopicCompletionStatus(
      userData.data.user._id, 
      module_code, 
      topic_code, 
      subtopic_code
    );

    if (subTopicCompletionData.allSubtopicCompleted) {
      await completeTopic(userData.data.user._id, module_code, topic_code);
      finalTopicIndex = finalTopicIndex + 1;
      finalSubTopicIndex = 0;
      
      const topicCompletionData = await getAllTopicsCompletionStatus(
        userData.data.user._id, 
        module_code
      );
      
      if (topicCompletionData.allTopicsCompleted) {
        await completeModule(userData.data.user._id, module_code);

        const feedbackExists = await checkUserFeedBackExists({
          userId: userData.data.user._id,
          moduleId: moduleResponse.data._id,
        });

        if (!feedbackExists.found) {
          setShowFeedbackModal(true);
          setFeedbackOrder(1);
          setReturnUrl(`/user/learning/`);
          return;
        }
      }
    }

    const newState = { topicIndex: finalTopicIndex, subtopicIndex: finalSubTopicIndex };
    setModuleNavigationState(newState);
    navigate(`/user/learning/${moduleId}/topic`, { state: newState });
  } catch (error) {
    console.error('Error in handleCloseModal:', error);
    // Show error to user (you might want to add a toast or error message state)
    setLoading(false);
    // Optionally: Re-open modal or show error message
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const checkCompletionStatus = async () => {
      if (!user || !moduleId || topicIndex === undefined || subtopicIndex === undefined) return;

      try {
        const userData = await getUserByClerkId(user.id);
        const moduleResponse = await getModuleById(moduleId);
        const module_code = moduleResponse.data.module_code;
        const topic_code = moduleResponse.data.topicData[topicIndex].topic_code;
        const subtopic_code = moduleResponse.data.topicData[topicIndex].subtopicData[subtopicIndex].subtopic_code;

        const progress = await getUserProgressBySubTopic({
          userId: userData.data.user._id,
          moduleCode: module_code,
          topicCode: topic_code,
          subtopicCode: subtopic_code,
        });

        setMarkAsCompleteBtnStatus(progress.data.status === "completed");
      } catch (error) {
        console.error("Error checking completion status:", error);
      }
    };

    checkCompletionStatus();
  }, [user, moduleId, topicIndex, subtopicIndex]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [moduleResponse, userData] = await Promise.all([
          cachedApiCall(`module-${moduleId}`, getModuleById, moduleId),
          cachedApiCall(`user-${user?.id}`, getUserByClerkId, user?.id)
        ]);
        
        setModuleName(moduleResponse.data.moduleName);
        setModuleCODE(moduleResponse.data.module_code);
        
        moduleResponse.data.topicData.forEach((topic, tIdx) => {
          topic.subtopicData.forEach((subtopic, sIdx) => {
            const cacheKey = `content-${moduleId}-${tIdx}-${sIdx}`;
            if (!apiCache.has(cacheKey)) {
              apiCache.set(cacheKey, {
                title: subtopic.subtopicName,
                description: subtopic.subtopicContent,
                summary: subtopic.subtopicSummary,
                cheatSheetURL: subtopic.cheatSheetURL || "#"
              });
            }
          });
        });
      } catch (error) {
        console.error("Initial data loading error:", error);
      }
    };

    fetchInitialData();
  }, [moduleId, user?.id, cachedApiCall]);

  const loadSubtopic = useCallback(async () => {
    if (!user || !moduleId || topicIndex === undefined || subtopicIndex === undefined) return;

    setLoading(true);
    setContentReady(false);

    try {
      const startTime = performance.now();
      
      const cacheKey = `content-${moduleId}-${topicIndex}-${subtopicIndex}`;
      if (apiCache.has(cacheKey)) {
        const cachedData = apiCache.get(cacheKey);
        setTopicData([cachedData]);
        setGptSummaryText(cachedData.summary);
        setContentReady(true);
        setLoading(false);
        console.log(`Loaded from cache in ${performance.now() - startTime}ms`);
        return;
      }

      const [userData, moduleResponse] = await Promise.all([
        cachedApiCall(`user-${user.id}`, getUserByClerkId, user.id),
        cachedApiCall(`module-${moduleId}`, getModuleById, moduleId)
      ]);

      const currentSubtopic = moduleResponse.data.topicData[topicIndex].subtopicData[subtopicIndex];
      const subtopicData = {
        title: currentSubtopic.subtopicName,
        description: currentSubtopic.subtopicContent,
        summary: currentSubtopic.subtopicSummary,
        cheatSheetURL: currentSubtopic.cheatSheetURL || "#"
      };

      apiCache.set(cacheKey, subtopicData);
      
      setTopicData([subtopicData]);
      setGptSummaryText(subtopicData.summary);

      const module_code = moduleResponse.data.module_code;
      const topic_code = moduleResponse.data.topicData[topicIndex].topic_code;
      const subtopic_code = currentSubtopic.subtopic_code;
      
      Promise.all([
        startTopic(
          userData.data.user._id,
          topic_code,
          moduleResponse.data.topicData[topicIndex]._id,
          module_code,
          moduleId
        ),
        startSubTopic(
          userData.data.user._id,
          module_code,
          topic_code,
          moduleResponse.data.topicData[topicIndex]._id,
          moduleId,
          subtopic_code,
          currentSubtopic._id,
        )
      ]).catch(e => console.error("Background progress tracking error:", e));

      console.log(`Subtopic loaded in ${performance.now() - startTime}ms`);
      setContentReady(true);
      setLoading(false);
    } catch (error) {
      console.error("Error loading subtopic:", error);
      setLoading(false);
      setContentReady(true);
    }
  }, [user, moduleId, topicIndex, subtopicIndex, cachedApiCall]);

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
        const response = await getModuleById(moduleId);
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
        setLoading(false);
        setCourseData(data);
      } catch (error) {
        console.error("Error in UserModuleTopic apiCaller:", error);
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
    const event = new CustomEvent('subtopicCompleted', {
      detail: {
        moduleId,
        topicIndex,
        subtopicIndex
      }
    });
    window.dispatchEvent(event);

    const allSubtopicsCompleted = courseData.topicsList[topicIndex].subtopics.every(subtopic => subtopic.completed);
    if (allSubtopicsCompleted) {
      setIsModuleCompleted(true);
    }

    try {
      const moduleResponse = await getModuleById(moduleId);
      
      if (!moduleResponse || !moduleResponse.data || !moduleResponse.data.module_code) {
        console.error("Module data missing!");
        return;
      }
      const module_code = moduleResponse.data.module_code;

      if (!moduleResponse.data.topicData || moduleResponse.data.topicData.length === 0) {
        console.error("No topics found for module_code:", module_code);
        return;
      }

      const topicData = moduleResponse.data.topicData[topicIndex];
      if (!topicData || !topicData.topic_code) {
        console.error("topic_code not found.");
        return;
      }
      const topic_code = topicData.topic_code;

      if (!topicData.subtopicData || topicData.subtopicData.length === 0) {
        console.error("No subtopics found for topic_code:", topic_code);
        return;
      }

      const subtopicData = topicData.subtopicData[subtopicIndex];
      if (!subtopicData || !subtopicData.subtopic_code) {
        console.error("subtopic_code not found.");
        return;
      }
      const subtopic_code = subtopicData.subtopic_code;

      const params = {
        module_code,
        topic_code,
        subtopic_code,
        question_type: subtopicData.question_type,
        level: subtopicData.level,
      };

      setAssessmentParams(params);
      setShowModal(true);
    } catch (error) {
      const rollbackEvent = new CustomEvent('subtopicCompleted', {
        detail: {
          moduleId,
          topicIndex,
          subtopicIndex,
          completed: false
        }
      });
      window.dispatchEvent(rollbackEvent);
      console.error("Error marking as completed:", error);
    }
  };

  const handleTryButton = () => {
    navigate(`/user/QusnsTryitYourself/${moduleCODE}/${topicCODE}`);
  };

  const handleNext = async () => {
    try {
      const moduleResponse = await getModuleById(moduleId);

      if (!moduleResponse.data || !moduleResponse.data.topicData || moduleResponse.data.topicData.length === 0) {
        console.error("No topic data found in module response");
        return;
      }

      const module_code = moduleResponse.data.module_code;
      const topic_code = moduleResponse.data.topicData[topicIndex].topic_code;
      const subtopic_code = moduleResponse.data.topicData[topicIndex].subtopicData[subtopicIndex].subtopic_code;

      const lastTopic = await getLastTopicByModuleCode({
        moduleCode: module_code,
      });
      const lastSubTopic = await getLastSubTopicByTopicCode({
        moduleCode: module_code,
        topicCode: topic_code,
      });

      let finalTopicIndex = topicIndex;
      let finalSubTopicIndex = subtopicIndex;

      if (lastSubTopic.data.subtopic_code === subtopic_code) {
        finalTopicIndex = finalTopicIndex + 1;
        finalSubTopicIndex = 0;
      } else {
        finalSubTopicIndex = finalSubTopicIndex + 1;
      }

      if (lastTopic.data.topic_code === topic_code && lastSubTopic.data.subtopic_code === subtopic_code) {
        navigate(`/user/learning`);
        return;
      }

      const newState = { topicIndex: finalTopicIndex, subtopicIndex: finalSubTopicIndex };
      setModuleNavigationState(newState);
      navigate(`/user/learning/${moduleId}/topic`, {
        state: newState,
      });
    } catch (error) {
      console.error("Error in handleNext:", error);
    }
  };

  return (
    <Container>
      {!contentReady ? (
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
                          courseData?.topicsList?.[topicIndex]
                            ?.subtopics?.[subtopicIndex]
                            ?.conceptClarifiers || []
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
              currentTopicIndex={topicIndex}
              currentSubTopicIndex={subtopicIndex}
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