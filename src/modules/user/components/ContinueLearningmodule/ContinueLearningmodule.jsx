import React, { useEffect, useState } from 'react';
import {
    UserLearningWrapper,
} from './ContinueLearningmodule.styles';
import { CiBoxList, CiGrid41 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { getModule } from '../../../../api/addNewModuleApi';
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import { getUserProgressByModule, getUserProgressStats } from "../../../../api/userProgressApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ContinueLearningmodule() {
    const [isGridView, setIsGridView] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [courses, setCourses] = useState([]);
    const [moduleProgressMap, setModuleProgressMap] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user, isLoaded } = useUser();
    const [startIndex, setStartIndex] = useState(0);

        const [visibleCards, setVisibleCards] = useState(4);

            useEffect(() => {
      const updateVisibleCards = () => {
        if (window.innerWidth <= 540) {
          setVisibleCards(1); // mobile
        } else if (window.innerWidth <= 768) {
          setVisibleCards(2); // tablet
        } else if (window.innerWidth <= 853) {
          setVisibleCards(1); // small desktop
        } else if (window.innerWidth <= 1024) {
          setVisibleCards(2); // medium desktop
        } else if (window.innerWidth <= 1360) {
          setVisibleCards(3); // large desktop
        }
        else {
          setVisibleCards(4); // desktop
        }
      };

      updateVisibleCards(); // run on mount
      window.addEventListener('resize', updateVisibleCards);
      return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const moduleRes = await getModule();
                const modules = moduleRes.data;

                const formattedModules = modules.map((item) => ({
                    _id: item._id,
                    title: item.moduleName,
                    description: item.description,
                    topics: item.topicData.length,
                    duration: item.approxTimeTaken,
                    image: item.imageURL,
                    moduleCode: item.module_code,
                }));

                setCourses(formattedModules);

                if (user && isLoaded) {
                    const userData = await getUserByClerkId(user.id);
                    const userId = userData.data.user._id;

                    const statsRes = await getUserProgressStats(userId);
                    console.log("getUserProgressStats", statsRes);
                    const moduleStats = statsRes?.ModuleProgress || [];

                    const progressMap = {};

                    const moduleCodeToTopicsMap = {};
                    formattedModules.forEach((mod) => {
                        moduleCodeToTopicsMap[mod.moduleCode] = mod.topics;
                    });


                    moduleStats.forEach(({ moduleCode, topicStats }) => {
                        const completed = topicStats?.completed || 0;
                        const ongoing = topicStats?.ongoing || 0;
                        const total = topicStats?.total || moduleCodeToTopicsMap[moduleCode] || 1;
                        if (total > 0 && completed < total) {
                            progressMap[moduleCode] = {
                                status: "ongoing",
                                completedTopics: completed,
                                totalTopics: total,
                                percentage: Math.round((completed / total) * 100)
                            };
                        }
                    });

                    // Fallback if not in stats
                    await Promise.all(
                        formattedModules.map(async (course) => {
                            if (!progressMap[course.moduleCode]) {
                                try {
                                    const res = await getUserProgressByModule({
                                        userId,
                                        moduleCode: course.moduleCode,
                                    });
                                    console.log("getUserProgressByModule", res);
                                    if (res.success && res.data.status === "ongoing") {
                                        const completed = res.data.completedTopics || 0;
                                        const total = res.data.totalTopics || course.topics || 1;
                                        if (completed < total) {
                                            progressMap[course.moduleCode] = {
                                                status: "ongoing",
                                                completedTopics: completed,
                                                totalTopics: total,
                                                percentage: Math.round((completed / total) * 100)
                                            };
                                        }
                                    }
                                } catch (err) {
                                    console.warn(`Progress fetch failed for ${course.moduleCode}`, err);
                                }
                            }
                        })
                    );

                    setModuleProgressMap(progressMap);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, isLoaded]);

    const filteredCourses = courses.filter(course => {
        const progress = moduleProgressMap[course.moduleCode];
        const isOngoing = progress?.status === "ongoing" || (progress && progress.percentage < 100);
        return course.title.toLowerCase().includes(searchQuery.toLowerCase()) && isOngoing;
    });

    const handleNext = () => {
        if (startIndex + visibleCards < filteredCourses.length) {
            setStartIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(prev => prev - 1);
        }
    };


    if (loading) {
        return <div style={{ textAlign: "center" }}>Loading your courses...</div>;
    }

    return (
        <UserLearningWrapper>
            <div className="courses-container">
                <div className="header">
                    <h1 className='header-title'>Continue Learning</h1>
                    {/* <div className="header-actions">
                        <input
                            type="text"
                            placeholder=" Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button onClick={() => setIsGridView(!isGridView)} className="toggle-btn">
                            {isGridView ? <CiBoxList /> : <CiGrid41 />}
                        </button>
                    </div> */}
                </div>

                {filteredCourses.length > visibleCards && (
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
                            disabled={startIndex + visibleCards >= filteredCourses.length}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}

                <div className={isGridView ? "course-cards grid-view" : "course-cards list-view"}>
                    {filteredCourses.slice(startIndex, startIndex + visibleCards).map((course, index) => {
                        const progress = moduleProgressMap[course.moduleCode];
                        const percentage = progress?.percentage || 0;
                        const completedTopics = progress?.completedTopics || 0;
                        const totalTopics = progress?.totalTopics || course.topics || 1;

                        return (
                            <div key={index} className={isGridView ? "course-card" : "course-card-list"}>
                                <img src={course.image} alt={course.title} className={isGridView ? "course-image" : "course-image-list"} />
                                <div className={isGridView ? "course-details" : "course-details-list"}>
                                    <h3 className='course-title'>{course.title}</h3>
                                    <p className={isGridView ? 'course-description' : 'course-description-list'}>
                                        {course.description.slice(0, 110)}...
                                    </p>
                                    <div className={isGridView ? "course-info" : "course-info-list"}>
                                        <span>{course.topics} {course.topics > 1 ? "Topics" : "Topic"}</span>
                                        <span>Less than {course.duration} {course.duration > 1 ? "hrs" : "hr"}</span>
                                    </div>
                                </div>

                                <div className="progress-section">
                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${percentage}%`,
                                                // backgroundColor:
                                                //     percentage >= 75 ? "green" :
                                                //         percentage >= 35 ? "orange" : "red"
                                            }}
                                        ></div>
                                    </div>
                                    <div className="progress-details">
                                        <div className="progress-details-count">
                                            <span>{completedTopics} / {course.topics} Topics completed</span>
                                        </div>
                                        <div className="progress-details-percentage">
                                            <span>{percentage}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={isGridView ? "coursecard-bt-container" : "coursecard-bt-container-list"}>
                                    <button
                                        className="start-btn"
                                        onClick={() => navigate(`/user/learning/${course._id}`)}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </UserLearningWrapper>
    );
}
