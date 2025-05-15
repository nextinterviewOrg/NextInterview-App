// TIYCodingDetailPage.styles.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 40px 60px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #444;
`;

export const Divider = styled.hr`
  margin: 24px 0;
  border: none;
  border-top: 1px solid #eee;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const TopicsList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 32px;
`;

export const TopicItem = styled.li`
  font-size: 16px;
  margin-bottom: 6px;
`;

export const TryButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #007c91;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background-color: #005f6b;
  }
`;
export const BackIcon = styled.div`
  top: 20px;
  left: 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  font-size: 16px;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;