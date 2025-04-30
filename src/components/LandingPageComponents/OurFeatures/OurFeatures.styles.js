import styled from 'styled-components';

export const FeaturesWrapper = styled.div`
  background-color: #f4f8fa;
  background-color: #EDF1F3;
  padding: 1rem;
`;

export const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  padding: 60px 20px

  @media (max-width: 1360px) {
    width: 90%;
  }

  @media (max-width: 820px) {
    width: 80%;
  }
`;

export const FeaturesHeading = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #262524;
  margin: 0;
  margin-bottom: 2rem;


  @media (max-width: 1360px) {
    font-size: 28px;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 26px;
    margin-bottom: 1rem;
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background-color: #fff;
  border-radius: 24px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.05);
  position: relative;

  @media (max-width: 1024px) {
    padding: 1rem;
  }
`;

export const FeatureImage = styled.img`
  width: 100%;
  height: 250px;
//   object-fit: cover;
  border-radius: 24px;
  background-color: #EDF1F3;

  @media (max-width: 1360px) {
    height: 180px;
  }

  @media (max-width: 768px) {
    height: 150px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`;

export const FeatureTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #262524;
  width: 80%;
  text-align: center;
  margin: auto;
    margin-top: 2rem;


    @media (max-width: 1360px) {
    font-size: 18px;
      width: 100%;  
    }

    @media (max-width: 1024px) {
    font-size: 14px;
    margin-top: 1rem;
    width: 100%;
  }
`;

export const PlayIconWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 50%;
  padding: 0.5rem;
  font-size: 30px;
  color: #007bff; /* blue icon */
  background-color: #fff; /* white background */
    opacity: 0.8;
    cursor: pointer;

    @media (max-width: 1360px) {
      font-size: 25px;
    }

    @media (max-width: 1024px) {
      font-size: 20px;
    }

    @media (max-width: 480px) {
      top: 45%;
   }
`;
