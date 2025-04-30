import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LogoImage = styled.img`
  height: 70px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLinkItem = styled.a`
  text-decoration: none;
  color: #222;
  font-weight: 500;
  font-size: 20px;

  &:hover {
    color: #007ba7;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

export const LoginButton = styled.a`
  color: #007ba7;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export const SignupButton = styled.a`
  background-color: #198dab;
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    background-color: #147c97;
  }
`;
