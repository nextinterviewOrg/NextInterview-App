import React, { useEffect, useState } from "react";
import { UserDashboardWrapper } from "./UserDashboard.styles";
import img from "../../assets/lucide_home.svg";
import { FaArrowTrendUp } from "react-icons/fa6";
import UserStatsOne from "../../components/UserStatsOne/UserStatsOne";
import MockTestsStats from "../../components/MockTestsStats/MockTestsStats";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import { use } from "react";
import { getUserByClerkId } from "../../../../api/userApi";
import { getUserProgress, getUserProgressByModule, getUserProgressStats } from "../../../../api/userProgressApi";
import { getModule, getModuleByModuleCode } from "../../../../api/addNewModuleApi";
import { Link } from "react-router-dom";
import { ShimmerPostDetails, ShimmerText } from "react-shimmer-effects";


export default function UserDashboard() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 4;

  const { user } = useUser();
  const [moduleCompleted, setModuleCompleted] = useState(0);
  const [modulteOngoing, setModuleOngoing] = useState(0);
  const [remainingModule, setRemainingModule] = useState(0);
  const [totalModule, setTotalModule] = useState(0);
  const [moduleProgress, setModuleProgress] = useState(0);
  const [courses, setCourses] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const apiCaller = async () => {
    
      try {
        setLoader(true);
        const moduleData = await getModule();
        setTotalModule(moduleData.data.length);
        const userData = await getUserByClerkId(user.id);
        const userProgressData = await getUserProgressStats(userData.data.user._id);
        setModuleCompleted(userProgressData.moduleStats.completed);
        setModuleOngoing(userProgressData.moduleStats.ongoing);
        setRemainingModule(moduleData.data.length - userProgressData.moduleStats.completed);
        setModuleProgress(Number.parseFloat((userProgressData.moduleStats.completed / moduleData.data.length) * 100).toFixed(2));
        let data = await Promise.all(userProgressData.ModuleProgress.map(async (item) => {
          const moduleData = await getModuleByModuleCode(item.moduleCode);
          const moduleProgress = await getUserProgressByModule({ userId: userData.data.user._id, moduleCode: item.moduleCode });
          if (moduleProgress.data.completed === false) {
            return ({
              title: moduleData.data.moduleName,
              topicsCompleted: item.topicStats.completed,
              totalTopics: moduleData.data.topicData.length,
              progress: Number.parseFloat((item.topicStats.completed / moduleData.data.topicData.length) * 100).toFixed(2),
              imgSrc: moduleData.data.imageURL,
              _id: moduleData.data._id
            })
          } else {
            return null;
          }
        }));
        data = data.filter(item => item !== null && item !== undefined);
        setCourses(data);
        setTotalCourses(data.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }

    }
    apiCaller();
  }, [user]);


  const handleNext = () => {
    if (startIndex + visibleCards < totalCourses) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };
  return (
    <UserDashboardWrapper>
      {loader ?
        (<div>
       <ShimmerPostDetails card cta variant="EDITOR" />
        </div>) :
        (


          <div className="UserDashboard-statsContainer">
            <div className="UserDashboard-statsContainer-row-one">
              <div className="UserDashboard-statsContainer-img">
                <img src={img} alt="background" />
              </div>
              <div className="UserDashboard-stats">
                <div className="UserDashboard-statsbox">
                  <div className="UserDashboard-statsbox-title">
                    <p>Modules completed</p>
                  </div>
                  <div className="UserDashboard-statsbox-value">{moduleCompleted}</div>
                </div>
                <div className="UserDashboard-statsbox">
                  <div className="UserDashboard-statsbox-title">
                    <p>Modules ongoing</p>
                  </div>
                  <div className="UserDashboard-statsbox-value">{modulteOngoing}</div>
                </div>
                <div className="UserDashboard-statsbox">
                  <div className="UserDashboard-statsbox-title">
                    <p>Remaining Modules</p>
                  </div>
                  <div className="UserDashboard-statsbox-value">{remainingModule}</div>
                </div>
                <div className="UserDashboard-statsbox">
                  <div className="UserDashboard-statsbox-title">
                    <p>Progress rate</p>
                  </div>
                  <div className="UserDashboard-statsbox-value">{moduleProgress}%</div>
                </div>
                <div className="UserDashboard-statsbox">
                  <div className="UserDashboard-statsbox-title">
                    <p>Challenges completed</p>
                  </div>
                  <div className="UserDashboard-statsbox-value">
                    0<span>/0</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-dashboard">
              <div className="continue-Learning-Header">
                <h2 className="header-dashboard">
                  Continue Learning{" "}
                  <BsFillCaretRightFill
                    size={20}
                    style={{ marginTop: "5px", marginLeft: "5px" }}
                  />
                </h2>
                
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
              </div>
              <div className="card-container-dashboard">
                {courses
                  .slice(startIndex, startIndex + visibleCards)
                  .map((course, index) => (
                    <Link to={`/user/learning/${course?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <div
                        className="card-dashboard"
                        key={index}
                        onClick={() => handleCardClick(index)}
                      >
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
                  ))}
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
