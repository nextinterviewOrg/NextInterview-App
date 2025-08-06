import styled from 'styled-components';

export const Container = styled.div`
  padding: 12px;
  margin-left: 40px;
  width: 95%;

  @media (max-width: 480px) {
    width: 93%;
    margin-left: 5px;
  }
`;


export const QuestionCard = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  margin-bottom: 12px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  // box-shadow: 0 1px 4px rgba(0,0,0,0.1);

  @media (max-width: 1360px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px 4px;
    width: 97%
  }
`;

export const Icon = styled.div`
  font-size: 24px;
  margin-right: 16px;
  margin-top: 4px;
  background-color: #f0f0f0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1360px) {
    font-size: 20px;
    width: 32px;
    height: 32px;
    margin-top: 6px;
  }
`;

export const Content = styled.div`
  flex: 1;
    cursor: pointer;
`;

export const TagsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
`;

export const Tag = styled.span`
  background-color: ${({ difficulty }) => {
    if (difficulty === 'Easy') return '#d4edda';
    if (difficulty === 'Medium') return '#fff3cd';
    if (difficulty === 'Hard') return '#f8d7da';
    return '#e2e3e5';
  }};
  color: #333;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 6px;

  @media (max-width: 1360px) {
    font-size: 10px;
    padding: 2px 4px;
  }
`;

export const Title = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #333;

  @media (max-width: 1360px) {
    font-size: 13px;
    width: 90%;
  }
`;
