import React, { useEffect, useState } from "react";
import { MarqueeContainer, MarqueeTrack, Card } from "./UserReminder.styles";
import { getFlashcards } from "../../../../api/flashcardApi"; 
import { ShimmerPostList } from "react-shimmer-effects";

const MarqueeCards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getFlashcards();
        setFlashcards(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        setLoading(false); // ensure loading is false even on error
      }
    };

    fetchData();
  }, []);

  if (!Array.isArray(flashcards)) {
    return <div>No flashcards available</div>;
  }

  const doubleFlashcards = [...flashcards, ...flashcards];

  return (
    <MarqueeContainer>
      <MarqueeTrack>
        {doubleFlashcards.map((card, idx) => {
          // If loading, apply shimmer effect on individual card
          if (loading) {
            return (
              <Card key={idx}>
                <ShimmerPostList count={1} style={{ width: '100%', height: '160px' }} />
              </Card>
            );
          }

          // Format the createdAt date (DD-MM-YYYY)
          const dateObj = new Date(card.createdAt);
          const day = String(dateObj.getDate()).padStart(2, "0");
          const month = String(dateObj.getMonth() + 1).padStart(2, "0");
          const year = dateObj.getFullYear();
          const createdAtFormatted = `${day}-${month}-${year}`;

          return (
            <Card key={idx}>
              <img
                src={card.backgroundImage}
                alt={card.cardContent}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  display: "flex",
                  borderRadius: "8px",
                }}
              />
              <p>{card.cardContent}</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  marginTop: "10px",
                  padding: "0 10px",
                }}
              >
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
                >
                  I know this
                </button>

                <p
                  style={{
                    margin: "0 12px", // Just a little space around date
                    fontWeight: "normal",
                  }}
                >
                  {createdAtFormatted}
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
