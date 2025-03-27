import React, { useEffect, useState } from "react";
import { LuHeart } from "react-icons/lu";
import theme from "../../../../theme/Theme"; // Adjust the path according to your structure
import {
  Container,
  Details,
  Card,
  CardContent,
  StartButton,
  Title,
} from "./InterviewPage.style";
import StartInterview from "../../components/UserInterview/StartInterview"; // Import the modal component
import { getModule } from "../../../../api/addNewModuleApi";

const InterviewPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null); // Store the selected course
  const [likedCourses, setLikedCourses] = useState(false);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getModule();
      const data = response.data.map((item) => ({
        id: item._id,
        title: item.moduleName,
        level: "Beginner",
        difficulty: "Easy Level",
        totalTime: "10h",
        image: item.imageURL,
      }));
      setCourses(data);
    };
    apiCaller();
  }, []);

  const toggleLike = (id) => {
    setLikedCourses((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle like status for the specific course
    }));
  };

  return (
    <>
      <Container>
        {courses.map((course) => (
          <Card key={course.id}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <button
                onClick={() => toggleLike(course.id)}
                className="like-button"
              >
                <LuHeart
                  className={`heart-icon ${
                    likedCourses[course.id] ? "liked" : ""
                  }`}
                />
              </button>
              <img
                src={course.image}
                alt={course.title}
                className="course-image"
              />
            </div>
            <CardContent>
              <Title>{course.title}</Title>
              <Details>
                <p> {course.level} </p>
                <div className="dot"></div>
                <p> {course.difficulty}</p>
                <div className="dot"></div>
                <p> {course.totalTime}</p>
              </Details>
              <StartButton onClick={() => setSelectedCourse(course)}>
                Start Now
              </StartButton>
            </CardContent>
          </Card>
        ))}
      </Container>

      {/* Modal Component */}
      {selectedCourse && (
        <StartInterview
          isOpen={!!selectedCourse}
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          title={courses.find((c) => c.id === selectedCourse.id)?.title}
        />
      )}
    </>
  );
};

export default InterviewPage;
