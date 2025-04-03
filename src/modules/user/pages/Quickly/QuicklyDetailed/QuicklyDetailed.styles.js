import styled from 'styled-components';
import theme from '../../../../../theme/Theme';

export const Container = styled.div`
margin-left: 60px;
  font-family: Arial, sans-serif;
//   width: 100%;
  max-width: 100vw;
  padding: 20px ;

  @media (max-width: 1024px) {
    margin-left: 0px;
  }

  @media (max-width: 768px) {
  margin-left: 0px;
}
  
`;
export const PageTitle = styled.h1`
display: flex;
padding: 0px 24px;
align-items: center;
gap: 777px;
align-self: stretch;
 font-family: "DM Sans";
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 28px; /* 116.667% */
letter-spacing: -0.48px;
color:${theme.colors.black};

@media (max-width: 1024px) {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const Header = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
  text-align: left;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
export const HeaderHeading = styled.h2`
  color: ${theme.colors.black};
font-family: "DM Sans";
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: -0.36px;
`;
export const HeaderDiscription = styled.p`
  color: ${theme.colors.textgray};
overflow: hidden;
text-overflow: ellipsis;
font-family: "DM Sans";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
letter-spacing: -0.28px;
// height: 110px;
// text-transform: capitalize;

@media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
export const HeaderInfo = styled.p`
color: ${theme.colors.textgray};
font-family: "DM Sans";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
letter-spacing: -0.28px;

@media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
export const ModuleContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

export const ModuleImage = styled.img`
  width: 100%;
height: 300px;
  object-fit: cover;
  border-radius: 8px;
//   margin-right: 30px;
`;

export const ModuleInfo = styled.div`
  margin: 10px 0;
  color: #555;
`;

export const StartButton = styled.button`
  background-color:${theme.colors.info};
  color:${theme.colors.white};
text-align: center;
/* Body Text/Small/Body Small (Medium) */
font-family: "DM Sans";
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 24px; /* 171.429% */
letter-spacing: -0.28px;
 
  padding: 12px 25px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
 

  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.bluetext};
  }

  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 10px 20px;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
//   margin-top: 30px;
  gap: 0px;
//   border-bottom: 2px solid #ddd;
  overflow-x: auto; /* Enables horizontal scrolling */
  white-space: nowrap; /* Prevents wrapping of tabs to the next line */
  padding-bottom: 10px;
  
  /* Optional: to hide the scrollbar on some browsers like Chrome */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  
  /* For Chrome */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Tab = styled.div`
color: ${theme.colors.textgray};
font-family: "DM Sans";
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: 28px; /* 155.556% */
  padding: 15px 25px;
  margin: 0 ;
  background-color:${theme.colors.white};
  cursor: pointer;
//   border-radius: 5px;
  text-align: center;
  transition: background-color 0.3s ease;
   display: inline-block; /* Ensure tabs are inline */
  white-space: nowrap; 

  &.active {
    // background-color: #4CAF50;
    border-bottom: 2px solid ${theme.colors.info};
    // color: white;
    color: ${theme.colors.black};
  }

  &:hover {
    background-color: #ddd;
  }
`;

export const ContentContainer = styled.div`
  text-align: left;
  margin-top: 30px;
  color: #333;

  h3 {
    color: #333;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
  }
`;

export const FaqSection = styled.div`
  margin-top: 20px;
`;

export const Faq = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const FaqTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  color: #4CAF50;
  font-size: 18px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const FaqContent = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 5px;
`;

export const ToggleIcon = styled.span`
  font-size: 20px;
  color: #4CAF50;
  cursor: pointer;
  padding-left: 10px;

  &:hover {
    color: #45a049;
  }
`;
export const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: ${theme.colors.info};
  padding: 0 20px;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.bluetext};
  }
`;