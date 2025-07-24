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
          <IconWrapper> <a style={{textDecoration:"none", color:"white" }} href="https://www.instagram.com/nextinterview.ai"><FaInstagram className='social-icons'/></a></IconWrapper>
          <IconWrapper><a style={{textDecoration:"none",  color:"white" }} href="https://www.linkedin.com/in/nextinterview-ai-263a2b342?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedinIn className='social-icons'/></a></IconWrapper>
          <IconWrapper><a style={{textDecoration:"none",  color:"white" }} href="https://x.com/nextinterviewai"><FaXTwitter className='social-icons'/></a></IconWrapper>
          <IconWrapper><a style={{textDecoration:"none", color:"white" }} href="https://www.facebook.com/share/1AbCajxfBz/"><FaYoutube className='social-icons'/></a></IconWrapper>
        </SocialIcons>
      
    </FooterContainer>
  );
};

export default LandingFooter;