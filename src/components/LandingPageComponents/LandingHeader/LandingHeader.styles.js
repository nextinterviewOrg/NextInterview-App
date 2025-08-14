import styled from 'styled-components';
import theme from '../../../theme/Theme';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: ${theme.colors.light};
  border-bottom: 1px solid #eee;
  position: relative;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LogoImage = styled.img`
  height: 70px;

  @media (max-width: 1320px) {
    height: 60px;
  }

  @media (max-width: 1024px) {
    height: 40px;
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 6.2rem;

  @media (max-width: 1320px) {
    gap: 4rem;
  }

  @media (max-width: 1024px) {
    gap: 1rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLinkItem = styled.a`
  text-decoration: none;
  color: #262524;
  font-weight: 500;
  font-size: 21px;
  /* font-family: ${theme.fonts.body}; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 50px;

  background-color: ${(props) => (props.$active ? theme.colors.bluetext : 'transparent')};
  color: ${(props) => (props.$active ? theme.colors.light : '#262524')};

  &:hover {
    // background-color: ${theme.colors.bluetext};
    // color: ${theme.colors.light};
  }

  @media (max-width: 1024px) {
    font-size: 18px;
    padding: 8px 10px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
  margin-right: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LoginButton = styled.a`
  color: ${theme.colors.bluetext};
  font-weight: 500;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: none;
  }

  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

export const SignupButton = styled.a`
  background-color: ${theme.colors.bluetext};
  color: ${theme.colors.light};
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    background-color: #147c97;
  }

  @media (max-width: 1024px) {
    font-size: 16px;
    padding: 10px 20px;
  }
`;

export const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  color: ${theme.colors.bluetext};

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  background-color: ${theme.colors.light};
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 999;
  box-sizing: border-box;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileMenuItem = styled.a`
  padding: 10px 0;
  color: ${theme.colors.bluetext};
  text-decoration: none;
  font-size: 18px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: ${theme.colors.light};
    background-color: ${theme.colors.bluetext};
    padding-left: 10px;
    border-radius: 5px;
  }
`;
