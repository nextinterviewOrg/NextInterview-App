import styled from 'styled-components';

export const FooterContainer = styled.footer`
display: grid;
grid-template-columns: repeat(2, 1fr);
  background-color: ${({ theme }) => theme.colors.text};
  color: #fff;
  padding: 5rem 4rem 4rem 4rem;

  @media (max-width: 1024px) {
  padding: 3rem 2rem 2rem 2rem;
  }

  @media (max-width: 768px) {
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem 1rem 4rem;
  gap: 2rem;
  }

  @media (max-width: 480px) {
  padding: 1.5rem;
  gap: 1rem;
  }
`;

export const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6rem;

  @media (max-width: 1024px) {
    gap: 4rem;
  }

  @media (max-width: 768px) {
    gap: 2rem;
    grid-template-columns: 1fr 2fr;
  }

   @media (max-width: 480px) {
    gap: 1rem;
  }
`;

export const LogoSection = styled.div`
display: flex;
flex-direction: column;
gap: 2rem;

@media (max-width: 1024px) {
  gap: 1rem;
}
`;

export const Img = styled.img`
  height: 40px;
  width: 180px;

  @media (max-width: 1024px) {
    height: 40px;
    width: 150px;
  }

  @media (max-width: 768px) {
      height: 30px;
      width: 140px;
  }

  @media (max-width: 480px) {
      height: 25px;
      width: 80px;
  }
`;

export const CopyRight = styled.div`
  font-size: 18px;
  color: #F5F7FA;
  margin-top: 1rem;
  line-height: 1.5;
  p {
    margin: 0.2rem 0;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
    min-width: 200px;
  }

  @media (max-width: 768px) {
  font-size: 14px;
    min-width: 100px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const FooterDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-wrap: wrap;
  gap: 6rem;

  @media (max-width: 1024px) {
    gap: 4rem;
  }

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

export const Column = styled.div`
  flex: 1;
//   min-width: 150px;
`;

export const SecondColumn = styled.div`
  flex: 1;

  @media (max-width: 1024px) {
  min-width: 150px;
}

@media (max-width: 768px) {
  min-width: 100px;
}

@media (max-width: 480px) {
min-width: 50px;
}
`;

export const Title = styled.h3`
  font-size: 26px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 1.5rem;

  @media (max-width: 1024px) {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const Link = styled.a`
  display: block;
  color: #F5F7FA;
  font-size: 18px;
  margin-bottom: 0.5rem;
  text-decoration: none;
  line-height: 1.5;
  cursor: pointer;
  max-width: 100%;

  &:hover {
    color: #ccc;
    text-decoration: underline;
  }

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;


export const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  justify-content: flex-end;

  @media (max-width: 1024px) {
    gap: 0.1rem;
  }
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
    // margin-top: 1rem;
  }
`;

export const IconWrapper = styled.a`
  background-color: ${({ theme }) => theme.colors.light}10;
  padding: 0.5rem;
  border-radius: 50%;
  color: #fff;
//   display: inline-flex;
//   align-items: center;
  font-size: 1rem;

  &:hover {
    background-color: #444;
  }

  .social-icons{
  display: flex;
  align-items: center;
    width: 25px;
    height: 25px;
    cursor: pointer;

    @media (max-width: 1024px) {
      width: 20px;
      height: 20px;
    }

    @media (max-width: 480px) {
      width: 16px;
      height: 16px;
    }
  }
`;
