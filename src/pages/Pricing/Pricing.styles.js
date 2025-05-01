import styled from 'styled-components';
import theme from '../../theme/Theme';

export const Wrapper = styled.section`
  padding: 30px 20px;
  max-width: 80%;
  margin: 0 auto;
  text-align: left;

  @media (max-width: 1360px) {
    max-width: 90%;
  }

  @media (max-width: 1024px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    padding: 20px 10px;
    text-align: center;
  }
    @
`;

export const Title = styled.h2`
  font-size: 42px;
  font-weight: 700;
  color: #1a1a1a;
  
  @media (max-width: 1360px) {
    font-size: 32px;
  }

    @media (max-width: 1024px) {
    font-size: 28px;
  }
`;

export const SubTitle = styled.p`
  font-size: 20px;
  color: #555;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

export const PlansContainer = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  }


`;

export const Subscription = styled.p`
  font-size: 24px;
  color: ${theme.colors.black};
  font-weight: 600;
  margin-bottom: 40px;
`;

export const PlanCard = styled.div`
  background-color: ${({ suggested }) => (suggested ? theme.colors.lightgreen : '#fff')};
  border: 1px solid ${({ suggested }) => (suggested ? theme.colors.primary : '#ccc')};
  border-radius: 10px;
  padding: 30px 20px;
  position: relative;
  text-align: left;

  @media (max-width: 1024px) {
    padding: 20px 10px;
  }

  @media (max-width: 768px) {
width: 100%;
max-width: 400px;
}
`;

export const SuggestedTag = styled.span`
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(165deg, #2290ac, #68c184);
  color: #fff;
  font-size: 18px;
  padding: 5px 12px;
  border-radius: 4px;

  @media (max-width: 1360px) {
    font-size: 16px;
  }

  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

export const PlanDuration = styled.p`
  font-size: 24px;
  color: #5cb85c;
  font-weight: 500;
  text-align: center;
  @media (max-width: 1360px) {
    font-size: 22px;
  }

  @media (max-width: 1024px) {
    font-size: 20px;
  }
`;

export const PlanPrice = styled.h3`
  font-size: 36px;
  font-weight: bold;
  color: #1a1a1a;
  margin: 10px 0 40px;
  text-align: center;

  @media (max-width: 1360px) {
    font-size: 32px;
  }

  @media (max-width: 1024px) {
    font-size: 28px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin: 10px 0 20px;
  }
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    margin-left: 30px
  }
`;

export const FeatureItem = styled.li`
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;

  &:before {
    content: '✔️';
    color: #485AFF;
    margin-right: 10px;
  }

  @media (max-width: 1360px) {
    font-size: 18px;
  }

  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

export const ContinueButton = styled.button`
  padding: 15px 60px;
  background-color: #0ca3c6;
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #098fb2;
  }

  @media (max-width: 1360px) {
    font-size: 18px;
  }

  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;


