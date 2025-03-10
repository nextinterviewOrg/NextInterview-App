import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
  // CloseButton,
  TryItYourself,
  TryButton,
} from "./UserModuleTopic.style";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { getLastSubTopicByTopicCode, getLastTopicByModuleCode, getModuleById } from "../../../../../api/addNewModuleApi";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { summariseTopic } from "../../../../../api/gptApi";
import SkillAssessment from "../SkillAssessment/SkillAssessment";
import { completeModule, completeSubTopic, completeTopic, getUserProgressBySubTopic, startSubTopic, startTopic } from "../../../../../api/userProgressApi";
import { getUserByClerkId } from "../../../../../api/userApi";
import { useUser } from "@clerk/clerk-react";

// Sample Data for Dynamic Rendering
const topics = [
  {
    title: "",
    description: "",
  },
  {
    title: "",
    description: "",
  },
  {
    title: "",
    description: "",
  },
];

const summaryText = ["", "", ""];
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
  const [showSummary, setShowSummary] = useState(false);
  const [showMarkAsRead, setShowMarkAsRead] = useState(false);
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
  const { isLoaded, user, isSignedIn } = useUser();
  // const [selectedCheatSheetURL, setSelectedCheatSheetURL] = useState("");

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
    //checking is this last topic
    const lastTopic = await getLastTopicByModuleCode({ moduleCode: module_code });
    const lastSubTopic = await getLastSubTopicByTopicCode({ moduleCode: module_code, topicCode: topic_code });
    
    if (lastSubTopic.data.subtopic_code === subtopic_code) {
      console.log("lastSubTopic.data.subtopic_code === subtopic_code", lastSubTopic.data.subtopic_code , subtopic_code);
      const markingTopicCompleted = await completeTopic(userData.data.user._id, module_code, topic_code);
      finalTopicIndex = finalTopicIndex + 1;
      finalSubTopicIndex = 0;
    }
    if (lastTopic.data.topic_code === topic_code && lastSubTopic.data.subtopic_code === subtopic_code) {
      const markingModuleCompleted = await completeModule(userData.data.user._id, module_code);
      navigate(`/user/learning`);
      return
    }
    navigate(`/user/learning/${moduleId}/topic`, { state: { topicIndex: finalTopicIndex, subtopicIndex: finalSubTopicIndex } });
  };
  useEffect(() => {
    const apiCaller = async () => {
      try {
        const response = await getModuleById(moduleId);
        setModuleName(response.data.moduleName);
        const data = {
          title: response.data.moduleName,
          topicsList: await Promise.all(
            response.data.topicData.map(async (item) => {
              return {
                title: item.topicName,
                subtopics: await Promise.all(
                  item.subtopicData.map(async (subitem) => {
                    const gptSumm = await summariseTopic({
                      message: subitem.subtopicContent,
                    });
                    return {
                      title: subitem.subtopicName,
                      completed: subitem.completed,
                      subtopicContent: subitem.subtopicContent,
                      subtopicSummary: subitem.subtopicSummary,
                      gptSummary: gptSumm.data,
                      cheatSheetURL: subitem.cheatSheetURL || "#",
                    };
                  })
                ),
              };
            })
          ),
        };
        setCourseData(data);
      } catch (error) {
        console.log(error);
      }
    };
    apiCaller();
  }, []);

  useEffect(() => {
    setDelayedText([]);
    setShowSummary(false);
    if (!location.state) return; // Ensure location.state is defined

    const apiCaller = async () => {
      // try {
        // Make sure you're calling the API correctly and checking the response
        const response = await getModuleById(moduleId);
        console.log("", response.data);
        let currentMooduleCode = response.data.module_code;
        let currentModuleId = response.data.module_id;
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
                currentTopicId = item._id;
                currentSubtopicCode = null;
              }
              return {
                title: item.topicName,
                subtopics: await Promise.all(
                  item.subtopicData.map(async (subitem, subIndex) => {
                    if (subIndex === location.state.subtopicIndex) {
                      currentSubtopicCode = subitem.subtopic_code;
                      currentSubtopicId = subitem._id;
                    }
                    const gptSumm = await summariseTopic({
                      message: subitem.subtopicContent,
                    });
                    return {
                      title: subitem.subtopicName,
                      // completed: subitem.completed,
                      subtopicContent: subitem.subtopicContent,
                      subtopicSummary: subitem.subtopicSummary,
                      gptSummary: gptSumm.data,
                      cheatSheetURL: subitem.cheatSheetURL || "#",
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
          setGptSummaryText(topic.gptSummary);
          const userData = await getUserByClerkId(user.id);
          console.log("userData", userData, " ", userData.data.user._id);
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

          const moduleStatus = await getUserProgressBySubTopic({ userId: userData.data.user._id, moduleCode: currentMooduleCode, topicCode: currentTopicCode, subtopicCode: currentSubtopicCode });
          console.log("moduleStatus", moduleStatus);
          if (moduleStatus.data.status !== "ongoing") {
            console.log("moduleStatus status", moduleStatus.data.status);
            setMarkAsCompleteBtnStatus(true);
          } else {
            setMarkAsCompleteBtnStatus(false);
          }
        }
      // } catch (error) {
      //   console.error("Error fetching module data", error);
      // }
    };

    apiCaller();
  }, [location.state]); // Add location.state as a dependency to ensure it runs when state changes

  const handleSummarizeClick = () => {
    setShowSummary(true); // Show summary section
    delayText();
    setShowMarkAsRead(true); // Show "Mark as Read" button after summary section
    setShowDownloadButton(false); // Hide the "Download Cheat Sheet" button after clicking "Summarize for me"
  };

  const [assessmentParams, setAssessmentParams] = useState({});
  const handleMarkAsCompleted = async () => {
    try {
      console.log("Fetching module_code...");

      const moduleResponse = await getModuleById(moduleId);
      console.log("🛠 moduleResponse Full Data:", moduleResponse);

      if (!moduleResponse || !moduleResponse.data || !moduleResponse.data.module_code) {
        console.error(" Module data missing!", moduleResponse);
        return;
      }
      const module_code = moduleResponse.data.module_code;
      console.log("module_code fetched:", module_code);


      if (!moduleResponse.data.topicData || moduleResponse.data.topicData.length === 0) {
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

    navigate(`/user/learning/${moduleName}/topic/tryityourself`);
  };

  const handleNext = async () => {
    const moduleResponse = await getModuleById(moduleId);
    console.log("topicIndex:", location.state?.topicIndex, "subtopicIndex:", location.state?.subtopicIndex);
    console.log("🛠 moduleResponse Full Data:", moduleResponse);
    const module_code = moduleResponse.data.module_code;

    console.log(moduleResponse.data.topicData[location.state?.topicIndex].topic_code);
    const topic_code = moduleResponse.data.topicData[location.state?.topicIndex].topic_code;

    const subtopic_code = moduleResponse.data.topicData[location.state?.topicIndex].subtopicData[location.state?.subtopicIndex].subtopic_code;
    console.log("module_code:", module_code, "topic_code:", topic_code, "subtopic_code:", subtopic_code);
    const lastTopic = await getLastTopicByModuleCode({ moduleCode: module_code });
    const lastSubTopic = await getLastSubTopicByTopicCode({ moduleCode: module_code, topicCode: topic_code });
    let finalTopicIndex = location.state?.topicIndex;
    let finalSubTopicIndex = location.state?.subtopicIndex;
    finalSubTopicIndex = finalSubTopicIndex + 1;
    if ((lastTopic.data.topic_code === topic_code) && (lastSubTopic.data.subtopic_code === subtopic_code)) {
      console.log("Navigating to /user as last topic is reached");
      navigate(`/user/learning`);
      return
    }
    if (lastSubTopic.data.subtopic_code === subtopic_code) {
      finalTopicIndex = finalTopicIndex + 1;
      finalSubTopicIndex = 0;

    }
    navigate(`/user/learning/${moduleId}/topic`, { state: { topicIndex: finalTopicIndex, subtopicIndex: finalSubTopicIndex } });

  };


  return (
    <Container>
      {/* Render topics and buttons */}
      <TryItYourself>
        <TryButton onClick={handleTryButton}>Try it yourself</TryButton>
      </TryItYourself>
      <div>
        {topicData && (
          <>
            {topicData?.map((topic, index) => (
              <div key={index}>
                <Title>{topic.title}</Title>

                <Text
                  dangerouslySetInnerHTML={{
                    __html: parseJSONContent(topic.description),
                  }}
                ></Text>
              </div>
            ))}
          </>
        )}

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div>
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

            {/* Show "Summarize for me" button only if summary isn't visible */}
            {!showSummary && (
              <Button
                style={{
                  border: "2px solid #2390ac",
                  fontWeight: "bold",
                  color: "#2390ac",
                  backgroundColor: "transparent",
                }}
                onClick={handleSummarizeClick}
              >
                Summarize for me
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Conditionally render the summary section only after clicking the button */}
      {showSummary && (
        <SummaryContainer>
          <SummaryTitle>Summary</SummaryTitle>

          <SummaryText>{delayedText}</SummaryText>

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
              <p>
                {" "}
                <SlLike
                  style={{
                    paddingRight: "5px",
                  }}
                />
                Helpfull
              </p>
              <p>
                <SlDislike
                  style={{
                    paddingRight: "5px",
                    paddingTop: "5px",
                  }}
                />
                Not helpful
              </p>
            </div>
          </ButtonGroup>
        </SummaryContainer>
      )}

      {/* Show the "Mark as Read" button only after summary is displayed */}
      {/* {showMarkAsRead && ( */}
      {markAsCompleteBtnStatus ? (
        <>
          <Button
            style={{
              backgroundColor: "#2390ac",
              color: "white",
              fontWeight: "bold",
              // marginTop: "20px"
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
            // onClick={handleMarkAsCompleted}
            onClick={handleNext}
          >
            Next
          </Button>
        </>
      ) :
        <Button
          style={{
            backgroundColor: "#2390ac",
            color: "white",
            fontWeight: "bold",
            // marginTop: "20px"
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
          onClick={handleMarkAsCompleted}
        >
          Mark as completed
        </Button>}
      {/* )} */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <SkillAssessment {...assessmentParams} onCloseModal={handleCloseModal} currentTopicIndex={location.state.topicIndex} currentSubTopicIndex={location.state.subtopicIndex} moduleId={moduleId} />
            {/* <CloseButton onClick={handleCloseModal}>X</CloseButton> */}
          </ModalContent>

        </ModalOverlay>
      )}
    </Container>
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
export default UserModuleTopic;
