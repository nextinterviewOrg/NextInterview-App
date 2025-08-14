import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  StartButton,
  Title,
  LimitMessage,
} from "./InterviewPage.style";
import StartInterview from "../../components/UserInterview/StartInterview";
import { getModule } from "../../../../api/addNewModuleApi";

const MAX_DAILY_ATTEMPTS = 2;

const InterviewPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [attemptsToday, setAttemptsToday] = useState(0);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    // Load courses
    const fetchCourses = async () => {
      const response = await getModule();
      const data = response.data.map((item) => ({
        id: item._id,
        title: item.moduleName,
        image: item.imageURL,
        moduleCode: item.module_code,
      }));
      setCourses(data);
    };
    fetchCourses();

    // Check daily attempts from localStorage
    const checkDailyAttempts = () => {
      const attemptsData = localStorage.getItem('interviewAttempts');
      if (attemptsData) {
        const { date, count } = JSON.parse(attemptsData);
        const today = new Date().toDateString();
        
        if (date === today) {
          setAttemptsToday(count);
          setLimitReached(count >= MAX_DAILY_ATTEMPTS);
        } else {
          // Reset if it's a new day
          localStorage.removeItem('interviewAttempts');
          setAttemptsToday(0);
          setLimitReached(false);
        }
      }
    };

    checkDailyAttempts();
  }, []);

  const handleStartInterview = (course) => {
    if (limitReached) return;

    const today = new Date().toDateString();
    const newCount = attemptsToday + 1;
    
    // Update localStorage
    localStorage.setItem('interviewAttempts', JSON.stringify({
      date: today,
      count: newCount
    }));

    setAttemptsToday(newCount);
    setLimitReached(newCount >= MAX_DAILY_ATTEMPTS);
    setSelectedCourse(course);
  };

  return (
    <>
      <Container>
        {limitReached && (
          <LimitMessage>
            You have utilized the daily limit of {MAX_DAILY_ATTEMPTS} Mock Interviews, please try again tomorrow.
          </LimitMessage>
        )}

        {courses.map((course) => (
          <Card key={course.id}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src={course.image}
                alt={course.title}
                className="course-image"
              />
            </div>
            <CardContent>
              <Title>{course.title}</Title>
              <StartButton 
                onClick={() => handleStartInterview(course)}
                disabled={limitReached}
              >
                Start Now
              </StartButton>
              {limitReached && (
                <div style={{ 
                  fontSize: "12px", 
                  color: "red",
                  marginTop: "5px"
                }}>
                  Daily limit reached
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </Container>

      {selectedCourse && (
        <StartInterview
          isOpen={!!selectedCourse}
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          title={courses.find((c) => c.id === selectedCourse.id)?.title}
          moduleCode={selectedCourse.moduleCode}
        />
      )}
    </>
  );
};

export default InterviewPage;