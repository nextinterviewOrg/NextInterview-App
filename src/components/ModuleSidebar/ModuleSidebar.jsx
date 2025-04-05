import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { MdOutlineMenuBook } from "react-icons/md";
import { BsFileEarmarkLock } from "react-icons/bs";
import { TbDeviceIpadQuestion } from "react-icons/tb";
import { IoIosRepeat } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { CiMobile1 } from "react-icons/ci";
import { MdOutlineLockClock } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdNotificationsNone } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoSettingsOutline } from "react-icons/io5";
import { ModuleSidebarContainer, MobileToggleButton,Overlay  } from "./ModuleSidebar.styles";
import Logo from "../../assets/Logo.png";
import { MdExpandCircleDown } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { getModuleById } from "../../api/addNewModuleApi";
import { RiGeminiLine } from "react-icons/ri";
import { getUserProgressByModule, getUserProgressBySubTopic, getUserProgressStats } from "../../api/userProgressApi";
const courseData1 = {
  title: "",
  topicsList: [],
};
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../api/userApi";
import { use } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function ModuleSidebar({
  isExpanded,
  setIsExpanded,
  setTitle,
  courseProgress,
}) {
  const location = useLocation();
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [totalTopics, setTotalTopics] = useState(0);
  const [totalCompletedTopics, setTotalCompletedTopics] = useState(0);
  const [moduleProgressPercentage, setModuleProgressPercentage] = useState(0);
  const navigate = useNavigate();
  const [slectectedCurrentSubTopic, setSelectedCurrentSubTopic] = useState(null);
  const [courseData, setCourseData] = useState(courseData1);
  const moduleId = useParams().id;
  const { isLoaded, user, isSignedIn } = useUser();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
      setIsExpanded(true);
    }
  }, [isMobile]);

  useEffect(() => {
    const apiCaller = async () => {
      try {
        const response = await getModuleById(moduleId);
        console.log("jjsjs", response.data);
        const responseUser = await getUserByClerkId(user.id);
        const userModuleProgress = await getUserProgressByModule({ userId: responseUser.data.user._id, moduleCode: response.data.module_code });
        const userModuleProgressStats = await getUserProgressStats(responseUser.data.user._id);
        setExpandedTopic(location.state?.topicIndex || 0);
        setSelectedCurrentSubTopic(location.state?.subtopicIndex || 0);

        userModuleProgressStats.ModuleProgress.map((item) => {
          if (item.moduleCode === response.data.module_code) {
            setTotalCompletedTopics(item.topicStats.completed);
            setModuleProgressPercentage(Number.parseFloat(item.topicStats.completed / (response.data.topicData.length ) * 100).toFixed(0));
          }
        })
        setTotalTopics(response.data.topicData.length + 1);
        const data = {
          title: response.data.moduleName,
          topicsList: await Promise.all(response.data.topicData.map(async (item) => {
            return {
              title: item.topicName,
              subtopics: await Promise.all(item.subtopicData.map(async (subitem) => {
                console.log("subitem", subitem);
                const subTopicProgress = await getUserProgressBySubTopic({ userId: responseUser.data.user._id, moduleCode: response.data.module_code, topicCode: item.topic_code, subtopicCode: subitem.subtopic_code });
                return {
                  title: subitem.subtopicName,
                  completed: subTopicProgress?.data?.status === "completed" ? true : false||false,
                };
              })),
            };
          })),
        };
        console.log("returned Data=>", data);
        setCourseData(data);
      } catch (error) {
        console.log(error);
      }
    };
    apiCaller();
  }, [navigate, location.state, user]);

  const toggleExpand = (index) => {
    setExpandedTopic(expandedTopic === index ? null : index);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!isMobile) {
      setIsExpanded(!isExpanded);
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.module-sidebar');
      const toggleButton = document.querySelector('.mobile-toggle-button');
      
      if (isMobile && sidebarOpen && 
          !sidebar.contains(event.target) && 
          !toggleButton.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (isMobile && sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, sidebarOpen]);
  return (
    <>
      {isMobile && (
        <MobileToggleButton className="mobile-toggle-button" onClick={toggleSidebar}>
          <GiHamburgerMenu size={24} />
        </MobileToggleButton>
      )}
      
      <Overlay 
        visible={isMobile && sidebarOpen} 
        onClick={() => setSidebarOpen(false)}
      />
      
      <ModuleSidebarContainer
        className="module-sidebar"
        isExpanded={isExpanded}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
      >
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>

        {/* Progress Bar Section */}
        <div className="progress-section">
          <h1 className="module-sidebar-topic-title">{courseData.title}</h1>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${moduleProgressPercentage}%`, backgroundColor: moduleProgressPercentage>=35? moduleProgressPercentage>=75?"green" :  "orange":"red" }}
            ></div>
          </div>
          <div className="progress-details">
            <div className="progress-details-count">
              <span>{totalCompletedTopics} /{courseData.topicsList.length} Topics completed</span>
              <span></span>
            </div>

            <div className="progress-details-percentage"
            style={{
              fontSize: "16px",
            }} >
              <span>{moduleProgressPercentage}%</span>
            </div>
          </div>
          <button
            className="start-button"
            onClick={() => {
              navigate(`/user/learning/${moduleId}/topic/sampleInterview`);
            }}
          >
            <RiGeminiLine /> View sample interview
          </button>
        </div>

        <div className="course-topics" style={{ overflowY: "auto" }}>
          <h3 className="course-topics-title">Topics</h3>
          {courseData.topicsList?.map((topic, index) => (
            <div key={index} className="topic">
              <div className="topic-title" onClick={() => toggleExpand(index)}>
                <span className="topic-name">{topic.title}</span>
                <span 
                >
                  {expandedTopic === index ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                </span>
              </div>
              {expandedTopic === index && (
                <div className="subtopics">
                  {topic.subtopics.length === 0 ? (
                    <p>No subtopics available</p>
                  ) : (
                    topic.subtopics?.map((subtopic, subIndex) => (
                      <Link
                        className="subtopic-link"
                        to={`/user/learning/${moduleId}/topic`}
                        state={{
                          topicIndex: index,
                          subtopicIndex: subIndex,
                        }}
                        onClick={() => isMobile && setSidebarOpen(false)}
                      >
                        <div key={subIndex} className="subtopic">
                          <div className="subtopic-info" style={{ backgroundColor: slectectedCurrentSubTopic == subIndex ? "lightgray" : "transparent", borderRadius: "5px" }}>
                            <span
                              className={
                                subtopic.completed ? "completed" : "pending"
                              }
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                }}
                              >
                                <span>
                                  {subtopic.completed ? (
                                    <FaCheckCircle />
                                  ) : (
                                    <FaCheckCircle style={{ color: "gray" }} />
                                  )}
                                </span>
                                <span className="subtopic-title">
                                  {subtopic.title}
                                </span>
                              </div>
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </ModuleSidebarContainer>
    </>
  );
}