import React, { useEffect, useState } from "react";
import { UserLearningModuleWrapper } from "./UserLearnigModule.styles"; // Import styled component
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { VscBook } from "react-icons/vsc";
import { LuClock4 } from "react-icons/lu";
import { TbClockEdit } from "react-icons/tb";
import { RiGeminiLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineExpandLess } from "react-icons/md";
import { MdOutlineExpandMore } from "react-icons/md";
import { FaCircleChevronRight } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { getModuleById } from "../../../../../api/addNewModuleApi";
import { Link } from "react-router-dom";
import { getUserProgress, startModule } from "../../../../../api/userProgressApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../../api/userApi";
import { ShimmerPostItem, ShimmerText, ShimmerTitle } from "react-shimmer-effects";

const UserLearningModule = () => {
  const [expandedTopic, setExpandedTopic] = useState(null);
  const moduleId = useParams().id;
  const [courseData, setCourseData] = useState({});
  const [moduleStatus, setModuleStatus] = useState(false);
  const { isLoaded, user, sessionId } = useUser();
  const [startModuleData, setStartModuleData] = useState({});
  const [buttonText, setButtonText] = useState("Resume Learning");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const apiCaller = async () => {
      try {
        setLoading(true);
        console.log("ModuleId", moduleId);
        const userData = await getUserByClerkId(user.id);
        const response = await getModuleById(moduleId);
        console.log(response);
        setStartModuleData({
          userId: userData.data.user._id,
          moduleCode: response.data.module_code,
          moduleID: response.data._id,
        });
        const data = {
          title: response.data.moduleName,
          topics: response.data.topicData.length,
          duration: response.data.approxTimeTaken,
          lastUpdated: new Date(response.data.updatedAt).toLocaleDateString(),
          description: response.data.description,
          learningGoals: response.data.userLearntData?.map(
            (item) => item.learntData
          ),

          topicsList: response.data.topicData?.map((item) => {
            return {
              title: item.topicName,
              subtopics: item.subtopicData.map(
                (subitem) => subitem.subtopicName
              ),
            };
          }),
          imageUrl: response.data?.imageURL, // Course Image URL
        };
        setCourseData(data);
        const moduleStatusData = await getUserProgress(userData.data.user._id);
        console.log("moduleStatusData", moduleStatusData);
        if (moduleStatusData.success === false) {
          setModuleStatus(false);
        } else {
          setModuleStatus(true);
          const moduleProgressData = moduleStatusData.data.progress.find(
            (item) => item.moduleCode === response.data.module_code,
          );
          console.log("moduleProgressData", moduleProgressData);
          if (!moduleProgressData) {
            setModuleStatus(false);
          } else {
            if (moduleProgressData.completed === true) {
              setButtonText("Revise Topics");
            } else {
              setButtonText("Resume Learning");
            }
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    apiCaller();
  }, []);

  const toggleExpand = (index) => {
    setExpandedTopic(expandedTopic === index ? null : index);
  };

  const handleStartLearning = async () => {
    const startData = await startModule(startModuleData.userId, startModuleData.moduleCode, startModuleData.moduleID);
    console.log("startData", startData);
    navigate(`/user/learning/${moduleId}/topic`, { state: { topicIndex: 0, subtopicIndex: 0 } });
  };
  const handleResumeLearning = async () => {
    const userProgressData = await getUserProgress(startModuleData.userId);
    console.log("userProgressData", userProgressData);
    let currentTopicCode = null;
    let currentSubtopicCode = null;
    let cuuretTopicIndex = 0;
    let currentSubtopicIndex = 0;
    userProgressData.data.progress.map((itemModule) => {
      if (itemModule.moduleCode === startModuleData.moduleCode) {
        if (itemModule.progressTopics.length > 0) {
          currentTopicCode = itemModule.progressTopics[itemModule.progressTopics.length - 1].topicCode;
          if (itemModule.progressTopics[itemModule.progressTopics.length - 1].progressSubtopics.length > 0) {
            currentSubtopicCode = itemModule.progressTopics[itemModule.progressTopics.length - 1].progressSubtopics[itemModule.progressTopics[itemModule.progressTopics.length - 1].progressSubtopics.length - 1].subtopicCode;
          }
        }

      }
    })
    if (currentTopicCode || currentSubtopicCode) {

      const response = await getModuleById(moduleId);


      const data = {
        title: response.data.moduleName,
        topicsList: await Promise.all(
          response.data.topicData.map(async (item, indexItem) => {
            if (item.topic_code === currentTopicCode) {
              console.log("indexItem", indexItem);
              cuuretTopicIndex = indexItem;
            }

            return {
              title: item.topicName,
              subtopics: await Promise.all(
                item.subtopicData.map(async (subitem, indexSub) => {
                  if (subitem.subtopic_code === currentSubtopicCode) {
                    console.log("indexSub", indexSub);
                    currentSubtopicIndex = indexSub;
                  }

                  return {
                    title: subitem.subtopicName,
                    completed: subitem.completed,
                    subtopicContent: subitem.subtopicContent,
                    subtopicSummary: subitem.subtopicSummary,
                    cheatSheetURL: subitem.cheatSheetURL || "#",
                  };
                })
              ),
            };
          })
        ),
      };
      console.log("currentTopicCode", currentTopicCode, "currentIndex", cuuretTopicIndex, "currentSubtopicCode", currentSubtopicCode, "currentSubtopicIndex", currentSubtopicIndex);
      navigate(`/user/learning/${moduleId}/topic`, { state: { topicIndex: cuuretTopicIndex, subtopicIndex: currentSubtopicIndex } });
    } else {
      navigate(`/user/learning/${moduleId}/topic`, { state: { topicIndex: 0, subtopicIndex: 0 } });
    }

    // navigate(`/user/learning/${moduleId}/topic`, { state: { topicIndex: 0, subtopicIndex: 0 } });
  };

  return (
    <UserLearningModuleWrapper>
      {loading ? (
        <ShimmerPostItem card title text cta />
      ) : (
     
      <div className="course-header1">
        <img src={courseData.imageUrl} alt="Course" className="course-image" />
        <div className="course-info">
          <h1 className="course-info-title">{courseData.title}</h1>
        </div>
        <div className="course-actions">
          <div className="course-details">
            <span className="topics">
              <span className="topic-icon">
                <VscBook size={28} />
              </span>
              <span className="topic-information">
                <span className="topics-title">Topics:</span>{" "}
                <span className="topics-count">{courseData.topics}</span>
              </span>
            </span>
            <span className="topics">
              <span className="duration-icon">
                <LuClock4 size={28} />
              </span>
              <span className="topic-information">
                <span className="topics-title">Maximum time taken:</span>{" "}
                <span className="topics-count">
                  Less than {courseData.duration} hrs
                </span>
              </span>
            </span>
            <span className="topics">
              <span className="last-updated-icon">
                <TbClockEdit size={28} />
              </span>
              <span className="topic-information">
                <span className="topics-title">Last updated on:</span>{" "}
                <span className="topics-count">{courseData.lastUpdated}</span>
              </span>
            </span>
          </div>
          <div className="course-action-btns">
            <button
              className="view-sample-btn"
              onClick={() => {
                navigate(`/user/learning/${moduleId}/topic/sampleInterview`);
              }}
            >
              <RiGeminiLine /> View Sample Interview
            </button>
            
            {
              moduleStatus === false ? (<>
                {/* // <Link
                  //   to={`/user/learning/${moduleId}/topic`}
                  //   state={{ topicIndex: 0, subtopicIndex: 0 }}
                  // > */}
                {" "}
                <button className="start-learning-btn" onClick={handleStartLearning}>{
                  <span>Start Learning</span>}
                </button>
                {/* // </Link> */}
              </>) : (
                buttonText === "Revise Topics" ? (
                  <>
                    <Link
                      to={`/user/learning/${moduleId}/topic`}
                      state={{ topicIndex: 0, subtopicIndex: 0 }}
                    >
                      <button className="start-learning-btn" onClick={handleStartLearning}>{
                        <span>Revise Topics</span>}
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <button className="start-learning-btn" onClick={handleResumeLearning}>{
                      <span>Resume Learning</span>}
                    </button>
                  </>
                )
              )
            }

          </div>
        </div>
      </div>
       )}

    { loading ? (
      <ShimmerTitle />
    ) : (
  
      <div className="course-overview">
        <h3 className="course-overview-title">Course Overview</h3>
        <p className="course-overview-description">{courseData.courseOverview}</p>
      </div>
  )}
      {loading ? (
        <ShimmerText />
      ) : (
   
      <div className="learning-goals">
        <h3 className="course-overview-title">What you will learn</h3>
        <ul className="learning-goals-list">
          {courseData.learningGoals?.map((goal, index) => (
            <li key={index}>
              <span className="check">
                <FaCheckCircle />
              </span>{" "}
              {goal}
            </li>
          ))}
        </ul>
      </div>
   )}
     {loading ? (
        <ShimmerText />
      ) : (
    
      <div className="course-topics">
        <h3 className="course-overview-title">Topics</h3>
        {courseData.topicsList?.map((topic, index) => (
          <div key={index} className="topic">
            <div className="topic-title" onClick={() => toggleExpand(index)}>
              <span>{topic.title}</span>
              <span>
                {expandedTopic === index ? (
                  <MdOutlineExpandLess size={38} />
                ) : (
                  <MdOutlineExpandMore size={38} />
                )}
              </span>{" "}
              {/* Toggle indicator */}
            </div>
            {expandedTopic === index && (
              <div className="subtopics">
                {topic.subtopics.map((subtopic, subIndex) => (
                  <p key={subIndex}>
                    {" "}
                    <FaCircleChevronRight size={24} className="subtopicicon" />
                    {subtopic}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
        
      </div>
       )}
    </UserLearningModuleWrapper >
  );
};

export default UserLearningModule;
