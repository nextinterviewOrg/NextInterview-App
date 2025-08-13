import styled from "styled-components";
 
export const Container = styled.div`
  padding: 20px;
  /* font-family: ${({ theme }) => theme.fonts.body}; */
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.light};
  @media (max-width: 768px) {
    margin-left: 0px;
  }
`;
 
export const NotificationCard = styled.div`
  background: ${({ theme }) => theme.colors.light};
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  // position: relative;
  width: 90%;
  margin-left: 2px;
  gap: 10px;
 
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
 
  @media (max-width: 768px) {
    width: 90%;
  }
  @media (max-width: 480px) {
    width: 90%;
  }
`;
 
export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
 
  p {
    margin: 0;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textgray};
  }
`;
 
export const ToggleSwitch = styled.div`
  width: 40px;
  height: 20px;
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.bluetext : theme.colors.sidebarHoverBgColor};
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
 
  &:before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    top: 2px;
    left: ${({ isActive }) => (isActive ? "22px" : "2px")};
    transition: left 0.2s;
  }
`;
 
 
export const NotificationBody = styled.div`
  padding: 15px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.textgray};
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 170px;

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }

  @media (max-width: 1300px) {
    width: 100%;
    height: 250px;
  }

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }
 
  p {
    margin: 0;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textgray};
     display: -webkit-box;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
 
    &.highlight {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.textgray};
    }
 
    &.small-text {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.textgray};
    }
  }
`;
 
export const ActionButton = styled.button`
  background: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.textgray};
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
 
  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
 
  svg {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text};
  }
`;
 
export const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.light};
  background: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  //   width: 20%;
  float: right;
  display: flex;
  margin-left: auto; /* Ensures it aligns to the right */
  //   justify-content: flex-end;
 
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
 
export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const NotificationContainer = styled.div`
  /* font-family: ${({ theme }) => theme.fonts.body}; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.light};
 
  .bellicon {
    height: 200px;
    width: 200px;
  }
 
  .nonotifications {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.textgray};
    margin: 0;
  }
`;
 
export const CreatedNotification = styled.div`
  margin-left: 40px;
 
  .createButton {
    display: flex;
    justify-content: flex-end;
  }
`;
 
 