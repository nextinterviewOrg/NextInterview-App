import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { MarqueeContainer, MarqueeTrack, Card } from "./UserReminder.styles";
import { getFlashcards, updateStats, getCardByUserId } from "../../../../api/flashcardApi";
import { ShimmerPostList } from "react-shimmer-effects";
import { getUserByClerkId } from "../../../../api/userApi";
import { message } from "antd";

const MarqueeCards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answeredCards, setAnsweredCards] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;
        
        setLoading(true);
        
        const dbUser = await getUserByClerkId(user.id);
        const response = await getCardByUserId(dbUser.data.user?._id);
        
        console.log("API Response:", response); // Debug log
        
        // Handle the response structure properly
        if (response.success && Array.isArray(response.data)) {
          setFlashcards(response.data);
        } else {
          setFlashcards([]);
          message.warning("No flashcards available for this user");
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        setLoading(false);
        message.error("Failed to load flashcards");
      }
    };

    fetchData();
  }, [user]); // Add user as dependency to refetch when user changes

  const handleCardResponse = async (cardId, cardKnow) => {
    try {
      if (!user) {
        message.error("Please sign in to interact with flashcards");
        return;
      }
  
      // Show loading state
      message.loading("Saving your response...", 0);
      
      const dbUser = await getUserByClerkId(user.id);
      
      const data = await updateStats(
        cardId,
        dbUser.data.user?._id,
        cardKnow
      );
      
      setAnsweredCards(prev => [...prev, cardId]);
      setFlashcards(prev => prev.filter(card => card._id !== cardId));
      
      message.destroy();
      message.success("Response recorded successfully!");
  
    } catch (error) {
      message.destroy();
      console.error("Error details:", error);
      
      if (error.response?.status === 400) {
        message.error("Invalid request. Please try again.");
      } else if (error.response?.status === 404) {
        message.error("User not found. Please contact support.", error);
      } else {
        message.error(error.message || "Failed to save your response");
      }
    }
  };

  if (!Array.isArray(flashcards)) {
    return <div>No flashcards available</div>;
  }

  const activeFlashcards = flashcards.filter(card => !answeredCards.includes(card._id));
  const doubleFlashcards = [...activeFlashcards, ...activeFlashcards.map(card => ({
    ...card,
    uniqueKey: `${card._id}-${Math.random().toString(36).substr(2, 9)}`
  }))];

  return (
    <MarqueeContainer>
      <MarqueeTrack>
        {doubleFlashcards.map((card) => {
          const uniqueKey = card.uniqueKey || card._id;
          
          if (loading) {
            return (
              <Card key={`shimmer-${uniqueKey}`}>
                <ShimmerPostList count={1} style={{ width: '100%', height: '160px' }} />
              </Card>
            );
          }

          const dateObj = new Date(card.createdAt);
          const formattedDate = dateObj.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }).replace(/\//g, '-');

          return (
            <Card key={uniqueKey}>
              <img
                src={card.backgroundImage}
                alt={card.cardContent}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p>{card.cardContent}</p>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "10px",
                padding: "0 10px",
              }}>
                <button
                  style={{
                    color: "black",
                    backgroundColor: "#68c184",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "normal",
                    padding: "6px 12px",
                  }}
                  onClick={() => handleCardResponse(card._id, true)}
                >
                  I know this
                </button>

                <p style={{ margin: "0 12px", fontWeight: "normal" }}>
                  {formattedDate}
                </p>

                <button
                  style={{
                    color: "black",
                    backgroundColor: "#FFEBEB",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "normal",
                    padding: "6px 12px",
                  }}
                  onClick={() => handleCardResponse(card._id, false)}
                >
                  I don't know
                </button>
              </div>
            </Card>
          );
        })}
      </MarqueeTrack>
    </MarqueeContainer>
  );
};

export default MarqueeCards;