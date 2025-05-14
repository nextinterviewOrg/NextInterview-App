import styled from "styled-components";

export const HintContainer = styled.div`
  background: #f9f9f9;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  width: 350px;
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

// export const HintContent = styled.div`
//   margin-top: 1rem;
// `;

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
  margin-left: auto;
`;

export const HintBox = styled.div`
  background-color: ${({ theme }) => theme.colors.lightgreen};
  border-radius: 6px;
  color: #333;
  font-size: 14px;
  padding: 16px 0;
  // max-width: 400px;
  margin: 0;
  margin-top: 10px;
`;

export const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  // max-width: 600px;
  margin: 0 auto;
`;

export const Arrow = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;



export const HintContent = styled.div`
  flex: 1;
  font-size: 16px;
  padding: 0 10px;
  text-align: center;
  word-break: break-word;
`;
