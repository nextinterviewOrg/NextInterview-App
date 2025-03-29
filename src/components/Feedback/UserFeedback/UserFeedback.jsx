import { useState } from "react";
import PropTypes from "prop-types";
import { FaTimes, FaStar } from "react-icons/fa";
import "./UserFeedback.css";

const UserFeedback = ({ onFeedbackSubmit, moduleId }) => {
  UserFeedback.propTypes = {
    onFeedbackSubmit: PropTypes.func.isRequired,
    moduleId: PropTypes.string.isRequired,
  };
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please provide a rating");
      return;
    }
    onFeedbackSubmit({
      feedback,
      rating,
      moduleId,
      timestamp: new Date().toISOString()
    });
    setFeedback("");
    setRating(0);
    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-feedback">
      <button 
        onClick={toggleModal}
        className="feedback-button"
      >
        Give Feedback
      </button>
      
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <button onClick={toggleModal} className="close-button">
                <FaTimes />
              </button>
            </div>
            
            <p className="feedback-question">How would you rate this module?</p>
            
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`star ${star <= (hoverRating || rating) ? "active" : ""}`}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>

            <p className="feedback-question">Any additional feedback?</p>
            
            <form onSubmit={handleSubmit}>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="feedback-textarea"
                rows="4"
                placeholder="Your feedback..."
                required
              />
              
              <button 
                type="submit" 
                className="submit-button"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFeedback;
