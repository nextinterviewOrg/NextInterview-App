import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three cards in a row */
  gap: 20px;
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.colors.light};
  margin-left: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr); /* Two cards per row on tablets */
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(1, 1fr); /* One card per row on mobile */
  }
`;

export const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  line-height: 1;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.light};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  width: 100%; /* Full width to respect grid columns */
  max-width: 320px; /* Limit max width */
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: ${({ theme }) => theme.colors.lightgreen};
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const Title = styled.h3`
  font-size: 18px;
  margin-left: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.body};
  border-radius: 0 0 8px 8px;
  margin-top: 10px;
`;
