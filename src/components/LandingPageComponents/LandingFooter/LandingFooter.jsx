import React from 'react';
import {
  FooterContainer,
  FooterContent,
  LogoSection,
  Img,
  FooterDetails,
  Column,
  SecondColumn,
  Title,
  Link,
  CopyRight,
  SocialIcons,
  IconWrapper
} from './LandingFooter.styles';
import { FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import logo from "../../../assets/Logo_allWhite.png";

const LandingFooter = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection>
          <Img src={logo} alt="NextInterview Logo" />
          <CopyRight>
            <p>Copyright © 2025 Nextinterview</p>
            <p>All rights reserved</p>
          </CopyRight>
        </LogoSection>

        <FooterDetails>
        <Column>
          <Title>Company</Title>
          <Link href="/about">About us</Link>
          <Link href="/about">Contact us</Link>
          <Link href="/pricing">Pricing </Link>
          {/* <Link href="#">Testimonials</Link> */}
        </Column>

        <SecondColumn>
          <Title>Support</Title>
          {/* <Link href="#">Help center</Link> */}
          <Link href="/termsandconditions">Terms of service</Link>
           {/* <Link href="#">Legal</Link> */}
          <Link href="/privacypolicy">Privacy policy</Link>
        </SecondColumn>
        </FooterDetails>

        </FooterContent>
        
        <SocialIcons>
          <IconWrapper><FaInstagram className='social-icons'/></IconWrapper>
          <IconWrapper><FaLinkedinIn className='social-icons'/></IconWrapper>
          <IconWrapper><FaXTwitter className='social-icons'/></IconWrapper>
          <IconWrapper><FaYoutube className='social-icons'/></IconWrapper>
        </SocialIcons>
      
    </FooterContainer>
  );
};

export default LandingFooter;