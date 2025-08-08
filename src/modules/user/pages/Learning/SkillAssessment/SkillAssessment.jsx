import React, { useEffect, useState } from "react";
import {
  AssessmentContainer,
  QuestionWrapper,
  QuestionHeader,
  RadioOption,
  ButtonWrapper,
  SkipButton,
  SubmitButton,
  AnswerFeedback,
  TextArea,
  CloseButton,
  CorrectAnswer
} from "../SkillAssessment/SkillAssessment.styles";
import { evaluateSkillAssessment, getSkillAssessment } from "../../../../../api/skillAssessmentApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../../api/userApi";
import { completeModule, completeSubTopic, completeTopic } from "../../../../../api/userProgressApi";
import { getLastSubTopicByTopicCode, getLastTopicByModuleCode } from "../../../../../api/addNewModuleApi";
import { useNavigate } from "react-router-dom";
import { on } from "codemirror";
import { Feedback } from "@mui/icons-material";
import { addQuestionToUserSkillAssessmentProgress } from "../../../../../api/userSkillAssessmentProgressApi";
import { Input, notification } from "antd";

const SkillAssessment = ({
  module_code,
  topic_code,
  subtopic_code,
  question_type,
  level,
  onCloseModal,
  currentTopicIndex,
  currentSubTopicIndex,
  moduleId
}) => {
  const [answers, setAnswers] = useState({}); // User answers
  const [filteredQuestions, setFilteredQuestions] = useState([]); // List of questions
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [submitted, setSubmitted] = useState(false); // Flag to track if the form has been submitted
  const [feedback, setFeedback] = useState({}); // Store feedback for each question
  const { isLoaded, user, isSignedIn } = useUser();
  const [showClosebtn, setShowClosebtn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getSkillAssessment(
          module_code,
          topic_code,
          subtopic_code,
          question_type,
          level
        );
        console.log("response", response);

        if (response && response.success && Array.isArray(response.data)) {
          setFilteredQuestions(response.data);
        } else {
          console.error("Unexpected API response format:", response);
          setFilteredQuestions([]);
          setError("Invalid response from server.");
        }
      } catch (err) {
        if (err.response.status === 404) {
          setShowClosebtn(true);
          onCloseModal();

        } else {
          console.error("Error fetching questions:", err);

          setError("Failed to load questions. Please try again.");
        }

      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [module_code, topic_code, subtopic_code, question_type, level]);
  useEffect(() => {
    if (Object.keys(feedback).length > 0) {
      // Log feedback after it has been updated
      console.log("Feedback updated:", feedback);
    }
  }, [feedback]);
  const handleOptionChange = (questionId, option, optionText) => {
    console.log(questionId, option, optionText);
    setAnswers((prev) => ({ ...prev, [questionId]: optionText }));
  };

  const handleTextAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };
  const checkAnswer = (question) => {
    const userAnswer = answers[question._id]; // User's input
    let UserOption;
    switch (userAnswer) {
      case "1":
        UserOption = "option_a";
        break;
      case "2":
        UserOption = "option_b";
        break;
      case "3":
        UserOption = "option_c";
        break;
      case "4":
        UserOption = "option_d";
        break;
      default:
        UserOption = "";
    }
    if (question.question_type === "mcq") {
      return UserOption === question.correct_option;
    } else if (question.question_type === "single-line" || question.question_type === "multi-line" || question.question_type === "approach") {
      // For single-line, multi-line, and approach questions, compare user input (trimmed and lowercased)
      if (question.answer.trim() !== "") {
        return userAnswer.trim().toLowerCase() === question.answer.trim().toLowerCase();
      } else {
        // If there's no answer in the database, handle accordingly (e.g., no correct answer to check)
        return userAnswer.trim() === "";
      }
    }

    return false;
  };


  const handleSubmit = async () => {
    const userData = await getUserByClerkId(user.id);
    let finalTopicIndex = currentTopicIndex;
    let finalSubTopicIndex = currentSubTopicIndex;
    const errors = {};
    let hasErrors = false;

    filteredQuestions.forEach(question => {
      const answer = answers[question._id];
      let isValid = true;

      if (question.question_type === "mcq") {
        isValid = !!answer;
      } else {
        isValid = answer?.trim()?.length > 0;
      }

      if (!isValid) {
        errors[question._id] = "This question is required";
        hasErrors = true;
      }
    });

    if (hasErrors) {
      // Set errors state to highlight unanswered questions
      setFeedback(errors);
      notification.error({
        message: "Answer all questions",  // Title of the notification
        description: "Please answer all questions before submitting.",  // Error message description
        placement: "topRight",
        duration: 3,
      })
      // alert("Please answer all questions before submitting");
      return;
    }
    const newFeedback = {};
    for (const question of filteredQuestions) {
      const userAnswer = answers[question._id];
      console.log(userAnswer);// User's input

      // const isCorrect = checkAnswer(question);
      const isCorrect = await evaluateSkillAssessment({ id: question._id, option: userAnswer });
      console.log("isCorrect q1qqq", isCorrect);
      await addQuestionToUserSkillAssessmentProgress(
        {
          userId: userData.data.user._id,
          moduleId: moduleId,
          moduleCode: module_code,
          topicCode: topic_code,
          subtopicCode: subtopic_code,
          questionId: question._id,
          selectedOption: userAnswer,
          finalResult: isCorrect.result
        }
      )
      console.log(isCorrect);
      newFeedback[question._id] = {
        text: isCorrect.result ? "Correct" : "Incorrect",
        isCorrect: isCorrect.result,
        answer: isCorrect.skillAssessment[isCorrect.skillAssessment.correct_option],
      };
    };
    console.log(feedback);
    setFeedback(newFeedback);
    setSubmitted(true); // Mark the form as submitted
    setShowClosebtn(true);

    // Don't automatically close the modal - let the user close it manually
    // The feedback modal will be shown after the user closes this modal
  };

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>{error}</div>;
  if (!filteredQuestions.length) return <div>No questions available.
    {/* {showClosebtn ? <CloseButton onClick={onCloseModal}>X</CloseButton> : null} */}
  </div>;

  return (
    <AssessmentContainer>
      {showClosebtn ? <CloseButton onClick={onCloseModal}>X</CloseButton> : null}
      <h1>Skill Assessment</h1>
      {filteredQuestions.map((q, index) => (
        <QuestionWrapper key={q._id || index}>
          <QuestionHeader> <span className="question-index">{index + 1}</span>  {q.question}</QuestionHeader>

          {q.question_type === "mcq" && !submitted && (
            <>
            {[q.option_a, q.option_b, q.option_c, q.option_d].filter(Boolean).map((option, idx) => (
  <RadioOption key={`option-${q._id}-${idx}`}>
    <input
      type="radio"
      name={`question-${q._id}`}
      value={`option_${String.fromCharCode(97 + idx)}`}
      onChange={() =>
        handleOptionChange(q._id, option, `option_${String.fromCharCode(97 + idx)}`)
      }
      checked={answers[q._id] === `option_${String.fromCharCode(97 + idx)}`}
    />
    {option}
  </RadioOption>
))}
            </>
          )}

          {(q.question_type === "single-line" || q.question_type === "multi-line" || q.question_type === "approach") && !submitted && (
            <TextArea
              placeholder="Type your answer..."
              value={answers[q._id] || ""}
              onChange={(e) => handleTextAnswer(q._id, e.target.value)}
            />
          )}

          {submitted && feedback[q._id] && (
            <>
              <AnswerFeedback isCorrect={feedback[q._id].isCorrect}>
                {/* <div className="error-message" style={{ color: 'red' }}>
                  {feedback[q._id]}
                </div> */}
                {feedback[q._id].text}
              </AnswerFeedback>
              {
                !feedback[q._id].isCorrect &&
                <CorrectAnswer>
                  <strong>Correct Answer:</strong> {feedback[q._id].answer}
                </CorrectAnswer>}
            </>
          )}
        </QuestionWrapper>
      ))}

      {!submitted && (
        <ButtonWrapper>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </ButtonWrapper>
      )}
    </AssessmentContainer>
  );
};

export default SkillAssessment;