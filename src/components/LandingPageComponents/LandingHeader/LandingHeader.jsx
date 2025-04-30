import React, { useState, useRef, useEffect } from 'react';
import {
  HeaderContainer,
  LogoContainer,
  NavLinks,
  NavLinkItem,
  ButtonGroup,
  LoginButton,
  SignupButton,
  LogoImage,
  Left,
  Hamburger,
  MobileMenu,
  MobileMenuItem
} from './LandingHeader.styles';
import { FaBars } from 'react-icons/fa';
import logo from '../../../assets/Logo.png';

const LandingHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const hamburgerRef = useRef();

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <HeaderContainer>
      <Left>
        <LogoContainer>
          <LogoImage src={logo} alt="Next Interview Logo" />
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

      <Hamburger ref={hamburgerRef} onClick={() => setMenuOpen((prev) => !prev)}>
        <FaBars size={24} />
      </Hamburger>

      {menuOpen && (
        <MobileMenu ref={menuRef}>
          <MobileMenuItem href="#">About</MobileMenuItem>
          <MobileMenuItem href="#">Topics</MobileMenuItem>
          <MobileMenuItem href="#">Product</MobileMenuItem>
          <MobileMenuItem href="#">Pricing</MobileMenuItem>
          <MobileMenuItem href="#">Login</MobileMenuItem>
          <MobileMenuItem href="#">Sign up</MobileMenuItem>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default LandingHeader;
