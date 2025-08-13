import styled from "styled-components";
import theme from "../../../../../theme/Theme";

export const Container = styled.div`
  display: flex;
  margin-left: 50px;
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: 0px;
  }
`;

export const ModuleCard = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  align-items: flex-start;
  width: 100%;
`;

export const ModuleDetails = styled.div`
  flex: 1;
  padding: ${theme.spacing(2)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const Title = styled.h2`
  /* font-family: ${theme.fonts.body}; */
  color: ${theme.colors.text};
  font-size: 1.4rem;
`;

export const Button = styled.button`
  background-color: ${theme.colors.light};
  color: ${theme.colors.secondary};
  /* font-family: ${theme.fonts.accent}; */
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border: 1px solid ${theme.colors.secondary};
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${theme.colors.sidebarTextColor}10;
  }
`;

export const LinkStyled = styled.a`
  text-decoration: none;
`;

export const RevisitLinkContainer = styled.div`
  position: absolute;
  right: 40px;
  bottom: 10px;
`;
export const ResponsiveContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;