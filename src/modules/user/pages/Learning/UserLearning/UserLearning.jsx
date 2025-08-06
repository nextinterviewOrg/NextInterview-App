import React, { useEffect, useState } from 'react'
import { UserLearningWrapper } from './UserLearning.styles'
import { CiBoxList } from "react-icons/ci";
import { LuLayoutGrid } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { getModule } from '../../../../../api/addNewModuleApi';
import api from '../../../../../config/axiosconfig';
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../../api/userApi";
import { getUserProgressByModule } from "../../../../../api/userProgressApi";
import ContinueLearningmodule from '../../../components/ContinueLearningmodule/ContinueLearningmodule';

export default function UserLearning() {
    const [isGridView, setIsGridView] = useState(true); // Toggle between grid and list view
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const [moduleProgressMap, setModuleProgressMap] = useState({});
    const { user, isLoaded } = useUser();

    useEffect(() => {
        const apiCaller = async () => {
            try {
                const response = await getModule();
                const modules = response.data;

                const data = modules.map((item) => ({
                    _id: item._id,
                    title: item.moduleName,
                    description: item.description,
                    topics: item.topicData.length,
                    duration: item.approxTimeTaken,
                    image: item.imageURL,
                    moduleCode: item.module_code,
                }));

                setCourses(data);

                if (user && isLoaded) {
                    const userData = await getUserByClerkId(user.id);
                    console.log("userData", userData);
                    const progressMap = {};

                    // Loop through each module and call the API with userId and moduleCode
                    await Promise.all(
                        data.map(async (course) => {
                            try {
                                const res = await getUserProgressByModule({
                                    userId: userData.data.user._id,
                                    moduleCode: course.moduleCode,
                                });
                                console.log("res", res);
                                if (res.success) {
                                    progressMap[course.moduleCode] = res.data.status; // 'completed' or 'ongoing'
                                }
                            } catch (err) {
                                console.warn(`Progress fetch failed for ${course.moduleCode}`, err);
                            }
                        })
                    );

                    setModuleProgressMap(progressMap);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        apiCaller();
    }, [user, isLoaded]);


    // Filter courses based on search query
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
            <ContinueLearningmodule />
            <UserLearningWrapper>
                <div className="courses-container">
                    <div className="header">
                        <h1 className='header-title'>Data Science Lite Modules</h1>
                        <div className="header-actions">
                            {/* <div className="searchContainer"> */}
                            <input
                                type="text"
                                placeholder={` Search`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            {/* {
                                 !(!!!searchQuery) && (  <IoSearchOutline className='search-icon' />)
                             } */}

                            {/* </div> */}

                            <button onClick={() => setIsGridView(!isGridView)} className="toggle-btn">
                                {isGridView ? <CiBoxList /> : <CiGrid41 />}
                            </button>
                        </div>
                    </div>

                    {/* Course Cards Layout */}
                    <div className={isGridView ? "course-cards grid-view" : "course-cards list-view"}>
                        {/* <div className="course-card-main"> */}


                        {filteredCourses.map((course, index) => (
                            <div key={index} className={isGridView ? "course-card" : "course-card-list"}>
                                <img src={course.image} alt={course.title} className={isGridView ? "course-image" : "course-image-list"} />
                                <div className={isGridView ? "course-details" : "course-details-list"}>
                                    <h3 className='course-title'>{course.title}</h3>
                                    {/* <h3 className='course-title'>{course.title.slice(0,30)}</h3> */}
                                    {/* ///i wnat to limit course description to 100 characters */}
                                    {/* <p className={isGridView?'course-description':'course-description-list'}>{course.description}</p> */}
                                    <p className={isGridView ? 'course-description' : 'course-description-list'}>{course.description.slice(0, 110)}...</p>
                                    <div className={isGridView ? "course-info" : "course-info-list"}>
                                        <span>{course.topics} {course.topics > 1 ? "Topics" : "Topic"}</span>
                                        <span>Less than {course.duration} {course.duration > 1 ? "hrs" : "hr"}</span>
                                    </div>
                                </div>

                                <div className={isGridView ? "coursecard-bt-container" : "coursecard-bt-container-list"}>
                                    <button
                                        className="start-btn"
                                        onClick={() => navigate(`/user/learning/${course._id}`)}
                                    >
                                        {
                                            !moduleProgressMap[course.moduleCode]
                                                ? "Start"
                                                : moduleProgressMap[course.moduleCode] === "completed"
                                                    ? "Revisit"
                                                    : "Continue"
                                        }
                                    </button>

                                </div>

                            </div>
                        ))}
                        {/* </div> */}
                    </div>
                </div>
            </UserLearningWrapper>
        </>
    )
}