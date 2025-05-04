
import styled from "styled-components";
export const UserReminderWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;

  .user-reminder-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .reminder-text {
    margin-bottom: 20px;
  }

  .reminder-text-title {
    font-family: "DM Sans";
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 10px;
  }

  .reminder-text-subtitle {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textgray};
  }

  .reminder-text-description {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 10px;
  }

  .reminder-actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .dismiss-button {
    border-radius: 16px;
    border: 1px solid #F5F5F5;
    font-size: 1rem;
    margin-right: 15px;
    cursor: pointer;
    padding: 8px;
    color: ${({ theme }) => theme.colors.error};
    background-color: #F5F5F5;
  }

  .thanks-button {
    display: flex;
    width: 300px;
    align-items: center;
    height: 44px;
    padding: 5px 9px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    border-radius: 16px;
    border: 1px solid white!important;
  }

  // New styles for the "completed" state
  .user-reminder-completed {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
 
    margin-left: 60px;
    gap: 20px;
  }

  .completed-message {
     font-size: 24px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 10px;
  }

  .tick-icon {
    font-size: 50px;
    color: ${({ theme }) => theme.colors.success}; // Use a green color for the checkmark
  }
`;
