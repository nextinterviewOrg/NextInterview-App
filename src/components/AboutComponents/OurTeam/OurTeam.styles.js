import styled from 'styled-components';

export const Container = styled.section`
  padding: 60px 20px;
  text-align: center;
  background-color: #ffffff;
  width:80%;
  margin: 0 auto;

  @media (max-width: 1360px) {
    width: 90%;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 40px;
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 30px;
  justify-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, minmax(150px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(180px, 1fr));
  }
`;

export const TeamCard = styled.div`
  background: #fff;
  border: 1px solid #eee;
    border-radius: 16px;

  padding:  0 ;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 1024px) {
    max-width: 150px;
  }

  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;

    border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  @media (max-width: 1024px) {
    height: 150px;
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const Role = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 10px;
`;

export const Name = styled.h4`
  font-size: 16px;
  font-weight: 500;
  margin-top: 4px;
`;
