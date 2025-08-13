import styled from 'styled-components';

export const Container = styled.div`
  // padding: 24px;
  margin: 0;
  width: 98%;


  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
  margin-top: 0px;

  @media (max-width: 1360px) {
  gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

export const FilterButton = styled.button`
  background-color: ${({ active }) => (active ? '#333' : '#f0f0f0')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  padding: 10px 25px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #2290ac90;
  }

  @media (max-width: 1360px) {
    padding: 8px 16px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

export const FilterIcon = styled.span`
  margin-right: 8px;
  background-color: #2290ac;
  color: #fff;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1360px) {
    padding: 8px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 14px;
  }
`; 

export const ApplyFilter = styled.button`
  padding: 8px 20px;
  border-radius: 6px;
  border: ${({ variant }) => (variant === 'clear' ? 'none' : '1px solid #2290ac')};
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ variant }) => (variant === 'clear' ? 'transparent' : '#2290ac')};
  color: ${({ variant }) => (variant === 'clear' ? '#2290ac' : '#fff')};
  font-weight: ${({ variant }) => (variant === 'clear' ? '500' : '600')};

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'clear' ? 'rgba(90, 136, 148, 0.1)' : '#1a7c94'};
  }

  @media (max-width: 1360px) {
    padding: 6px 16px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 10px;
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
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 24px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 16px;
  z-index: 100;
  width: 280px;
  overflow-y: auto;
  max-height: 700px;

  @media (max-width: 1360px) {
    top: 85px;
    right: 16px;
    width: 250px;
    padding: 12px;
  }

  @media (max-width: 768px) {
    top: 90px;
    right: 8px;
    padding: 8px;
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-right: 8px;

  @media (max-width: 1360px) {
    padding: 4px 8px;
  }
`;

export const CloseFilterButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const FilterSection = styled.div`
  margin-top: 16px;
`;

export const SubText = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;

  @media (max-width: 1360px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 4px 0;
  font-size: 14px;
  cursor: pointer;

  input {
    margin-right: 8px;
  }

  @media (max-width: 1360px) {
    font-size: 12px;
  }
`;

export const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  padding: 10px;
`;

export const PageButton = styled.button`
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #2290ac;
  color: #2290ac;
  font-weight: 700;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:disabled {
    background-color: #ccc;
    color: #666;
    border: 1px solid #666;
    cursor: not-allowed;
  }
  
  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const PageInfo = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
