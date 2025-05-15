import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 40px;
`;

export const TabsWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  margin-left: 30px;
`;

export const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.secondary : '#f0f0f0'};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.colors.secondary : '#e0e0e0'};
  }
`;

export const ContentWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
`;
