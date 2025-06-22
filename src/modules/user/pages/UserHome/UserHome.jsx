
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

  useEffect(() => {

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {

    const apiCaller = async () => {
      try {


        const responeData = await getInterviewFavourites();


        const preparedData = responeData.map((item) => ({
          title: item.moduleName,
          description: "Learn how to enhance system efficiency and responsiveness.",
          topics: item.topicName,
          //   duration: "2 to 3 hrs",
          //   imgSrc: [
          //     "https://th.bing.com/th/id/OIP.hfNK8S7ywtaPVr8WGTV4-wHaE7?rs=1&pid=ImgDetMain",
          //     "https://th.bing.com/th/id/OIP.hfNK8S7ywtaPVr8WGTV4-wHaE7?rs=1&pid=ImgDetMain",
          //     "https://th.bing.com/th/id/OIP.hfNK8S7ywtaPVr8WGTV4-wHaE7?rs=1&pid=ImgDetMain",
          //   ],
          moduleId: item.moduleId,
          imgSrc: item.imageURL
        })
        );
        console.log("preparedData", preparedData);
        setInterviewFavoriteCardData(preparedData);
      } catch (e) {
        console.log(e);
      }
    };
    apiCaller();
  }, [])
  useEffect(() => {
    const visibleCardsData = interviewFavoriteCardData.filter(
      (_, index) => index >= startIndex && index < startIndex + 4
    );
    console.log("visibleCardsDatavhhvhvhg", visibleCardsData);

    setVisibleCards(visibleCardsData);
  }, [startIndex, interviewFavoriteCardData]);

const handleNext = () => {
    if (interviewFavoriteCardData.length === 0) return;
    setStartIndex(prev => (prev + 1) % interviewFavoriteCardData.length);
  };

  const handlePrev = () => {
    if (interviewFavoriteCardData.length === 0) return;
    setStartIndex(prev => 
      (prev - 1 + interviewFavoriteCardData.length) % interviewFavoriteCardData.length
    );
  };

  const getVisibleCards = () => {
    console.log("interviewFavoriteCardData", interviewFavoriteCardData);
    if (interviewFavoriteCardData.length < 4) return interviewFavoriteCardData;
    return Array.from({ length: 4 }, (_, i) => {
      const index = (startIndex + i) % interviewFavoriteCardData.length;
      return interviewFavoriteCardData[index];
    });
  };

  // const visibleCards = getVisibleCards();
  console.log("visibleCards", visibleCards);

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
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowButton onClick={handlePrev}>
            <FaAngleLeft />
          </ArrowButton>
          <InterviewFavoriteCardContainer>
            {visibleCards.length > 0 &&
              visibleCards.map((cardData, index) =>{ 
                console.log("carn sndnbnbdData", cardData);
                return(
                <InterviewFavoriteCard
                  key={`${startIndex}-${index}`}
                  title={cardData?.title}
                  // description={cardData.description}
                  topics={cardData?.topics}
                  // duration={cardData.duration}
                  imgSrc={cardData?.imgSrc}
                  moduleId={cardData?.moduleId}
                />
              )})}
          </InterviewFavoriteCardContainer>
          <ArrowButton onClick={handleNext}>
            <FaAngleRight />
          </ArrowButton>
        </div>
      </div>
    </UserHomeWrapper>
  );
}
