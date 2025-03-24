import React, { useEffect, useState } from "react";
import {
  UserLearningWrapper
} from "./UserLearning.styles";
import { CiBoxList } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { getModule } from "../../../../../api/addNewModuleApi";
import { ShimmerPostItem } from "react-shimmer-effects"; // Import shimmer
import { IoSearchOutline } from "react-icons/io5";

export default function UserLearning() {
  const [isGridView, setIsGridView] = useState(true); // Toggle between grid and list view
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const apiCaller = async () => {
      try {
        const response = await getModule();

        const data = response.data.map((item) => {
          return {
            _id: item._id,
            title: item.moduleName,
            description: item.description,
            topics: item.topicData.length,
            duration: item.approxTimeTaken,
            image: item.imageURL,
          };
        });
        setCourses(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading after API call
      }
    };
    apiCaller();
  }, []);

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <UserLearningWrapper>
      <div className="courses-container">
        <div className="header">
          <h1 className="header-title">Data Science Lite Modules</h1>
          <div className="header-actions">
            <input
              type="text"
              placeholder={` Search`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="toggle-btn"
            >
              {isGridView ? <CiBoxList /> : <CiGrid41 />}
            </button>
          </div>
        </div>

        {/* Course Cards Layout with Shimmer Effect */}
        <div
          className={
            isGridView ? "course-cards grid-view" : "course-cards list-view"
          }
        >
          {loading
            ? // Show Shimmer when loading
              [...Array(6)].map((_, index) => (
                <ShimmerPostItem
                  key={index}
                  card
                  title
                  cta
                  imageHeight={isGridView ? 200 : 100}
                  contentCenter={!isGridView}
                  style={{
                    width: isGridView ? "300px" : "100%",
                    marginBottom: "20px",
                  }}
                />
              ))
            : // Show actual courses when loaded
              filteredCourses.map((course, index) => (
                <div
                  key={index}
                  className={isGridView ? "course-card" : "course-card-list"}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className={
                      isGridView ? "course-image" : "course-image-list"
                    }
                  />
                  <div
                    className={
                      isGridView ? "course-details" : "course-details-list"
                    }
                  >
                    <h3 className="course-title">{course.title}</h3>
                    <p
                      className={
                        isGridView
                          ? "course-description"
                          : "course-description-list"
                      }
                    >
                      {course.description}
                    </p>
                    <div
                      className={
                        isGridView ? "course-info" : "course-info-list"
                      }
                    >
                      <span>{course.topics} topics</span>
                      <span>Less than {course.duration} hrs</span>
                    </div>
                  </div>
                  <div
                    className={
                      isGridView
                        ? "coursecard-bt-container"
                        : "coursecard-bt-container-list"
                    }
                  >
                    <button
                      className="start-btn"
                      onClick={() => {
                        navigate(`/user/learning/${course._id}`);
                      }}
                    >
                      Start
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </UserLearningWrapper>
  );
}
