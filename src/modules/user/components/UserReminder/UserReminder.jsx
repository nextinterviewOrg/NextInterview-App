import React, { useState, useEffect } from 'react';
import { UserReminderWrapper, ReminderCard } from './UserReminder.styles';
import { getCardByUserId, updateStats } from '../../../../api/flashcardApi';
import { getUserByClerkId } from '../../../../api/userApi';
import { useUser } from '@clerk/clerk-react';
import { message } from 'antd';

const UserReminder = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardsReviewedToday, setCardsReviewedToday] = useState(0);
  const [lastReviewDate, setLastReviewDate] = useState('');
  const { user } = useUser();

  // Check if it's a new day
  const isNewDay = () => {
    const today = new Date().toLocaleDateString();
    return lastReviewDate !== today;
  };

  // Reset daily counter if it's a new day
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    if (isNewDay()) {
      setCardsReviewedToday(0);
      setLastReviewDate(today);
      localStorage.setItem('lastReviewDate', today);
      localStorage.setItem('cardsReviewedToday', '0');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;

        setLoading(true);
        const dbUser = await getUserByClerkId(user.id);
        
        // Load from localStorage
        const storedDate = localStorage.getItem('lastReviewDate');
        const storedCount = parseInt(localStorage.getItem('cardsReviewedToday') || '0');
        
        if (storedDate === new Date().toLocaleDateString()) {
          setCardsReviewedToday(storedCount);
        }

        const response = await getCardByUserId(dbUser.data.user?._id);

        if (response.success && Array.isArray(response.data)) {
          // Filter cards not yet interacted by the user
          const filtered = response.data.filter(card =>
            !card.interacted_users.some(u => u.$oid === dbUser.data.user?._id)
          );
          
          // Apply daily limit (10 - cardsReviewedToday)
          const dailyLimit = 10 - storedCount;
          const limitedCards = filtered.slice(0, Math.max(0, dailyLimit));
          
          setFlashcards(limitedCards);
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

      if (cardsReviewedToday >= 10) {
        message.warning("You've reached your daily limit of 10 cards");
        return;
      }

      message.loading("Saving your response...", 0);

      const dbUser = await getUserByClerkId(user.id);
      await updateStats(cardId, dbUser.data.user?._id, cardKnow);

      // Update daily counter
      const newCount = cardsReviewedToday + 1;
      setCardsReviewedToday(newCount);
      localStorage.setItem('cardsReviewedToday', newCount.toString());
      localStorage.setItem('lastReviewDate', new Date().toLocaleDateString());

      // Remove current card
      setFlashcards(prev => prev.filter(card => card._id !== cardId));

      message.destroy();
      message.success("Response submitted successfully!");
    } catch (error) {
      message.destroy();
      console.error("Error details:", error);
      message.error(error.message || "Failed to save your response");
    }
  };

  if (loading) return <div>Loading flashcards...</div>;
  
  return (
    <UserReminderWrapper>
      <div className="user-reminder-content-wrapper">
        {flashcards.length > 0 ? (
          flashcards.slice(0, 3).map((card, index) => (
            <ReminderCard key={card._id} index={index} total={flashcards.length}>
              <div className="reminder-text">
                <p className="reminder-text-description">{card.cardContent}</p>
              </div>
              {index === 0 && (
                <div className="reminder-actions">
                  <button 
                    className="dismiss-button" 
                    onClick={() => handleCardResponse(card._id, false)}
                  >
                    ✖
                  </button>
                  <button 
                    className="thanks-button" 
                    onClick={() => handleCardResponse(card._id, true)}
                  >
                    I Know This
                  </button>
                </div>
              )}
            </ReminderCard>
          ))
        ) : (
          <div className="user-reminder-completed">
            <div className="tick-icon">✔</div>
            <div className="completed-message">
              {cardsReviewedToday >= 10 ? 
                "You've completed your 10 cards for today!" : 
                "All caught up!"}
            </div>
          </div>
        )}
        {/* {flashcards.length > 0 && (
          <div className="daily-counter">
            Cards reviewed today: {cardsReviewedToday}/10
          </div>
        )} */}
      </div>
    </UserReminderWrapper>
  );
};

export default UserReminder;