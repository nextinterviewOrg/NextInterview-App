import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosconfig";
import { getUserBySessionId, getUserByClerkId } from "../../../api/userApi";
import { useUser } from "@clerk/clerk-react";
import "./UserFeedback.css";
import { addModuleFeedback } from "../../../api/moduleFeedbackApi";

const UserFeedback = ({ moduleId, onFeedbackSubmitted, autoOpen,feedbackOrder ,closeModel,returnUrl}) => {
  const { user, sessionId } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(autoOpen);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mongoUserId, setMongoUserId] = useState(null);
  

  // Get user ID when component mounts
  // useEffect(() => {
  //   const fetchUserId = async () => {
  //     try {
  //       // Get session ID
  //       const sessions = await user?.getSessions();
  //       const sessionVar = sessionId || 
  //         (sessions && sessions.length > 0 ? sessions[0].id : null) || 
  //         JSON.parse(localStorage.getItem("sessionId"));

  //       if (!sessionVar) {
  //         setIsLoading(false);
  //         return;
  //       }

  //       // Get user ID from session
  //       const sessionResponse = await getUserBySessionId({ sessionId: sessionVar });
  //       const clerkUserId = sessionResponse.userId;

  //       if (!clerkUserId) {
  //         setIsLoading(false);
  //         return;
  //       }

  //       // Get the MongoDB user ID
  //       const userResponse = await getUserByClerkId(clerkUserId);
  //       if (!userResponse || !userResponse.data || !userResponse.data.user) {
  //         setIsLoading(false);
  //         return;
  //       }

  //       const userId = userResponse.data.user._id;
  //       setMongoUserId(userId);
        
  //       // Check if feedback exists for this user and module
  //       if (userId && moduleId) {
  //         try {
  //           const response = await api.get(`/feedback/user/${userId}/module/${moduleId}`);
            
  //           if (response.data && response.data.data && response.data.data.length > 0) {
  //             setHasSubmitted(true);
  //             setSuccessMessage("You have already submitted feedback for this module.");
  //           }
  //         } catch (err) {
  //           console.error("Error checking previous feedback:", err);
  //         }
  //       }
  //     } catch (err) {
  //       console.error("Error fetching user ID:", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (moduleId) {
  //     fetchUserId();
  //   }
  // }, [moduleId, user, sessionId]);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleCloseModal = () => {
    closeModel();
    if (returnUrl) {
      navigate(returnUrl);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    

    try {
      // Submit feedback
      // await api.post("/feedback", {
      //   userId: mongoUserId,
      //   moduleId,
      //   rating,
      //   feedback,
      // });
      const userData= await getUserByClerkId(user.id);

     
      const data=  await addModuleFeedback({
        userId: userData.data.user._id,
        moduleId,
        rating,
        feedback,
        feedback_order:feedbackOrder
      })

      // Show success message and mark as submitted
      setSuccessMessage("Feedback submitted successfully!");
      setHasSubmitted(true);
      setRating(0);
      setFeedback("");
      if (onFeedbackSubmitted) onFeedbackSubmitted();

    } catch (err) {
      console.error("Error submitting feedback:", err);
      if (err.response && err.response.status === 400 && 
          err.response.data && err.response.data.message === "Feedback has already been submitted for this module") {
        setHasSubmitted(true);
        setSuccessMessage("You have already submitted feedback for this module.");
      } else {
        setError(err.response?.data?.message || err.message || "Error submitting feedback");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setRating(0);
      setFeedback("");
      setError(null);
    }
  };

  const dismissSuccessMessage = () => {
    setSuccessMessage("");
    setHasSubmitted(false);
    setIsModalOpen(false); // Close the entire modal when dismissed
    closeModel();
    // Navigate back to the lesson
    if (returnUrl) {
      navigate(returnUrl);
      return;
    }
  };

  useEffect(() => {
    if (autoOpen) {
      setIsModalOpen(true);
    }
  }, [autoOpen]);

  return (
    <div className="feedback-container">
      {/* <button className="feedback-button" onClick={toggleModal}>
        Provide Feedback
      </button> */}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Module Feedback</h2>
              <button className="close-button" onClick={dismissSuccessMessage}>×</button>
            </div>
            
            {isLoading ? (
              <div className="loading-message">Loading...</div>
            ) : hasSubmitted ? (
              <div className="success-message-container">
                <div className="success-icon">✓</div>
                <p className="success-text">{successMessage || "Feedback has already been submitted."}</p>
                <button className="dismiss-button" onClick={dismissSuccessMessage}>
                  Return to Lessons
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="feedback-form">
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      key={value}
                      className={`star ${rating >= value ? "active" : ""}`}
                      onClick={() => handleRatingClick(value)}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts about this module..."
                  required
                  className="feedback-textarea"
                  maxLength={500}
                />

                {error && <div className="error-message">{error}</div>}

                <div className="button-group">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={()=>{toggleModal();handleCloseModal();}}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting || rating === 0}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

UserFeedback.propTypes = {
  moduleId: PropTypes.string.isRequired,
  onFeedbackSubmitted: PropTypes.func,
  autoOpen: PropTypes.bool,
};

UserFeedback.defaultProps = {
  autoOpen: false,
};

export default UserFeedback;
