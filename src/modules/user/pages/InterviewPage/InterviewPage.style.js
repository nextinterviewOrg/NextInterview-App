import styled from "styled-components";
import theme from "../../../../theme/Theme";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing(2)};
  padding: ${theme.spacing(3)};
  background: ${theme.colors.light};
  margin-left: 40px;
  .like-button {
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background: white;
    position: absolute;
    right: 5%;
    top: 5%;
    padding: 5px;
    border-radius: 50%;
  }

  .heart-icon.liked {
    color: red;
    fill: red;
  }

  .course-image {
    width: 100%;
    height: 300px;
    display: block;
  }

  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    margin-left: 0px;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Card = styled.div`
 background-color: white;
   border-radius: 10px;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
   overflow: hidden;
  //  width: 100%;
  height:395px;
   margin-bottom: 10px;
   transition: transform 0.3s;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
 //   padding: 24px;
 @media (max-width: 768px) {
   width: 80%;
   margin: 0 auto;  
 }

  .course-image {
  width: 100%;
   border-radius: 15px ;
   object-fit: cover;
   
 }
`;

export const CardContent = styled.div`

 display: flex;
 flex-direction: column;
`;

export const Title = styled.h3`
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing(2)};
  text-align: left;
  margin-left: 15px;
  word-wrap: break-word;
    
`;

export const Details = styled.div`
  font-family: ${theme.fonts.body};
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${theme.colors.textgray};
  font-size: 14px;
  margin-bottom: ${theme.spacing(1)};
  p {
    margin: 4px 0;
  }
  .dot {
    border-radius: 50%;
    background-color: ${theme.colors.textgray};
    width: 7px;
    height: 7px;
  }
`;

export const StartButton = styled.button`
  background: ${theme.colors.black};
  color: ${theme.colors.white};
  font-family: ${theme.fonts.body};
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-bottom: 20px;
  margin-left: 10px;

  &:hover {
    background: ${theme.colors.black};
  }
`;
