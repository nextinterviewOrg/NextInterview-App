import React, { useEffect, useState } from "react";
import { UserDashboardWrapper } from "./UserDashboard.styles";
import img from "../../assets/lucide_home.svg";
import { FaArrowTrendUp } from "react-icons/fa6";
import UserStatsOne from "../../components/UserStatsOne/UserStatsOne";
import MockTestsStats from "../../components/MockTestsStats/MockTestsStats";
import { BsFillCaretRightFill, BsThreeDots } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import { getUserProgress, getUserProgressByModule, getUserProgressStats } from "../../../../api/userProgressApi";
import { getModule, getModuleByModuleCode } from "../../../../api/addNewModuleApi";
import { Link } from "react-router-dom";
import { ShimmerPostDetails, ShimmerText } from "react-shimmer-effects";
import NewUser from "../../components/NewUser/NewUser"; // Import the NewUser component

export default function UserDashboard() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 4;
  const [showAllStats, setShowAllStats] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { user, isLoaded,sessionId,isSignedIn } = useUser();
  const [moduleCompleted, setModuleCompleted] = useState(0);
  const [moduleOngoing, setModuleOngoing] = useState(0);
  const [remainingModule, setRemainingModule] = useState(0);
  const [totalModule, setTotalModule] = useState(0);
  const [moduleProgress, setModuleProgress] = useState(0);
  const [courses, setCourses] = useState([]);
  const [allModules, setAllModules] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [loader, setLoader] = useState(false);
  const [hasStartedModules, setHasStartedModules] = useState(false);
  const [error, setError] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false); // New state to track if user is new

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const apiCaller = async () => {
      try {
        setLoader(true);
        console.log("user", user, "isLoaded", isLoaded,"sessionId", sessionId,"isSignedIn", isSignedIn);
        if (!isLoaded || !user) {  return};
        const moduleData = await getModule();
        setTotalModule(moduleData.data.length);
        setAllModules(moduleData.data);
        
        // Get user data
        const userData = await getUserByClerkId(user.id);
        const userId = userData.data.user._id;
        
        // Get user progress stats
        const userProgressData = await getUserProgressStats(userId);
        
        // Set basic stats
        setModuleCompleted(userProgressData.moduleStats?.completed || 0);
        setModuleOngoing(userProgressData.moduleStats?.ongoing || 0);
        setRemainingModule(moduleData.data.length - (userProgressData.moduleStats?.completed || 0));

        // Calculate progress percentage
        const completedModules = userProgressData.moduleStats?.completed || 0;
        const totalModules = moduleData.data.length;
        const progressPercentage = (completedModules / totalModules) * 100;
        setModuleProgress(Number.parseFloat(progressPercentage.toFixed(2)));
        
        // Check if user has started any modules
        const hasStarted = userProgressData.ModuleProgress?.length > 0;
        setHasStartedModules(hasStarted);
        
        // Check if user is new (hasn't started any modules and hasn't completed any)
        const isNew = !hasStarted && (userProgressData.moduleStats?.completed || 0) === 0;
        setIsNewUser(isNew);
        
        if (hasStarted) {
          // If user has started modules, show only ongoing modules
          const ongoingModules = await Promise.all(
            userProgressData.ModuleProgress.map(async (item) => {
              try {
                const moduleData = await getModuleByModuleCode(item.moduleCode);
                const moduleProgress = await getUserProgressByModule({ 
                  userId, 
                  moduleCode: item.moduleCode 
                });
                
                // Only include modules that aren't completed
                if (!moduleProgress.data?.completed) {
                  return {
                    title: moduleData.data.moduleName,
                    topicsCompleted: item.topicStats?.completed || 0,
                    totalTopics: moduleData.data.topicData?.length || 0,
                    progress: Number.parseFloat(
                      ((item.topicStats?.completed || 0) / 
                      (moduleData.data.topicData?.length || 1) * 100)
                    ).toFixed(2),
                    imgSrc: moduleData.data.imageURL,
                    _id: moduleData.data._id
                  };
                }
                return null;
              } catch (err) {
                console.error(`Error processing module ${item.moduleCode}:`, err);
                return null;
              }
            })
          );
          
          // Filter out null values and set courses
          const filteredModules = ongoingModules.filter(Boolean);
          setCourses(filteredModules);
          setTotalCourses(filteredModules.length);
        } else {
          // If user hasn't started any modules, show all available modules
          const allModulesData = moduleData.data.map(module => ({
            title: module.moduleName,
            topicsCompleted: 0,
            totalTopics: module.topicData?.length || 0,
            progress: 0,
            imgSrc: module.imageURL,
            _id: module._id
          }));
          setCourses(allModulesData);
          setTotalCourses(allModulesData.length);
        }
      } catch (error) {
        console.error("Error in apiCaller:", error);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoader(false);
      }
    };
    
    if (user?.id) {
      apiCaller();
    }
  }, [user]);

  const handleNext = () => {
    if (startIndex + visibleCards < totalCourses) {
      setStartIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prevIndex => prevIndex - 1);
    }
  };

  const toggleShowAllStats = () => {
    setShowAllStats(!showAllStats);
  };

  const stats = [
    { title: "Modules completed", value: moduleCompleted },
    { title: "Modules ongoing", value: moduleOngoing },
    { title: "Remaining Modules", value: remainingModule },
    { title: "Progress rate", value: `${moduleProgress}%` },
    ...(window.innerWidth > 1024 ? [{ title: "Challenges completed", value: "0/0" }] : [])
  ];

  const visibleStats = isMobile && !showAllStats ? stats.slice(0, 4) : stats;

  if (error) {
    return (
      <UserDashboardWrapper>
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </UserDashboardWrapper>
    );
  }

  // If user is new, show the NewUser component
  if (isNewUser && !loader) {
    return <NewUser />;
  }

  return (
    <UserDashboardWrapper>
      {loader ? (
        <div>
          <ShimmerPostDetails card cta variant="EDITOR" />
        </div>
      ) : (
        <div className="UserDashboard-statsContainer">
          <div className="UserDashboard-statsContainer-row-one">
            <div className="UserDashboard-statsContainer-img">
              <img src={img} alt="background" />
            </div>

            <div className="UserDashboard-stats">
              {visibleStats.map((stat, index) => (
                <div className="UserDashboard-statsbox" key={index}>
                  <div className="UserDashboard-statsbox-title">
                    <p>{stat.title}</p>
                  </div>
                  <div className="UserDashboard-statsbox-value">{stat.value}</div>
                </div>
              ))}
              
              {isMobile && !showAllStats && (
                <div className="UserDashboard-statsbox more-button" onClick={toggleShowAllStats}>
                  <div className="UserDashboard-statsbox-title">
                    <p>More</p>
                  </div>
                  <div className="UserDashboard-statsbox-value">
                    <BsThreeDots size={24} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="container-dashboard">
            <div className="continue-Learning-Header">
              <h2 className="header-dashboard">
                {hasStartedModules ? "Continue Learning" : "Start Learning"}{" "}
                <BsFillCaretRightFill
                  size={20}
                  style={{ marginTop: "5px", marginLeft: "5px" }}
                />
              </h2>
              
              {totalCourses > visibleCards && (
                <div className="carousel-wrapper">
                  <button
                    className="arrow-button left"
                    onClick={handlePrev}
                    disabled={startIndex === 0}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="arrow-button right"
                    onClick={handleNext}
                    disabled={startIndex + visibleCards >= totalCourses}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>

            <div className="card-container-dashboard">
              {courses.length > 0 ? (
                courses
                  .slice(startIndex, startIndex + visibleCards)
                  .map((course, index) => (
                    <Link 
                      to={`/user/learning/${course?._id}`} 
                      style={{ textDecoration: "none", color: "inherit" }}
                      key={index}
                    >
                      <div className="card-dashboard">
                        <img src={course?.imgSrc} alt="Course" />
                        <h4>{course?.title}</h4>
                        <div className="progress">
                          <p>{`${course?.topicsCompleted}/${course?.totalTopics} Topics completed`}</p>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${course?.progress}%` }}
                            ></div>
                          </div>
                          <p>{course?.progress}%</p>
                        </div>
                      </div>
                    </Link>
                  ))
              ) : (
                <div className="no-courses-message">
                  <p>No courses available to display.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="UserDashboard-statsContainer-row-two">
            <div className="UserDashboard-Charts-container">
              <div className="UserDashboard-charts-title">
                Your Growth Trend <FaArrowTrendUp />
              </div>
              <div className="UserDashboard-charts">
                <UserStatsOne />
                <MockTestsStats />
              </div>
            </div>
          </div>
        </div>
      )}
    </UserDashboardWrapper>
  );
}