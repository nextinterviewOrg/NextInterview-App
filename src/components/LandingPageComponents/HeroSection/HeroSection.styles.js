import styled from 'styled-components';
import theme from '../../../theme/Theme';

export const HeroWrapper = styled.section`
  display: flex;
  flex-direction: column;
background: linear-gradient(165deg, #2290ac, #68c184);
  padding: 80px 10% 40px 10%;
  /* font-family: ${theme.fonts.body}; */
  
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftSection = styled.div`
  max-width: 65%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 32px;
  }

    @media (max-width: 576px) {
    display: none;
  }
`;

export const Title = styled.h1`
  font-size: 68px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;

  @media (max-width: 1320px) {
    font-size: 55px;
  }

  @media (max-width: 1024px) {
    font-size: 35px;
  }

  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

export const Description = styled.p`
  font-size: 22px;
  line-height: 1.6;
  margin-bottom: 50px;
  color: #e0e0e0;
  max-width:90%;

  @media (max-width: 1320px) {
    font-size: 20px;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
}]

  @media (max-width: 768px) {
    font-size: 10px;
  }

    @media (max-width: 576px) {
    font-size: 10px;
    text-align: justify;
  }
`;

export const CTAButton = styled.button`
  background-color: #fff;
  color: ${theme.colors.bluetext};
  padding: 15px 30px;
  font-size: 24px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #e3f2f5;
  }

  @media (max-width: 1320px) {
    font-size: 22px;
  }

  @media (max-width: 1024px) {
    font-size: 18px;
    padding: 12px 24px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }

  @media (max-width: 576px) {
    font-size: 12px;
    padding: 6px 12px;
    justify-content: center;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 700px;


`;

export const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
`;

export const Dot = styled.button`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#fff' : '#aaa')};
  border: none;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: 768px) {
    width: 6px;
    height: 8px;
  }
`;
