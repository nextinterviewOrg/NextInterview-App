import React, { useState, useEffect } from "react";
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
import { useLocation, useParams, useNavigate } from "react-router-dom";
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
import {
  ShimmerTitle,
  ShimmerText,
  ShimmerButton,
} from "react-shimmer-effects";
import ConceptTooltip from "../../../../../components/ConceptTooltip/ConceptTooltip";
import { IoCloseSharp } from "react-icons/io5";
import UserFeedback from "../../../../../components/Feedback/UserFeedback/UserFeedback";
import { checkUserFeedBackExists } from "../../../../../api/moduleFeedbackApi";
import SummarizeIcon from "../../../../../assets/SampleInterviewIcon.svg";
import DOMPurify from 'dompurify';

// Sample Data for Dynamic Rendering

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

const UserModuleTopic = () => {
  const [feedback, setFeedback] = useState(""); // State to store feedback
  const [showFeedbackModal, setShowFeedbackModal] = useState(false); // State to control User Feedback modal visibility
  const [showSummary, setShowSummary] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false); // State for feedback popup
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Message to show in feedback popup
  const [isHelpful, setIsHelpful] = useState(null); // Track if feedback was helpful
  const [likeAnimation, setLikeAnimation] = useState(false); // Animation state for like icon
  const [dislikeAnimation, setDislikeAnimation] = useState(false); // Animation state for dislike icon
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false); // Track if feedback has been submitted
  const [selectedFeedback, setSelectedFeedback] = useState(null); // Track which feedback option was selected

  const [showDownloadButton, setShowDownloadButton] = useState(true); // State to control "Download Cheat Sheet" button visibility
  const moduleId = useParams().id;
  const location = useLocation();
  const [courseData, setCourseData] = useState(courseData1);
  const [topicData, setTopicData] = useState(null);
  const [gptSummaryText, setGptSummaryText] = useState([]);
  const [delayedText, setDelayedText] = useState([]);
  const [selectedCheetSheetURL, setSelectedCheetSheetURL] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [markAsCompleteBtnStatus, setMarkAsCompleteBtnStatus] = useState(false);
  const navigate = useNavigate();
  const [curIndex, setCurIndex] = useState(0);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [popupContent, setPopupContent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isModuleCompleted, setIsModuleCompleted] = useState(false);
  const [feedbackOrder, setFeedbackOrder] = useState(1);
  const [returnUrl, setReturnUrl] = useState(null);
  const [moduleCODE, setModuleCODE] = useState(null)
  const [topicCODE, setTopicCODE] = useState(null)
  const [contentReady, setContentReady] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setDelayedText((prevText) => [...prevText, nextWord]);
    }, 35 * index);
  };
  const delayText = () => {
    for (let i = 0; i < gptSummaryText.length; i++) {
      delayPara(i, gptSummaryText[i]);
    }
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    let finalTopicIndex = location.state?.topicIndex;
    let finalSubTopicIndex = location.state?.subtopicIndex;
    const userData = await getUserByClerkId(user.id);
    const moduleResponse = await getModuleById(moduleId);
    const module_code = moduleResponse.data.module_code;
    const topic_code = moduleResponse.data.topicData[location.state?.topicIndex].topic_code;
    const subtopic_code = moduleResponse.data.topicData[location.state?.topicIndex].subtopicData[location.state?.subtopicIndex].subtopic_code;
    const markingSubTopicCompleted = await completeSubTopic(userData.data.user._id, module_code, topic_code, subtopic_code);
    finalSubTopicIndex = finalSubTopicIndex + 1;

    const subTopicCompletionData = await getSubtopicCompletionStatus(userData.data.user._id, module_code, topic_code, subtopic_code);

    if (subTopicCompletionData.allSubtopicCompleted == true) {
      const markingTopicCompleted = await completeTopic(userData.data.user._id, module_code, topic_code);
      finalTopicIndex = finalTopicIndex + 1;
      finalSubTopicIndex = 0;
      const topicCompletionData = await getAllTopicsCompletionStatus(userData.data.user._id, module_code,);
      const userModuleProgressStats = await getUserProgressStats(userData.data.user._id);
      await Promise.all(userModuleProgressStats.ModuleProgress.map(async (item) => {
        if (item.moduleCode === moduleResponse.data.module_code) {

          if (Number.parseFloat(item.topicStats.completed / (moduleResponse.data.topicData.length) * 100).toFixed(0) > 50) {
            const statusData = await checkUserFeedBackExists({
              userId: userData.data.user._id,
              feedback_order: 1,
              moduleId: moduleResponse.data._id,
            })
            console.log("🚀 Feedback statusData (order 2):", statusData);
            if (statusData.found === false) {

              /// logic for feedback
              setShowFeedbackModal(true);
              setFeedbackOrder(1);

            }

          };
        }
      }));
      if (topicCompletionData.allTopicsCompleted == true) {
        const markingModuleCompleted = await completeModule(userData.data.user._id, module_code);
        //logic for feedback
        const userModuleProgressStats = await getUserProgressStats(userData.data.user._id);
        await Promise.all(userModuleProgressStats.ModuleProgress.map(async (item) => {
          if (item.moduleCode === moduleResponse.data.module_code) {
            // setTotalCompletedTopics(item.topicStats.completed);
            console.log("item.topicStats.completed / (moduleResponse.data.topicData.length) * 100", item.topicStats.completed / (moduleResponse.data.topicData.length) * 100);
           const feedback1 = await checkUserFeedBackExists({
  userId: userData.data.user._id,
  feedback_order: 1,
  moduleId: moduleResponse.data._id,
});

const feedback2 = await checkUserFeedBackExists({
  userId: userData.data.user._id,
  feedback_order: 2,
  moduleId: moduleResponse.data._id,
});

console.log("Feedback order 1:", feedback1);
console.log("Feedback order 2:", feedback2);

// ✅ Only show feedback if BOTH are missing
if (!feedback1.found && !feedback2.found) {
  setShowFeedbackModal(true);
  setFeedbackOrder(2);
  setReturnUrl(`/user/learning/`);
}

            }
          }
        ));
        // navigate(`/user/learning`);
        return
      }
    }

    //checking is this last topic
    const lastTopic = await getLastTopicByModuleCode({ moduleCode: module_code });
    const lastSubTopic = await getLastSubTopicByTopicCode({ moduleCode: module_code, topicCode: topic_code });

    // if (lastSubTopic.data.subtopic_code === subtopic_code) {
    //   console.log("lastSubTopic.data.subtopic_code === subtopic_code", lastSubTopic.data.subtopic_code, subtopic_code);
    //   const markingTopicCompleted = await completeTopic(userData.data.user._id, module_code, topic_code);
    //   finalTopicIndex = finalTopicIndex + 1;
    //   finalSubTopicIndex = 0;
    //   // const userModuleProgressStats = await getUserProgressStats(userData.data.user._id);
    //   // await Promise.all(userModuleProgressStats.ModuleProgress.map(async (item) => {
    //   //   if (item.moduleCode === moduleResponse.data.module_code) {
    //   //     // setTotalCompletedTopics(item.topicStats.completed);
    //   //     if ((Number.parseFloat(item.topicStats.completed / (moduleResponse.data.topicData.length) * 100).toFixed(0)) > 50) {
    //   //       const statusData = await checkUserFeedBackExists({
    //   //         userId: userData.data.user._id,
    //   //         feedback_order: 1,
    //   //         moduleId: moduleResponse.data._id,
    //   //       })
    //   //       console.log("statusData", statusData);
    //   //       if (statusData?.found === false) {

    //   //         /// logic for feedback
    //   //         setShowFeedbackModal(true);
    //   //         setFeedbackOrder(1);

    //   //       }

    //   //     }
    //   //   }
    //   // }));
    //   if (lastTopic.data.topic_code === topic_code) {
    //     const markingModuleCompleted = await completeModule(userData.data.user._id, module_code);
    //     const userModuleProgressStats = await getUserProgressStats(userData.data.user._id);
    //     //logic for feedback
    //     await Promise.all(userModuleProgressStats.ModuleProgress.map(async (item) => {
    //       if (item.moduleCode === moduleResponse.data.module_code) {
    //         // setTotalCompletedTopics(item.topicStats.completed);
    //         console.log("item.topicStats.completed / (moduleResponse.data.topicData.length) * 100", item.topicStats.completed / (moduleResponse.data.topicData.length) * 100);
    //         if ((Number.parseFloat(item.topicStats.completed / (moduleResponse.data.topicData.length) * 100).toFixed(0)) > 50) {
    //           const statusData = await checkUserFeedBackExists({
    //             userId: userData.data.user._id,
    //             feedback_order: 2,
    //             moduleId: moduleResponse.data._id,
    //           })
    //           console.log("statusData", statusData);
    //           if (statusData.found === false) {

    //             /// logic for feedback
    //             setShowFeedbackModal(true);
    //             setFeedbackOrder(2);
    //             setReturnUrl(`/user/learning/`);
    //           }

    //         }
    //       }
    //     }));
    //     // navigate(`/user/learning`);
    //     return
    //   }
    //   navigate(`/user/learning/${moduleId}/topic`, { state: { topicIndex: finalTopicIndex, subtopicIndex: finalSubTopicIndex } });
    //   return
    // }
    // if (lastTopic.data.topic_code === topic_code && lastSubTopic.data.subtopic_code === subtopic_code) {
    //   const markingModuleCompleted = await completeModule(userData.data.user._id, module_code);
    //   const userModuleProgressStats = await getUserProgressStats(userData.data.user._id);
    //   //logic for feedback
    //   await Promise.all(userModuleProgressStats.ModuleProgress.map(async (item) => {
    //     if (item.moduleCode === moduleResponse.data.module_code) {
    //       // setTotalCompletedTopics(item.topicStats.completed);
    //       console.log("item.topicStats.completed / (moduleResponse.data.topicData.length) * 100", item.topicStats.completed / (moduleResponse.data.topicData.length) * 100);
    //       if ((Number.parseFloat(item.topicStats.completed / (moduleResponse.data.topicData.length) * 100).toFixed(0)) > 50) {
    //         const statusData = await checkUserFeedBackExists({
    //           userId: userData.data.user._id,
    //           feedback_order: 2,
    //           moduleId: moduleResponse.data._id,
    //         })
    //         console.log("statusData", statusData);
    //         if (statusData.found === false) {

    //           /// logic for feedback
    //           setShowFeedbackModal(true);
    //           setFeedbackOrder(2);
    //           setReturnUrl(`/user/learning/`);
    //         }

    //       }
    //     }
    //   }));

    //   // navigate(`/user/learning`);
    //   return
    // }
    navigate(`/user/learning/${moduleId}/topic`, { state: { topicIndex: finalTopicIndex, subtopicIndex: finalSubTopicIndex } });
  };
  useEffect(() => {
    const apiCaller = async () => {
      try {
        setLoading(true);
        const response = await getModuleById(moduleId);
        console.log("Module data received in UserModuleTopic:", response.data);
        setModuleName(response.data.moduleName);
        setModuleCODE(response.data.module_code);

        const data = {
          title: response.data.moduleName,
          topicsList: await Promise.all(
            response.data.topicData.map(async (item, topicIndex) => {
              console.log("Processing topic:", item.topicName, "with code:", item.topic_code);

              return {
                title: item.topicName,
                topic_code: item.topic_code || "", // Preserve topic_code
                subtopics: await Promise.all(
                  item.subtopicData.map(async (subitem, subIndex) => {
                    console.log("Processing subtopic:", subitem.subtopicName, "with code:", subitem.subtopic_code);
                    // const gptSumm = await summariseTopic({
                    //   message: subitem.subtopicContent,
                    // });
                    return {
                      title: subitem.subtopicName,
                      subtopic_code: subitem.subtopic_code || "", // Preserve subtopic_code
                      completed: subitem.completed,
                      subtopicContent: subitem.subtopicContent,
                      subtopicSummary: subitem.subtopicSummary,
                      // gptSummary: gptSumm.data,
                      cheatSheetURL: subitem.cheatSheetURL || "#",
                      conceptClarifiers: subitem.conceptClarifier || [],
                    };
                  })
                ),
              };
            })
          ),
        };
        console.log("Final course data structure in UserModuleTopic:", data);
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
        console.log("Works");
      } else {
        console.error("Explanation is undefined!");
      }
    };

    apiCaller();
  }, []);

  useEffect(() => {
    setDelayedText([]);
    setShowSummary(false);
    if (!location.state) return; // Ensure location.state is defined

    // Reset feedback state when subtopic changes
    setFeedbackSubmitted(false);
    setSelectedFeedback(null);
    setLikeAnimation(false);
    setDislikeAnimation(false);
    setShowFeedbackPopup(false);

    const apiCaller = async () => {
      try {
        // Make sure you're calling the API correctly and checking the response
        const userData = await getUserByClerkId(user.id);
        const response = await getModuleById(moduleId);
        console.log("Module data in location state effect:", response.data);

        if (!response.data || !response.data.topicData || response.data.topicData.length === 0) {
          console.error("No topic data found in module response");
          return;
        }

        let currentMooduleCode = response.data.module_code;
        let currentModuleId = response.data._id;
        let currentTopicCode = null;
        let currentTopicId = null;
        let currentSubtopicCode = null;
        let currentSubtopicId = null;

        // Ensure the response is valid before setting the state
        const data = {
          title: response.data.moduleName,
          topicsList: await Promise.all(
            response.data.topicData.map(async (item, topicIndex) => {
              if (topicIndex === location.state.topicIndex) {
                currentTopicCode = item.topic_code;
                setTopicCODE(item.topic_code);
                currentTopicId = item._id;
                currentSubtopicCode = null;
              }
              return {
                title: item.topicName,
                topic_code: item.topic_code || "",
                subtopics: await Promise.all(
                  item.subtopicData.map(async (subitem, subIndex) => {
                    if (topicIndex === location.state.topicIndex && subIndex === location.state.subtopicIndex) {
                      currentSubtopicCode = subitem.subtopic_code;
                      currentSubtopicId = subitem._id;
                    }
                    const gptSumm = await summariseTopic({
                      message: subitem.subtopicContent,
                    });
                    return {
                      title: subitem.subtopicName,
                      subtopic_code: subitem.subtopic_code || "",
                      completed: subitem.completed,
                      subtopicContent: subitem.subtopicContent,
                      subtopicSummary: subitem.subtopicSummary,
                      gptSummary: gptSumm.data,
                      cheatSheetURL: subitem.cheatSheetURL || "#",
                      conceptClarifiers: subitem.conceptClarifier || [],
                    };
                  })
                ),
              };
            })
          ),
        };

        // Now, after setting courseData, use location.state to update topicData
        const topic =
          data.topicsList?.[location.state.topicIndex]?.subtopics?.[
          location.state.subtopicIndex
          ];
        if (topic) {
          setSelectedCheetSheetURL(topic.cheatSheetURL || "#");
          setTopicData([
            {
              title: topic.title,
              description: topic.subtopicContent,
              summary: topic.subtopicSummary,
              gptSummary: topic.gptSummary,
              cheatSheetURL: topic.cheatSheetURL || "#",
            },
          ]);
          setSelectedCheetSheetURL(topic.cheatSheetURL || "#");
          setGptSummaryText(topic.subtopicSummary);

          const userData = await getUserByClerkId(user.id);
          console.log("userData", userData, " ", userData.data.user._id);
          if (currentTopicCode && currentTopicId && currentMooduleCode && currentModuleId) {
            const markingTopicOngoing = await startTopic(
              userData.data.user._id,
              currentTopicCode,
              currentTopicId,
              currentMooduleCode,
              currentModuleId
            );
            console.log("markingTopicOngoing", markingTopicOngoing);
            const markingSubTopicOngoing = await startSubTopic(
              userData.data.user._id,
              currentMooduleCode,
              currentTopicCode,
              currentTopicId,
              currentModuleId,
              currentSubtopicCode,
              currentSubtopicId,
            );
            console.log("markingSubTopicOngoing", markingSubTopicOngoing, "currentSubtopicCode", currentSubtopicCode);
          }


          if (currentMooduleCode && currentTopicCode && currentSubtopicCode) {
            const moduleStatus = await getUserProgressBySubTopic({
              userId: userData.data.user._id,
              moduleCode: currentMooduleCode,
              topicCode: currentTopicCode,
              subtopicCode: currentSubtopicCode,
            });
            console.log("moduleStatus", moduleStatus);
            if (moduleStatus.data.status !== "ongoing") {
              console.log("moduleStatus status", moduleStatus.data.status);
              setMarkAsCompleteBtnStatus(true);
            } else {
              setMarkAsCompleteBtnStatus(false);
            }
          }
          setContentReady(true);
        }

        const moduleResponse = await getModuleById(moduleId);
        const userModuleProgressStats = await getUserProgressStats(userData.data.user._id);
        await Promise.all(userModuleProgressStats.ModuleProgress.map(async (item) => {
          if (item.moduleCode === moduleResponse.data.module_code) {
            // setTotalCompletedTopics(item.topicStats.completed);
            console.log("item.topicStats.completed / (moduleResponse.data.topicData.length) * 100", (Number.parseFloat((item.topicStats.completed / (moduleResponse.data.topicData.length) * 100).toFixed(0)) >= 50) && (Number.parseFloat((item.topicStats.completed / (moduleResponse.data.topicData.length) * 100).toFixed(0)) <= 50));
            if ((Number.parseFloat((item.topicStats.completed / (moduleResponse.data.topicData.length) * 100).toFixed(0)) >= 50) && (Number.parseFloat((item.topicStats.completed / (moduleResponse.data.topicData.length) * 100).toFixed(0)) <= 50)) {
              const statusData = await checkUserFeedBackExists({
                userId: userData.data.user._id,
                feedback_order: 1,
                moduleId: moduleResponse.data._id,
              })
console.log("🚀 Feedback statusData (order 1):", statusData);
              if (statusData?.found === false) {

                /// logic for feedback
                setShowFeedbackModal(true);
                setFeedbackOrder(1);

              }

            }
          }
        }));
      } catch (error) {
        console.error("Error in UserModuleTopic location state effect:", error);
      }
    };

    apiCaller();
  }, [location.state]); // Add location.state as a dependency to ensure it runs when state changes

  const renderConceptClarifiers = (text, clarifiers) => {
    if (!text || !clarifiers || !Array.isArray(clarifiers)) return text;

    let result = text;
    clarifiers.forEach(({ conceptClarifier, hoverExplanation, popupExplanation }) => {
      if (!conceptClarifier) return;

      const escapedConcept = conceptClarifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const escapedHover = hoverExplanation.replace(/"/g, '"').replace(/'/g, '&#39;');
      const escapedPopup = popupExplanation
        .replace(/&/g, '&amp;')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'");

      result = result.replace(
        new RegExp(`\\b${escapedConcept}\\b`, "g"),
        `<span class="concept-tooltip" 
          title="${escapedHover}" 
          onClick="window.showPopupHandler('${escapedPopup}')">
          ${conceptClarifier}
        </span>`
      );
    });
    return result;
  };


  const handleSummarizeClick = async () => {
    setLoadingSummary(true);         // Start spinner
    setShowSummary(true);            // Show the summary section
    setShowDownloadButton(false);    // Hide the cheat sheet button

    // Clear previous text if any
    setDelayedText([]);

    // Simulate a short delay before the typing starts (like AI "thinking")
    setTimeout(() => {
      delayText();                   // Animate the summary display
      setLoadingSummary(false);      // Stop spinner after delay
    }, 1000); // Adjust delay if needed
  };


  const [assessmentParams, setAssessmentParams] = useState({});

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      console.log("Feedback submitted:", feedbackData);
      // TODO: Implement API call to save feedback
      // navigate(`/user/learning`);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleSummaryFeedback = (isHelpful) => {
    try {
      console.log(`Summary feedback: ${isHelpful ? 'Helpful' : 'Not helpful'}`);
      // Here you could implement an API call to save the summary feedback
      // For example:
      // saveSummaryFeedback({
      //   moduleId,
      //   topicIndex: location.state?.topicIndex,
      //   subtopicIndex: location.state?.subtopicIndex,
      //   isHelpful
      // });

      // Set animation state
      if (isHelpful) {
        setLikeAnimation(true);
        setTimeout(() => setLikeAnimation(false), 1000);
      } else {
        setDislikeAnimation(true);
        setTimeout(() => setDislikeAnimation(false), 1000);
      }

      // Save the selected feedback state
      setSelectedFeedback(isHelpful);
      setFeedbackSubmitted(true);

      // Show feedback popup
      setIsHelpful(isHelpful);
      setFeedbackMessage(`Thank you for your feedback! The summary was ${isHelpful ? 'helpful' : 'not helpful'}.`);
      setShowFeedbackPopup(true);

      // Auto-hide popup after 3 seconds
      setTimeout(() => {
        setShowFeedbackPopup(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting summary feedback:", error);
    }
  };

  const handleMarkAsCompleted = async () => {
    const allSubtopicsCompleted = courseData.topicsList[location.state.topicIndex].subtopics.every(subtopic => subtopic.completed);
    if (allSubtopicsCompleted) {
      setIsModuleCompleted(true); // Show feedback only after the last subtopic
      // setShowFeedbackModal(true); // Show feedback modal directly
    } else {
      console.log("Not all subtopics are completed.");
    }

    try {
      console.log("Fetching module_code...");

      const moduleResponse = await getModuleById(moduleId);
      console.log("🛠 moduleResponse Full Data:", moduleResponse);

      if (
        !moduleResponse ||
        !moduleResponse.data ||
        !moduleResponse.data.module_code
      ) {
        console.error(" Module data missing!", moduleResponse);
        return;
      }
      const module_code = moduleResponse.data.module_code;
      console.log("module_code fetched:", module_code);

      if (
        !moduleResponse.data.topicData ||
        moduleResponse.data.topicData.length === 0
      ) {
        console.error("No topics found for module_code:", module_code);
        return;
      }
      console.log(" Available Topics:", moduleResponse.data.topicData);

      const topicIndex = location.state?.topicIndex ?? 0;
      const topicData = moduleResponse.data.topicData[topicIndex];

      if (!topicData || !topicData.topic_code) {
        console.error(
          " topic_code not found. Available Topics:",
          moduleResponse.data.topicData
        );
        return;
      }
      const topic_code = topicData.topic_code;
      console.log("topic_code fetched:", topic_code);

      // 3️⃣ Ensure subtopicData exists
      if (!topicData.subtopicData || topicData.subtopicData.length === 0) {
        console.error(" No subtopics found for topic_code:", topic_code);
        return;
      }

      console.log(" Available Subtopics:", topicData.subtopicData);

      const subtopicIndex = location.state?.subtopicIndex ?? 0;
      const subtopicData = topicData.subtopicData[subtopicIndex];

      if (!subtopicData || !subtopicData.subtopic_code) {
        console.error(
          " subtopic_code not found. Available Subtopics:",
          topicData.subtopicData
        );
        return;
      }
      const subtopic_code = subtopicData.subtopic_code;
      console.log("subtopic_code fetched:", subtopic_code);

      const params = {
        module_code,
        topic_code,
        subtopic_code,
        question_type: subtopicData.question_type,
        level: subtopicData.level,
      };

      console.log("Final Skill Assessment Params:", params);
      setAssessmentParams(params);
      setShowModal(true);
    } catch (error) {
      console.error(" Error in fetching data:", error);
    }
  };

  const handleTryButton = () => {
    navigate(`/user/QusnsTryitYourself/${moduleCODE}/${topicCODE}`);
    // navigate(`/user/learning/${moduleName}/topic/tryityourself`);
  };

  const handleNext = async () => {
    try {
      const moduleResponse = await getModuleById(moduleId);
      console.log("Module data in handleNext:", moduleResponse.data);

      if (!moduleResponse.data || !moduleResponse.data.topicData || moduleResponse.data.topicData.length === 0) {
        console.error("No topic data found in module response");
        return;
      }

      const module_code = moduleResponse.data.module_code;
      const topic_code = moduleResponse.data.topicData[location.state?.topicIndex]?.topic_code;
      const subtopic_code = moduleResponse.data.topicData[location.state?.topicIndex]?.subtopicData[location.state?.subtopicIndex]?.subtopic_code;

      console.log("Navigation data:", {
        module_code,
        topic_code,
        subtopic_code,
        topicIndex: location.state?.topicIndex,
        subtopicIndex: location.state?.subtopicIndex
      });

      const lastTopic = await getLastTopicByModuleCode({
        moduleCode: module_code,
      });
      const lastSubTopic = await getLastSubTopicByTopicCode({
        moduleCode: module_code,
        topicCode: topic_code,
      });

      let finalTopicIndex = location.state?.topicIndex;
      let finalSubTopicIndex = location.state?.subtopicIndex;

      // Check if we're at the last subtopic of the current topic
      if (lastSubTopic.data.subtopic_code === subtopic_code) {
        // Move to the next topic
        finalTopicIndex = finalTopicIndex + 1;
        finalSubTopicIndex = 0;
      } else {
        // Move to the next subtopic in the current topic
        finalSubTopicIndex = finalSubTopicIndex + 1;
      }

      // Check if we're at the last topic and subtopic
      if (lastTopic.data.topic_code === topic_code && lastSubTopic.data.subtopic_code === subtopic_code) {
        console.log("Navigating to /user/learning as last topic is reached");
        navigate(`/user/learning`);
        return;
      }

      // Navigate to the next topic/subtopic
      navigate(`/user/learning/${moduleId}/topic`, {
        state: { topicIndex: finalTopicIndex, subtopicIndex: finalSubTopicIndex },
      });
    } catch (error) {
      console.error("Error in handleNext:", error);
    }
  };

  return (
    <Container>
      {!contentReady ? (
        // Only show loading spinner for content, not for buttons
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Spinner />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <TryItYourself>
              <TryButton onClick={handleTryButton}>Try it yourself</TryButton>
            </TryItYourself >
            {/* <TryItYourself >
              <TryButton onClick={() => {
                navigate(`/user/titcodinglist`, { state: { moduleCode: moduleCODE, topicCode: topicCODE, topicIndex: location.state?.topicIndex, subtopicIndex: location.state?.subtopicIndex, returnUrl: `/user/learning/${moduleId}/topic` } })
              }}>Try Coding Questions</TryButton>
            </TryItYourself> */}
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
                          courseData?.topicsList?.[location.state?.topicIndex]
                            ?.subtopics?.[location.state?.subtopicIndex]
                            ?.conceptClarifiers || []
                        ),
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          {!contentReady && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Spinner />
              <p>Loading tools...</p>
            </div>
          )}

          {contentReady && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                // alignContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", }}>
                {showDownloadButton && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <a
                      style={{
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        color: "#2390ac",
                        textDecoration: "none",
                      }}
                      target="_blank"
                      download={"cheatSheet.pdf"}
                      href={selectedCheetSheetURL}
                    >
                      Download Cheat Sheet (pdf)
                    </a>
                  </div>
                )}

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
                  <a
                    style={{
                      backgroundColor: "transparent",
                      color: "#2390ac",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                    href={selectedCheetSheetURL}
                    target="_blank"
                    download={"cheatSheet.pdf"}
                  >
                    Download Cheat Sheet (pdf)
                  </a>
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
          {markAsCompleteBtnStatus && !isModuleCompleted ? (
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
              currentTopicIndex={location.state.topicIndex}
              currentSubTopicIndex={location.state.subtopicIndex}
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

      {/* Feedback Popup */}
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
