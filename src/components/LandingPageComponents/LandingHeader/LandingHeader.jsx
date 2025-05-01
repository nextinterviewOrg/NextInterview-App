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
import { Link } from 'react-router-dom';

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
        <Link to="/" style={{ textDecoration: 'none' }}><LogoImage src={logo} alt="Next Interview Logo" /></Link>   
        </LogoContainer>

        <NavLinks>
       <Link to="/about" style={{ textDecoration: 'none' }}>   <NavLinkItem >About</NavLinkItem></Link>
          <Link to="/course" style={{ textDecoration: 'none' }}>   <NavLinkItem >Topics</NavLinkItem></Link>
          <Link to="/product" style={{ textDecoration: 'none' }}>   <NavLinkItem >Product</NavLinkItem></Link>
          <NavLinkItem href="/pricing">Pricing</NavLinkItem>
        </NavLinks>
      </Left>

      <ButtonGroup>
        <LoginButton style={{ textDecoration: 'none' }} href="/login">Login</LoginButton>
        <SignupButton style={{ textDecoration: 'none' }} href="/signup">Sign up</SignupButton>
      </ButtonGroup>

      <Hamburger ref={hamburgerRef} onClick={() => setMenuOpen((prev) => !prev)}>
        <FaBars size={24} />
      </Hamburger>

      {menuOpen && (
        <MobileMenu ref={menuRef}>
          <MobileMenuItem href="/about">About</MobileMenuItem>
          <MobileMenuItem href="/course">Topics</MobileMenuItem>
          <MobileMenuItem href="/produc">Product</MobileMenuItem>
          <MobileMenuItem href="/pricing">Pricing</MobileMenuItem>
          <MobileMenuItem href="/login">Login</MobileMenuItem>
          <MobileMenuItem href="/signup">Sign up</MobileMenuItem>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default LandingHeader;
