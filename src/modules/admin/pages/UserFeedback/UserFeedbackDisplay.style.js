import styled from 'styled-components';

export const Container = styled.div`
margin-left: 60px;
margin-right: 60px;

@media (max-width: 768px) {
  margin-left: 0px;
  margin-right: 0px;
}

`;
export const TableContainer = styled.div`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.body};
 
 
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  background-color: ${({ theme }) => theme.colors.lightgreen};
  padding: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.sidebarTextColor};
`;

export const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  background-color: ${({ theme }) => theme.colors.lightgreen};
  margin: 12px 0;
  border-radius: 12px;
  padding: 20px;
  align-items: center;
`;

export const ModuleName = styled.div`
  color: ${({ theme }) => theme.colors.textgray};
  font-size: 14px;
`;

export const AvgRating = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

export const RatingStars = styled.div`
  margin-left: 8px;
`;

export const Star = styled.span`
  color: ${({ theme, filled }) => filled ? theme.colors.warning : theme.colors.backgray};
  font-size: 18px;
`;

export const UserCount = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 22px;
  font-weight: 400;
  text-align: left;
  margin-left: 40px;
`;
