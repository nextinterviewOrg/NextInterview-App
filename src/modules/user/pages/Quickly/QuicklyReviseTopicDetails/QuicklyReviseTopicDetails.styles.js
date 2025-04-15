import styled from 'styled-components';
import theme from '../../../../../theme/Theme';

export const TopicContainer = styled.div`
//   margin-left: 60px;
  font-family: Arial, sans-serif;
  max-width: 100vw;
  padding: 40px 100px 40px 40px;
    @media (max-width: 1024px) {
     margin-left: 0px;
   }
`;

export const TopicHeader = styled.div`
  text-align: left;
  margin-bottom: 30px;
`;

export const TopicTopicInfo = styled.div`
  h1 {
   color: ${theme.colors.black};
font-family: "DM Sans";
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: -0.36px;
  }

`;

export const TopicFaqSection = styled.div`
  margin-top: 20px;
`;

export const TopicFaq = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 5px;
`;

export const TopicFaqTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  color: #4CAF50;
  font-size: 18px;
  margin-bottom: 10px;
  cursor: pointer;
  span {
      color: ${theme.colors.black};
font-family: "DM Sans";
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 28px; /* 155.556% */
  }
`;

export const TopicFaqContent = styled.p`
 color: ${theme.colors.textgray};
font-family: "DM Sans";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */
  margin-top: 5px;
`;
export const TopicFaqLink = styled.a`
  color: ${theme.colors.info};
  text-decoration: none;
`;
export const TopicToggleIcon = styled.span`
  font-size: 20px;
  color:${theme.colors.info}!important;
  cursor: pointer;
  padding-left: 10px;

  &:hover {
    color:${theme.colors.bluetext};
  }
`;

export const TopicStartButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px 25px;
  border: none;
  cursor: pointer;
  margin-top: 30px;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;
export const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing(1)};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  overflow: hidden;
`;