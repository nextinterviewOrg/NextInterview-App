


import styled from 'styled-components';
import theme from '../../../theme/Theme';

export const ArsenalContainer = styled.div`
  padding: 60px 20px;
//   max-width: 1200px;
max-width: 80%;
  margin: 0 auto;
  text-align: center;
  /* font-family: ${theme.fonts.body}; */

  @media (max-width: 1320px) {
    max-width: 90%;
  }

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

export const Heading = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 40px;
  text-align: left;

  @media (max-width: 1024px) {
    font-size: 24px;
    margin-bottom: 30px;
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
    text-align: center;
  }

  @media (max-width: 576px) {
    font-size: 20px;
    margin: 10px;
  } 

`;

export const CardContainer = styled.div`
display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-content: center;

  @media (max-width: 1024px) {
  display: flex;
  flex-wrap: wrap;
  }
`;

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 30px 20px;
  border: 1px solid #EDF1F3;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
  text-align: center;

  @media (max-width: 1024px) {
    padding: 20px 10px;
    width: 300px;
  }

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 576px) {
    width: 100%;
  } 
`;

export const IconWrapper = styled.div`
  margin-bottom: 20px;
  padding: 0 40px;

  img {
    max-width: 100%;
    height: 150px;
    object-fit: contain;

    @media (max-width: 1024px) {
      height: 100px;
    }
  }

  @media (max-width: 1024px) {
    padding: 0 20px;
  }
`;

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #262524;
  margin-bottom: 12px;

  @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Description = styled.p`
  font-size: 18px;
  color: #262524;
  margin-bottom: 20px;
  font-weight: 500;

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

