import React, { useEffect, useState, useCallback } from "react";
import {
  UserLearningWrapper
} from "./UserLearning.styles";
import { CiBoxList } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getModule } from "../../../../../api/addNewModuleApi";
import { ShimmerThumbnail } from "react-shimmer-effects"; // Changed to ShimmerThumbnail
import { IoSearchOutline } from "react-icons/io5";
import "./UserLearning.scss";

export default function UserLearning() {
  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchModules = useCallback(async () => {
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
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch modules when component mounts
  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  // Refresh data when user returns to this page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchModules();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchModules]);

  // Refresh data when location changes (user navigates back to this page)
  useEffect(() => {
    if (location.pathname === '/user/learning') {
      fetchModules();
    }
  }, [location.pathname, fetchModules]);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <UserLearningWrapper>
      <div className="courses-container2">
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

        <div className={
            isGridView ? "card__containers grid-view" : "card__containers list-view"
          }>
          {loading ? (
            // ShimmerThumbnail loading state
            [...Array(6)].map((_, index) => (
              isGridView ? (
                <div key={index} className="card" style={{ marginLeft: "20px" }}>
                  <div className="card__article">
                    <ShimmerThumbnail
                      height={200}
                      width="100%"
                      rounded
                      style={{
                        width: "100%",
                        height: "200px",
                        borderRadius: "1.5rem"
                      }}
                    />
                    <div className="card__datas">
                      <ShimmerThumbnail
                        height={24}
                        width="80%"
                        style={{
                          marginBottom: "0.75rem",
                          borderRadius: "4px"
                        }}
                      />
                      <ShimmerThumbnail
                        height={16}
                        width="90%"
                        style={{
                          marginBottom: "0.25rem",
                          borderRadius: "4px"
                        }}
                      />
                      <div className="card__info">
                        <ShimmerThumbnail
                          height={16}
                          width="40%"
                          style={{
                            borderRadius: "4px"
                          }}
                        />
                        <ShimmerThumbnail
                          height={16}
                          width="20%"
                          style={{
                            marginLeft: "auto",
                            borderRadius: "4px"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className="card-list">
                  <ShimmerThumbnail
                    height={100}
                    width={150}
                    rounded
                    style={{
                      borderRadius: "0.5rem",
                      marginRight: "1rem"
                    }}
                  />
                  <ShimmerThumbnail
                    height={24}
                    width="60%"
                    style={{
                      borderRadius: "4px",
                      margin: "0 auto"
                    }}
                  />
                  <ShimmerThumbnail
                    height={16}
                    width={80}
                    style={{
                      borderRadius: "4px",
                      marginLeft: "1rem"
                    }}
                  />
                </div>
              )
            ))
          ) : (
            filteredCourses.map((course, index) =>
              isGridView ? (
                <div key={index} className="card">
                  <div className="card__article">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="card__img"
                    />
                    <div className="card__datas">
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
            )
          )}
        </div>
      </div>
    </UserLearningWrapper>
  );
}