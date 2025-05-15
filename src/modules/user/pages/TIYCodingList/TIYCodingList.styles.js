// TIYCodingList.styles.js
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 30px 60px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #eee;
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Badge = styled.div`
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  background-color: #e0f0ff;
  color: #007bff;
  border-radius: 4px;
  font-weight: 600;
  width: fit-content;
`;

export const MainText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const SubText = styled.div`
  font-size: 14px;
  color: #666;
`;

export const Status = styled.div`
  padding: 4px 12px;
  background-color: ${({ status }) =>
    status==='not attempted'  ? '#ffe6e6' : '#e6f4ea'};
  color: ${({ status }) =>
    status==='not attempted' ? '#d93025' : '#188038'};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  align-self: center;
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