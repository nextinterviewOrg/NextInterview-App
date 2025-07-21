import React from "react";
import PropTypes from "prop-types";
import { InterviewFavoriteCardWrapper } from "./InterviewFavoriteCard.styles";

const InterviewFavoriteCard = ({
  title = "",
  topicName = "",
  imgSrc = "",
  moduleId = "",
  allSubtopics = [],
}) => {
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
          <h3 className="card-title">{title}</h3>
          <p><strong>Topic:</strong> {topicName}</p>

          {allSubtopics?.length > 0 && (
            <div className="subtopics-list">
              <strong>Subtopics:</strong>
              <ul>
                {allSubtopics.map((sub, idx) => (
                  <li key={idx}>{sub}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="card-footer">
            <button
              className="learn-btn"
              onClick={() => window.location.href = `/user/learning/${moduleId}`}
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
  allSubtopics: PropTypes.arrayOf(PropTypes.string),
};

export default InterviewFavoriteCard;
