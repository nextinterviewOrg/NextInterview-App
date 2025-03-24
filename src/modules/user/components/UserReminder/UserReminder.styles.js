import styled from "styled-components";
import theme from "../../../../theme/Theme";


export const MarqueeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
  padding: 10px;
`;

// The track that actually moves
export const MarqueeTrack = styled.div`
  display: flex;
  animation: scroll 15s linear infinite;
  border:none;

  /* Pause animation on hover */
  &:hover {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      /* Because we are duplicating the array once, 
         moving -50% horizontally loops the set seamlessly */
      transform: translateX(-50%);
    }
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

  /* Basic styling */
  text-align: left;

  /* On hover, slightly scale up and add shadow */
  &:hover {
    transform: scale(1.05);
    background-color:rgb(209, 250, 248);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 700;
  }

  p {
    margin: 20px;
    display:flex;
    justify-content: center;

    font-size: 0.9rem;
  }
  
`;