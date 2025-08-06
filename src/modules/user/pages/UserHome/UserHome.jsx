import React, { useEffect, useState } from "react";
import {
  UserHomeWrapper,
  InterviewFavoriteCardContainer,
  ArrowButton,
} from "./UserHome.styles";
import TakeChallenge from "../../components/UserChalleneges/TakeChallenge";
import UserReminder from "../../components/UserReminder/UserReminder";
import InterviewFavoriteCard from "../../components/InterviewFavoriteCard/InterviewFavoriteCard";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { getInterviewFavourites } from "../../../../api/aiMockInterviewApi";

export default function UserHome() {
  const [interviewFavoriteCardData, setInterviewFavoriteCardData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(4); // default

  // 👇 Adjust cardsToShow based on screen width
  const updateCardsToShow = () => {
    const width = window.innerWidth;
    if (width > 1280) setCardsToShow(4);
    else if (width > 1024) setCardsToShow(3);
    else if (width > 576) setCardsToShow(2);
    else setCardsToShow(1);
  };

  useEffect(() => {
    updateCardsToShow(); // initial check
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  // 👇 Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [cardsToShow, interviewFavoriteCardData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInterviewFavourites();
        const preparedData = response.flatMap((module) =>
          (module.topicData || []).map((topic) => ({
            topicName: topic.topicName,
            moduleName: module.moduleName,
            moduleId: module.moduleId,
            imgSrc: module.imageURL,
            allSubtopics: (topic.subtopicData || []).map((s) => s.subtopicName),
          }))
        );
        setInterviewFavoriteCardData(preparedData);
      } catch (e) {
        console.error("Error fetching interview favorites:", e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const endIndex = startIndex + cardsToShow;
    const visibleCardsData = interviewFavoriteCardData.slice(
      startIndex,
      endIndex
    );
    setVisibleCards(visibleCardsData);
  }, [startIndex, interviewFavoriteCardData, cardsToShow]);

  const handleNext = () => {
    if (interviewFavoriteCardData.length === 0) return;
    setStartIndex((prev) =>
      (prev + cardsToShow) % interviewFavoriteCardData.length
    );
  };

  const handlePrev = () => {
    if (interviewFavoriteCardData.length === 0) return;
    setStartIndex((prev) =>
      (prev - cardsToShow + interviewFavoriteCardData.length) %
      interviewFavoriteCardData.length
    );
  };

  return (
    <UserHomeWrapper>
      <div className="userHomerowOne">
        <TakeChallenge />
      </div>

      <div className="reminderContainer">
        <UserReminder />
      </div>

      <div className="interviewFav-container">
        <div className="interviewFav-title">
          <h3>Interview Favourites</h3>
        </div>

        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <ArrowButton onClick={handlePrev}>
            <FaAngleLeft />
          </ArrowButton>

          <InterviewFavoriteCardContainer>
            {visibleCards.length === 0 ? (
              <p>No interview favourites found.</p>
            ) : (
              visibleCards.map((card, index) => (
                <InterviewFavoriteCard
                  key={`${startIndex}-${index}`}
                  title={card.moduleName}
                  topicName={card.topicName}
                  moduleId={card.moduleId}
                  imgSrc={card.imgSrc}
                  allSubtopics={card.allSubtopics}
                />
              ))
            )}
          </InterviewFavoriteCardContainer>

          <ArrowButton onClick={handleNext}>
            <FaAngleRight />
          </ArrowButton>
        </div>
      </div>
    </UserHomeWrapper>
  );
}
