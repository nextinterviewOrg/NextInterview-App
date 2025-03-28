import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import "./UserFeedback.styles.css"; // Assuming a CSS file for styles

const UserFeedback = ({ onFeedbackSubmit }) => {
  // PropTypes validation
  UserFeedback.propTypes = {
    onFeedbackSubmit: PropTypes.func.isRequired, // Validate onFeedbackSubmit prop
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleFeedbackSubmit = () => {
    const feedback = document.querySelector("textarea").value;
    onFeedbackSubmit(feedback);
    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>Give Feedback</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h2>User Feedback</h2>
            <p>Please provide your feedback below:</p>
            <textarea
              rows="4"
              cols="50"
              placeholder="Your feedback..."
            ></textarea>
            <button onClick={handleFeedbackSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFeedback;
