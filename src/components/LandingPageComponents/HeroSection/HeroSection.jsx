import React, { useState, useEffect } from 'react';
import {
    HeroWrapper,
  HeroContainer,
  LeftSection,
  RightSection,
  Title,
  Description,
  CTAButton,
  Image,
  DotContainer,
  Dot,
} from './HeroSection.styles';
import HeroImage1 from '../../../assets/HeroImage1.svg';
import HeroImage2 from '../../../assets/HeroImage2.svg';
import HeroImage3 from '../../../assets/HeroImage3.svg';

const slides = [
  {
    title: 'Prep like a pro, ace interviews.',
    description:
      'Master the fundamentals and strategize like an expert to perform confidently during your interviews.',
    image: HeroImage1,
  },
  {
    title: 'Cut clutter; master data interview prep.',
    description:
      'Stop random browsing and get straight to the point—follow the 80:20 rule to nail every data interview.',
    image: HeroImage2,
  },
  {
    title: 'Iterate, innovate, and conquer interviews.',
    description:
      'Practice unlimited real interview questions enhanced by AI until you turn every challenge into success.',
    image: HeroImage3,
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  // Autoplay every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (i) => {
    setIndex(i);
  };

  return (
    <>
    <HeroWrapper>
    <HeroContainer>
      <LeftSection>
        <Title>{slides[index].title}</Title>
        <Description>{slides[index].description}</Description>
        <CTAButton>Start Practising Now</CTAButton>

      </LeftSection>
      <RightSection>
        <Image src={slides[index].image} alt="Hero Visual" />
      </RightSection>
    </HeroContainer>
    <DotContainer>
          {slides.map((_, i) => (
            <Dot
              key={i}
              active={i === index}
              onClick={() => handleDotClick(i)}
            />
          ))}
        </DotContainer>
        </HeroWrapper>
    </>
  );
};

export default HeroSection;
