import styled from 'styled-components';
 
// Page Container
export const Container = styled.div`
  width: 95%;
  margin-left: 50px;
  padding: 10px 0px;
  font-family: Arial, sans-serif;
 
  @media (max-width: 768px) {
    margin-left: 0px;
    width: 100%;
  }
`;
 
// Tab Navigation
export const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  background: ${(props) => props.theme.colors.sidebarBgColor};
 
`;
 
export const Tab = styled.button`
  border: none;
  cursor: pointer;
  font-weight: 200;
  font-size: 16px;
    color: ${({ active }) => (active ? "#2290AC" : "#000")};
    border-bottom: 2px solid ${({ active }) => (active ? "#2290AC" : "none")};
    padding: 10px;
background: none;
`;
 
 
 
 
 
 