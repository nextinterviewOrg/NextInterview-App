import styled from "styled-components";
import theme from "../../../../theme/Theme";
export const PageContainer = styled.div`
  display: flex;
  // width: 100%;
  margin-left: 60px;
  // flex-direction: row;

  @media (max-width: 1024px) {
    margin-left: 0;
  }
    @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Sidebar = styled.div`
  position: fixed;
  left: ${({ isOpen }) => isOpen ? '0' : '-100%'};
  top: 0;
  width: ${({ isMobile }) => isMobile ? '80%' : '20%'};
  height: 100vh;
  background: white;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  transition: left 0.3s ease;
  z-index: 1000;
  padding-top: 20px;
  box-shadow: ${({ isOpen }) => isOpen ? '2px 0 10px rgba(0,0,0,0.1)' : 'none'};

  // @media (max-width: 768px) {
  //   position: fixed;
  //   left: 0;
  //   top: 0;
  //   height: 100vh;
  //   z-index: 1000;
  //   width: ${({ isCollapsed }) => isCollapsed ? '0' : '80%'};
  //   border-right: ${({ isCollapsed }) => isCollapsed ? 'none' : '1px solid #ddd'};
  //   overflow: ${({ isCollapsed }) => isCollapsed ? 'hidden' : 'auto'};
  // }
`;

export const ToggleButton = styled.button`
  position: fixed;
  left: ${({ isOpen }) => isOpen ? 'calc(20% + 5px)' : '0'};
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 50px;
  background: white;
  border: 1px solid #ddd;
  border-left: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  transition: left 0.3s ease;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);

  &:hover {
    background: #f5f5f5;
  }

  @media (max-width: 768px) {
    left: ${({ isOpen }) => isOpen ? 'calc(80% + 5px)' : '0'};
  }
`;

export const QuestionItem = styled.div`
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: #f5f5f5;
  }
`;
export const Content = styled.div`
  width: 80%;
  padding: 20px;
`;

export const QuestionHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  background: ${theme.colors.lightgreen};
  border-radius: 5px;

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
  font-size: 14px;
}
`;

export const Option = styled.label`
  display: block;
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  accent-color: ${theme.colors.bluetext};

  &:hover {
    background: #f9f9f9;
  }
`;

export const QuestionContainer = styled.div`
  // padding: 15px;
  margin-top: 15px;
  border: 1px solid ${theme.colors.lightgreen};
  border-radius: 10px;
`;

export const AnswerContainer = styled.div`
  // padding: 15px;
  margin-top: 15px;
  border: 1px solid ${theme.colors.lightgreen};
`;

export const Answer = styled.div`
  // padding: 15px;
  margin-top: 15px;
  border: 1px solid ${theme.colors.lightgreen};
`;

// Styled Components
export const Button = styled.button`
  margin-top: 15px;
  padding: 10px;
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.light};
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 20px;

  &:hover {
    background-color: ${theme.colors.secondary};
  }

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const FeedbackBox = styled.div`
  margin-top: 20px;
  padding: 10px;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  border-radius: 5px;
  background-color: ${(props) =>
    props.correct ? `${theme.colors.lightgreen}` : "#fdecea"};
  color: ${(props) =>
    props.correct ? `${theme.colors.text}` : `{theme.colors.text}`};
  display: flex;
  align-items: center;
  margin: auto;
  justify-content: center;

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Icon = styled.span`
  font-size: 18px;
  margin-right: 8px;
`;

export const SolutionBox = styled.div`
  margin-top: 10px;
  padding: 15px;
  border: 1px solid ${theme.colors.secondary};
  background-color: ${theme.colors.light};
  border-radius: 8px;

  .correction {
    font-size: 18px;
    margin-right: 8px;
    cursor: pointer;
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 10px;

    @media (max-width: 1024px) {
      font-size: 14px;
    }

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  .thumbsup {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 5px;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const NextButton = styled(Button)`
  padding: 10px 20px;
  margin-top: 15px;
  color: ${theme.colors.light};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  font-family: ${({ theme }) => theme.fonts.body};
  background-color: ${theme.colors.secondary};
  &:hover {
    background-color: ${theme.colors.secondary};
  }

  @media (max-width: 1024px) {
    font-size: 12px;
    padding: 8px 16px;
  }
`;

export const MetaInfo1 = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textgray};
  font-family: ${({ theme }) => theme.fonts.body};

  @media (max-width: 1024px) {
    font-size: 12px;
  }
    @media (max-width: 768px) {
    display:flex;
    flex-direction:column;
  }
`;

export const Topic1 = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textgray};
  margin-right: 8px;
  padding: 4px;
  line-height: 20px;
`;

export const Difficulty1 = styled.span`
  padding: 4px 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textgray};
  margin-right: 8px;
  padding: 4px;
  border-radius: 12px;
  line-height: 20px;
`;

export const Type1 = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.graytext};
  margin-right: 8px;
  padding: 4px;
  line-height: 20px;
`;

export const Companies1 = styled.span`
  font-size: 14px;
  margin-top: 4px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  padding: 4px;
  line-height: 20px;
`;


