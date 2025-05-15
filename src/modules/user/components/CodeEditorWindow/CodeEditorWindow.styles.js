import styled from 'styled-components';
import theme from '../../../../theme/Theme';
export const Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  margin-left: 40px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;
 
export const Title = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
`;
 
export const QuestionBox = styled.div`
  background-color: ${({ theme }) => theme.colors.lightgreen};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 16px;
  line-height: 1.6;
  color: #444;
  width: 40%;
`;
 
export const EditorContainer = styled.div`
  width: 100%;
  height: 800px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #1e1e1e;
  border: 2px solid #2c2c2c;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
 
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;
 
export const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
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
 
export const Button = styled.button`
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
 
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`