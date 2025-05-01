// styles.js
import styled from 'styled-components';
import theme from '../../../theme/Theme';

export const Wrapper = styled.section`
  padding: 40px 20px;
  background: #ffffff;
  max-width: 80%;
  margin: 0 auto;

  @media (max-width: 1360px) {
    max-width: 90%;
  }

  @media (max-width: 768px) {
    padding: 40px 10px;
    max-width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 48px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;

  @media (max-width: 1360px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const Description = styled.p`
  font-size: 24px;
  line-height: 1.7;
  color: #444;
  margin-bottom: 50px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const SectionCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #F5F9FC;
  padding: 20px 40px;
  border-radius: 12px;
  margin-bottom: 30px;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CardContent = styled.div`
  flex: 1;
  position: relative;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const CardHeader = styled.h3`
  font-size: 30px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 40px;
  color: #222;

  @media (max-width: 768px) {
    font-size: 22px;
  }

`;

export const MissionContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;  

export const VisionContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CardText = styled.div`
  
display: flex;
`;

export const CardTitle = styled.p`
margin: 0;
width: 100%;
  font-size: 45px;
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1;
  padding: 20px 0;

  @media (max-width: 1360px) {
    font-size: 32px;
    line-height: .5;
  }

  @media (max-width: 768px) {
    font-size: 22px;
    line-height: .6;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1;
  }
`;
export const QuoteIcon = styled.span`
  font-size: 78px;
  color: ${theme.colors.bluetext};
  display: inline-block;
  margin-right: 20px;
  ${({ right }) =>
    right &&
    `
      margin-left: 20px;
      margin-right: 0;
      transform: scaleX(-1) translateY(50px);
    `}

    @media (max-width: 1360px) {
      font-size: 60px;
    }

    @media (max-width: 768px) {
      font-size: 50px;
       ${({ right }) =>
    right &&
    `
      transform: scaleX(-1) translateY(30px);
    `}
    }

    @media (max-width: 480px) {
      font-size: 30px;
       ${({ right }) =>
    right &&
    `
      transform: scaleX(-1) translateY(20px);
    `}
    }

`;

export const CardImage = styled.img`
  flex: 1;
  max-width: 450px;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 30px;
    max-width: 350px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
  }
`;
