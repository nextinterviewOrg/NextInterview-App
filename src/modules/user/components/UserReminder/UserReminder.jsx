import React, { useState, useEffect } from 'react';
import { UserReminderWrapper } from './UserReminder.styles';
import { getCardByUserId, updateStats } from '../../../../api/flashcardApi';
import { getUserByClerkId } from '../../../../api/userApi'; // assuming you have this
import { useUser } from '@clerk/clerk-react';
import { message } from 'antd';

const UserReminder = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;

        setLoading(true);
        const dbUser = await getUserByClerkId(user.id);
        const response = await getCardByUserId(dbUser.data.user?._id);

        if (response.success && Array.isArray(response.data)) {
          // Only keep cards not yet interacted by the user
          const filtered = response.data.filter(card =>
            !card.interacted_users.some(u => u.$oid === dbUser.data.user?._id)
          );
          setFlashcards(filtered);
        } else {
          message.warning("No flashcards available for this user");
          setFlashcards([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        setLoading(false);
        message.error("Failed to load flashcards");
      }
    };

    fetchData();
  }, [user]);

  const handleCardResponse = async (cardId, cardKnow) => {
    try {
      if (!user) {
        message.error("Please sign in to interact with flashcards");
        return;
      }

      message.loading("Saving your response...", 0);

      const dbUser = await getUserByClerkId(user.id);
      await updateStats(cardId, dbUser.data.user?._id, cardKnow);

      // Remove current card
      setFlashcards(prev => prev.filter(card => card._id !== cardId));

      message.destroy();
      message.success("Response submitted successfully!");
    } catch (error) {
      message.destroy();
      console.error("Error details:", error);

      if (error.response?.status === 400) {
        message.error("Invalid request. Please try again.");
      } else if (error.response?.status === 404) {
        message.error("User not found. Please contact support.");
      } else {
        message.error(error.message || "Failed to save your response");
      }
    }
  };

  if (loading) return <div>Loading flashcards...</div>;
  if (!flashcards.length) {
    return (
      <UserReminderWrapper>
        <div className="user-reminder-completed">
          <p className="completed-message">You have completed all the tasks for today!</p>
          <div className="tick-icon">✔</div> {/* Display the checkmark */}
        </div>
      </UserReminderWrapper>
    );
  }
  
  const card = flashcards[0]; // show one at a time

  return (
 <UserReminderWrapper>
      <div className="user-reminder-content-wrapper">
        {flashcards.slice(0, 3).map((card, index) => (
          <div
            key={card._id}
            className="user-reminder-content"
            style={{
              transform: `scale(${1 - index * 0.02}) translateX(${index * 30}px) translateY(${index * 10}px)`,
              zIndex: flashcards.length - index,
              pointerEvents: index === 0 ? 'auto' : 'none',
              opacity: index === 0 ? 1 : 0.6,
            }}
          >
            <div className="reminder-text">
              <p className="reminder-text-description">{card.cardContent}</p>
            </div>
            {index === 0 && (
              <div className="reminder-actions">
                <button className="dismiss-button" onClick={() => handleCardResponse(card._id, false)}>
                  ✖
                </button>
                <button className="thanks-button" onClick={() => handleCardResponse(card._id, true)}>
                  I Know This
                </button>
              </div>
            )}
          </div>
        ))}
 
        {flashcards.length === 0 && (
          <div className="user-reminder-completed">
            <div className="tick-icon">✔</div>
            <div className="completed-message">All caught up!</div>
          </div>
        )}
      </div>
    </UserReminderWrapper>
 
  );
};

export default UserReminder;
