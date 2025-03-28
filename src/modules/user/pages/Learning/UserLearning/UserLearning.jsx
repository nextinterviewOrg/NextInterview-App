import React, { useEffect, useState } from "react";
import {
  UserLearningWrapper
} from "./UserLearning.styles";
import { CiBoxList } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { getModule } from "../../../../../api/addNewModuleApi";
import { ShimmerPostItem } from "react-shimmer-effects"; // Import shimmer
import { IoSearchOutline } from "react-icons/io5";
import "./UserLearning.scss";

export default function UserLearning() {
  const [isGridView, setIsGridView] = useState(true); // Toggle between grid and list view
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const apiCaller = async () => {
      try {
        setLoading(true);
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
      }finally{
        setLoading(false);
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
            isGridView ? "card__container grid-view" : "card__container list-view"
          }
        >
          {loading
            ? // Shimmer for loading state remains the same
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
            : // Once loading is done, display filtered courses
              filteredCourses.map((course, index) =>
                isGridView ? (
                  <div key={index} className="card">
                    <div className="card__article">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="card__img"
                      />
                      <div className="card__data">
                        <h3 className="card__title">{course.title}</h3>
                        <p className="card__description">
                          {course.description.split(" ").slice(0, 10).join(" ")}
                          {course.description.split(" ").length > 10 && " ..."}
                        </p>
                        <div className="card__info">
                          <span style={{ color: "#68C184" }}>
                            Less than {course.duration} hrs
                          </span>
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textDecoration: "none",
                            }}
                          >
                            <Link to={`/user/learning/${course._id}`} className="card__button">
                              Start
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="card-list">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="list-card__img"
                    />
                    <h3 className="list-card__title">{course.title}</h3>
                    <Link to={`/user/learning/${course._id}`} className="list-card__button">
                      Start
                    </Link>
                  </div>
                )
              )}
        </div>
      </div>
    </UserLearningWrapper>
  );
}
