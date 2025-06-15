import styled from "styled-components";

export const UserSubscriptionInfoWrapper1 = styled.div`
  .subscription-container2 {
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    margin-top: 20px;
  }

  .subscription-title {
    font-family: "DM Sans", sans-serif;
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 15px;
  }

  .subscription-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .detail-item {
    display: flex;
    font-size: 16px;
  }

  .detail-item-title {
    font-family: "DM Sans", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    flex: 40%;
    color: ${({ theme }) => theme.colors.textgray};
  }

  .detail-item-value {
    font-family: "DM Sans", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.black};
    flex: 60%;
  }

  .subscription-upgrade-btn {
    display: flex;
    justify-content: flex-end;
  }

  .upgrade-button {
    width: 122px;
    height: fit-content;
    background: ${({ theme }) => theme.colors.secondary};
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.info};
    }
  }

  @media (max-width: 768px) {
    margin-left: 0;

    .subscription-container2 {
      margin-left: 0;
      padding: 16px;
    }
  }
`;