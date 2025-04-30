import React from 'react';
import {
  HeaderContainer,
  LogoContainer,
  NavLinks,
  NavLinkItem,
  ButtonGroup,
  LoginButton,
  SignupButton,
  LogoImage,
  Left
} from './LandingHeader.styles';
import LOGO from '../../../assets/Logo.png';

const LandingHeader = () => {
  return (
    <HeaderContainer>
        <Left>
      <LogoContainer>
        <LogoImage src={LOGO} alt="Next Interview Logo" />
      </LogoContainer>

      <NavLinks>
        <NavLinkItem href="#">About</NavLinkItem>
        <NavLinkItem href="#">Topics</NavLinkItem>
        <NavLinkItem href="#">Product</NavLinkItem>
        <NavLinkItem href="#">Pricing</NavLinkItem>
      </NavLinks>
      </Left>

      <ButtonGroup>
        <LoginButton href="#">Login</LoginButton>
        <SignupButton href="#">Sign up</SignupButton>
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default LandingHeader;
