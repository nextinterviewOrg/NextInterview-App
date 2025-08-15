import React from "react";
import PropTypes from "prop-types";
import { InterviewFavoriteCardWrapper } from "./InterviewFavoriteCard.styles";
import { useNavigate } from "react-router-dom";

const InterviewFavoriteCard = ({
  title = "",
  topicName = "",
  imgSrc = "",
  moduleId = "",
  // allSubtopics = [],
  currentSubtopic = "", // Add this prop
  topicCode = "",  // Add this prop
  subtopicCode = "", // Add this prop
}) => {
  const navigate = useNavigate();

  console.log("currentSubtopic", currentSubtopic);
  console.log("topicCode", topicCode);
  console.log("subtopicCode", subtopicCode);
  
  return (
    <InterviewFavoriteCardWrapper>
      <div className="card">
        <div className="card-overlay">
          <img
            className="card-image"
            src={imgSrc}
            alt="Module"
            style={{ width: "100%", height: "150px", objectFit: "cover" }}
          />
        </div>

        <div className="card-content">
          
          <p className="topic"><strong>Topic:</strong> {topicName}</p>
          <h3 className="card-title">{title}</h3>
                {currentSubtopic && (
        <p className="subtopic"><strong>Subtopic:</strong> {currentSubtopic}</p>
      )}


          {/* {allSubtopics?.length > 0 && (
            <div>
              <strong>Subtopic:</strong>
              <ul className="subtopics-list">
                {allSubtopics.map((sub, idx) => (
                  <li key={idx}>{sub}</li>
                ))}
              </ul>
            </div>
          )} */}

          <div className="card-footer">
          <button
            className="learn-btn"
            onClick={() => {
              navigate(`/user/learning/${moduleId}/topic`, {
                state: {
                  topicCode: topicCode,
                  subtopicCode: subtopicCode,
                  scrollToSubtopic: true
                }
              });
            }}
          >
            Learn
          </button>
          </div>
        </div>
      </div>
    </InterviewFavoriteCardWrapper>
  );
};

InterviewFavoriteCard.propTypes = {
  title: PropTypes.string,
  topicName: PropTypes.string,
  imgSrc: PropTypes.string,
  moduleId: PropTypes.string,
  currentSubtopic: PropTypes.string, // Add this prop type
  topicCode: PropTypes.string,  // Add this prop type
  subtopicCode: PropTypes.string, // Add this prop type
};

export default InterviewFavoriteCard;