import styled from "styled-components";
import theme from "../../../../theme/Theme";

export const MarqueeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
  padding: 10px;

  @media (max-width: 1024px) {
    padding: 8px;
  }

  @media (max-width: 768px) {
    padding: 6px;
  }

  @media (max-width: 480px) {
    padding: 4px;
  }
`;

// The track that actually moves
export const MarqueeTrack = styled.div`
  display: flex;
  animation: scroll 15s linear infinite;
  border: none;

  /* Pause animation on hover */
  &:hover {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @media (max-width: 1024px) {
    animation: scroll 12s linear infinite; /* Faster than desktop */
  }

  @media (max-width: 768px) {
    animation: scroll 10s linear infinite; /* Even faster */
  }

  @media (max-width: 480px) {
    animation: scroll 8s linear infinite; /* Fastest on mobile */
  }
`;

export const Card = styled.div`
  flex: 0 0 25%; /* Show 4 cards at a time */
  box-sizing: border-box;
  margin-right: 1rem; /* Add spacing between cards if you want */
  border-radius: 20px;
  background-color: #f8f8f8;
  padding: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-height: 300px;

  @media (max-width: 1024px) {
    flex: 0 0 33.33%; /* 3 cards per row on medium screens */
  }

  @media (max-width: 768px) {
    flex: 0 0 50%; /* 2 cards per row on smaller screens */
  }

  @media (max-width: 480px) {
   flex: 0 0 80%; /* Wider cards on mobile (shows 1.25 cards at a time) */
    min-width: 80%; /* Ensures consistent width */
  }

  /* Basic styling */
  text-align: left;

  /* On hover, slightly scale up and add shadow */
  &:hover {
    transform: scale(1.05);
    background-color: rgb(209, 250, 248);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 700;
  }

  p {
    margin: 20px;
    display: flex;
    justify-content: center;
    font-size: 0.9rem;
  }
`;

export const KnowButton = styled.button`
  color: black;
  background-color: #68c184;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: normal;
  padding: 6px 12px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;
