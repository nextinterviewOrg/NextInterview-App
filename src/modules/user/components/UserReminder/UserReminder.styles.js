import styled from 'styled-components';
 
export const UserReminderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
  position: relative;
 
  .user-reminder-content-wrapper {
    position: relative;
    width: 700px;
    height: 260px;
  }
 
  
  .reminder-text {
    margin-bottom: 30px;
    text-align: justify;
  }
 
  .reminder-text-description {
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
    line-height: 1.6;
  }
 
  .reminder-actions {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    width: 100%;
  }
 
  .dismiss-button {
    background: #fff;
    border: 1px solid #e0e0e0;
    color: #333;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
 
    &:hover {
      background: #f8f8f8;
    }
  }
 
  .thanks-button {
    background: #00b894;
    color: white;
    border: none;
    border-radius: 24px;
    padding: 12px 30px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
 
    &:hover {
      background: #019874;
    }
  }
 
  .user-reminder-completed {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    background: #fdfcfb;
    border-radius: 16px;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
    width: 500px;
    margin-top: 10px;
  }
 
  .completed-message {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 20px;
  }
 
  .tick-icon {
    font-size: 60px;
    color: ${({ theme }) => theme.colors.success};
  }
`;

export const ReminderCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 180px;
  background: #fdfcfb;
  border-radius: 16px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.3);
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  ${({ index, total }) => `
    transform: scale(${1 - index * 0.02}) translateX(${index * 30}px) translateY(${index * 10}px);
    z-index: ${total - index};
    pointer-events: ${index === 0 ? 'auto' : 'none'};
    opacity: ${index === 0 ? 1 : 0.6};

    @media (max-width: 1024px) {
      transform: scale(${1 - index * 0.02}) translateX(${index * 25}px) translateY(${index * 8}px);
    }

    @media (max-width: 768px) {
      transform: scale(${1 - index * 0.015}) translateX(${index * 20}px) translateY(${index * 8}px);
    }

    @media (max-width: 480px) {
      transform: scale(${1 - index * 0.01}) translateX(${index * 10}px) translateY(${index * 5}px);
    }
  `}

  @media (max-width: 1024px) {
    width: 90%;
    height: 220px;
    padding: 25px 30px;
  }

  @media (max-width: 768px) {
    width: 80%;
    height: 200px;
    padding: 20px 25px;
  } 

  @media (max-width: 480px) {
    width: 90%;
    height: 240px;
    padding: 10px 15px;
  }
`;