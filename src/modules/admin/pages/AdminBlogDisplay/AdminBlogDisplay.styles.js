import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 60px;
`;

export const ImageContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  height: 600px;
  border-radius: 10px;
  width: 100%; /* Ensure container takes full width */
`;

export const Image = styled.img`
border-radius: 10px;
  width: 100%; /* Ensures the image fills the container */
  height: auto; /* Keeps the aspect ratio intact */
  object-fit: cover; /* Optionally use this to maintain aspect ratio while filling the container */
`;

export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
  `;

  export const Content = styled.p`
  font-size: 18px;
  line-height: 1.5;
  color: black;
  font-weight: 400;
  font-family: "DM Sans";
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;