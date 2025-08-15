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
const [initialDataLoaded, setInitialDataLoaded] = useState(false);
// const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

// const [subtopicCODE, setSubtopicCODE] = useState(subtopicCode);

// useEffect(() => {
//   if (subtopicCode) {
//     setSubtopicCODE(subtopicCode);
//   }
// }, [subtopicCode]);

// useEffect(() => {
//   if (topicCode) {
//     setTopicCODE(topicCode);
//   }
// }, [topicCode]);


  const { topicCode, subtopicCode } = useMemo(() => location.state || {}, [location.state]);

  console.log("topicCode", topicCode);
  console.log("subtopicCode", subtopicCode);

  // Find the topic and subtopic by their codes
  const currentTopic = useMemo(() => {
    return courseData.topicsList?.find(t => t.topic_code === topicCode);
  }, [courseData, topicCode]);

  console.log("currentTopic", currentTopic);

const currentSubtopic = useMemo(() => {
  return currentTopic?.subtopics?.find(s => s.subtopic_code === subtopicCode);
}, [currentTopic, subtopicCode]);

  console.log("currentSubtopic", currentSubtopic);

  useEffect(() => {
     setShowSummary(false); // Close summary popup on navigation
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
  // Pre-fetch module data when component mounts
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
  setShowSummary(false); // Add this line to close summary popup

  const userData = await getUserByClerkId(user.id);
  const moduleResponse = await getModuleById(moduleId);
  const module_code = moduleResponse.data.module_code;

  // Mark current subtopic as completed
  await completeSubTopic(userData.data.user._id, module_code, topicCode, subtopicCode);

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
      const topicCompletionData = await getAllTopicsCompletionStatus(userData.data.user._id, module_code);
      if (topicCompletionData.allTopicsCompleted) {
        await completeModule(userData.data.user._id, module_code);
        navigate(`/user/learning`);
        return;
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
};


// const cachedApiCall = useCallback(async (key, apiFunction, ...args) => {
//     if (apiCache.has(key)) {
//       return apiCache.get(key);
//     }
//     const result = await apiFunction(...args);
//     apiCache.set(key, result);
//     return result;
//   }, []);

  // Pre-fetch all module data when component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await getModuleById(moduleId);
        // setLoading(true);
        // const [moduleResponse, userData] = await Promise.all([
        //   cachedApiCall(`module-${moduleId}`, getModuleById, moduleId),
        //   user ? cachedApiCall(`user-${user.id}`, getUserByClerkId, user.id) : Promise.resolve(null)
        // ]);

        // if (!moduleResponse) throw new Error('Module not found');
        
        setModuleName(response.data.moduleName);
      setModuleCODE(response.data.module_code);

             setCourseData({
        title: response.data.moduleName,
        topicsList: response.data.topicData.map(topic => ({
          title: topic.topicName,
          topic_code: topic.topic_code,
          subtopics: topic.subtopicData.map(subtopic => ({
            title: subtopic.subtopicName,
            subtopic_code: subtopic.subtopic_code,
            subtopicContent: subtopic.subtopicContent,
            subtopicSummary: subtopic.subtopicSummary,
            conceptClarifiers: subtopic.conceptClarifier || []
          }))
        }))
      });
      
      // If no topicCode in location.state, use first topic and subtopic
      if (!location.state?.topicCode) {
        const firstTopic = response.data.topicData[0];
        if (firstTopic) {
          const firstSubtopic = firstTopic.subtopicData[0];
          if (firstSubtopic) {
            navigate(`/user/learning/${moduleId}/topic`, {
              state: {
                topicCode: firstTopic.topic_code,
                subtopicCode: firstSubtopic.subtopic_code,
                replace: true // This replaces the current entry in history
              }
            });
          }
        }
      }
      
      setInitialDataLoaded(true);
      } catch (error) {
        console.error("Error in fetchInitialData:", error);
        setFeedbackMessage("Error loading module data");
        setShowFeedbackPopup(true);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [moduleId,navigate]);

//   useEffect(() => {
//   if (initialDataLoaded && topicCODE && subtopicCODE) {
//     loadSubtopic();
//   }
// }, [initialDataLoaded, topicCODE, subtopicCODE, loadSubtopic]);


    const loadSubtopic = useCallback(async () => {
  if (!user || !moduleId || !topicCode || !subtopicCode) return;

  setLoading(true);
  setContentReady(false);

  try {
        setTopicCODE(topicCode);
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
      getUserByClerkId(user.id),
      getModuleById(moduleId)
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
      startTopic(
        userData.data.user._id,
        topicCode,
        topic._id,
        moduleResponse.data.module_code,
        moduleId
      ),
      startSubTopic(
        userData.data.user._id,
        moduleResponse.data.module_code,
        topicCode,
        topic._id,
        moduleId,
        subtopicCode,
        subtopic._id
      )
    ]);

    setContentReady(true);
    setLoading(false);
  } catch (error) {
    console.error("Error loading subtopic:", error);
    setLoading(false);
    setContentReady(true);
  }
}, [user, moduleId, topicCode, subtopicCode]);
 useEffect(() => {
    const timer = setTimeout(() => {
      loadSubtopic();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadSubtopic]);


  // // Load subtopic when params change
  // useEffect(() => {
  //   if (initialDataLoaded) {
  //     loadSubtopic();
  //   }
  // }, [initialDataLoaded, loadSubtopic]);

  


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

//   useEffect(() => {
//   setIsSubtopicCompleted(false);
//   setMarkAsCompleteBtnStatus(false);
// }, [topicCode, subtopicCode]);

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
    setShowSummary(false); // Add this line to close summary popup
    const moduleResponse = await getModuleById(moduleId);
    const userData = await getUserByClerkId(user.id);
    const userId = userData.data.user._id;
    const moduleCode = moduleResponse.data.module_code;

    // First verify the subtopic exists
    const currentTopic = moduleResponse.data.topicData.find(t => t.topic_code === topicCode);
    if (!currentTopic) {
      throw new Error(`Topic ${topicCode} not found`);
    }

    const currentSubtopic = currentTopic.subtopicData.find(s => s.subtopic_code === subtopicCode);
    if (!currentSubtopic) {
      throw new Error(`Subtopic ${subtopicCode} not found in topic ${topicCode}`);
    }

    // Mark subtopic as completed
    await completeSubTopic(
      userId,
      moduleCode,
      topicCode,
      subtopicCode
    );

    // Check if all subtopics in this topic are completed
    const subTopicCompletionData = await getSubtopicCompletionStatus(
      userId,
      moduleCode,
      topicCode
    );

    // setIsSubtopicCompleted(true);
    setMarkAsCompleteBtnStatus(true); // This will switch the button to "Next"

    if (subTopicCompletionData.allSubtopicCompleted) {
      // Mark topic as completed
      await completeTopic(
        userId,
        moduleCode,
        topicCode
      );

      // Check if all topics in module are completed
      const topicCompletionData = await getAllTopicsCompletionStatus(
        userId,
        moduleCode
      );

      if (topicCompletionData.allTopicsCompleted) {
        // Mark module as completed
        await completeModule(userId, moduleCode);
        
        // Check if feedback exists before showing popup
        const feedbackExists = await checkUserFeedBackExists({
          userId: userId,
          moduleId: moduleId
        });
        
        if (!feedbackExists.found) {
          setShowFeedbackModal(true);
          setReturnUrl('/user/learning');
          return;
        } else {
          navigate('/user/learning');
          return;
        }
      }
    }

    // Find next subtopic to navigate to
    const nextSubtopicInfo = await getNextSubtopic(moduleResponse.data, topicCode, subtopicCode);
    
    if (nextSubtopicInfo) {
      navigate(`/user/learning/${moduleId}/topic`, {
        state: {
          topicCode: nextSubtopicInfo.nextTopicCode,
          subtopicCode: nextSubtopicInfo.nextSubtopicCode,
          scrollToSubtopic: true
        }
      });
    } else {
      // No more subtopics - navigate to learning home
      navigate('/user/learning');
    }
  } catch (error) {
    console.error("Error marking as completed:", error);
    let errorMessage = "Error marking as completed. Please try again.";
    
    if (error.response?.status === 404) {
      errorMessage = "The subtopic was not found. It may have been removed or the link is incorrect.";
    }
    
    setFeedbackMessage(errorMessage);
    setShowFeedbackPopup(true);
  } finally {
    setLoading(false);
  }
};

// Helper function to find the next subtopic
const getNextSubtopic = async (moduleData, currentTopicCode, currentSubtopicCode) => {
  // Find current topic index
  const currentTopicIndex = moduleData.topicData.findIndex(t => t.topic_code === currentTopicCode);
  
  // Find current subtopic index within the topic
  const currentSubtopicIndex = moduleData.topicData[currentTopicIndex].subtopicData
    .findIndex(s => s.subtopic_code === currentSubtopicCode);

  // Check if there's a next subtopic in current topic
  if (currentSubtopicIndex < moduleData.topicData[currentTopicIndex].subtopicData.length - 1) {
    return {
      nextTopicCode: currentTopicCode,
      nextSubtopicCode: moduleData.topicData[currentTopicIndex].subtopicData[currentSubtopicIndex + 1].subtopic_code
    };
  }
  
  // Otherwise, find next topic with subtopics
  for (let i = currentTopicIndex + 1; i < moduleData.topicData.length; i++) {
    if (moduleData.topicData[i].subtopicData.length > 0) {
      return {
        nextTopicCode: moduleData.topicData[i].topic_code,
        nextSubtopicCode: moduleData.topicData[i].subtopicData[0].subtopic_code
      };
    }
  }

  // No more subtopics found
  return null;
};
const handleTryButton = () => {
  if (!moduleCODE || !topicCODE) {
    console.error("Module code or topic code is missing");
    setFeedbackMessage("Unable to navigate - missing module or topic information");
    setShowFeedbackPopup(true);
    return;
  }
  navigate(`/user/QusnsTryitYourself/${moduleCODE}/${topicCODE}`);
};

const handleNext = async () => {
  try {
    setLoading(true);
    setShowSummary(false); // Add this line to close summary popup
    const moduleResponse = await getModuleById(moduleId);
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
        subtopicCode: nextSubtopicCode,
        scrollToSubtopic: true
      }
    });
  } catch (error) {
    console.error("Error in handleNext:", error);
    setFeedbackMessage("Error navigating to next subtopic. Please try again.");
    setShowFeedbackPopup(true);
  } finally {
    setLoading(false);
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
    { markAsCompleteBtnStatus ? (
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
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Mark as completed'}
      </Button>
    )}
  </>
)}
      
      {showModal && (
        <ModalOverlay>
          <ModalContent>
<SkillAssessment
  moduleId={moduleId}
  moduleCode={moduleCODE}
  topicCode={topicCODE}
  subtopicCode={subtopicCode}
  onCloseModal={handleCloseModal}
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