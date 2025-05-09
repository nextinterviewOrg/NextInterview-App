import styled from "styled-components";

export const HintContainer = styled.div`
  background: #f9f9f9;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  width: 300px;
`;

export const HintTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
`;

export const DropdownIcon = styled.div`
  font-size: 1.2rem;
`;

export const HintContent = styled.div`
  margin-top: 1rem;
`;

export const HintDescription = styled.div`
  font-size: 14px;
  color: #555;
  p {
    margin-top: 0.3rem;
  }
`;

export const HintButton = styled.button`
  margin-top: 0.5rem;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
`;

export const HintBox = styled.div`
  margin-top: 10px;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.lightgreen};
  border-radius: 6px;
  color: #333;
  font-size: 14px;
  line-height: 1.4;
`;
