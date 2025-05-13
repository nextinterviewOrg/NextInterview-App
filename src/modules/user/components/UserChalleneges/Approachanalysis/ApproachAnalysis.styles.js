// src/components/UserChalleneges/ApproachAnalysis.styles.js

import styled from "styled-components";

export const ApproachContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
`;

export const QuestionCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 1.2rem;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
`;

export const QuestionTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text || "#333"};

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
