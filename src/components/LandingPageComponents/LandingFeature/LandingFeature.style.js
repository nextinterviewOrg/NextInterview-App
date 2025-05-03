// FeatureSection.style.js
import styled from "styled-components";

export const ContainerWrapper = styled.div`
    // background-color: ${({ theme }) => theme.colors.background};
padding-top: 50px;
padding-bottom:130px;
background: rgba(237, 241, 243, 0.5);

    `;
export const SectionWrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.background};
//   padding-top: 2rem;
// padding:40px;
  border-radius: 20px;
  margin-left:130px;
  margin-right:130px;
 
  background-color: white;
`;

export const Sidebar = styled.div`
  width: 250px;
  border-right: px solid ${({ theme }) => theme.colors.border};
`;

export const Tab = styled.div`
  padding: 1.5rem 1rem;
//   color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  
  font-size:16px;
  color: ${({ theme }) => theme.colors.sidebarTextColor};

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const ActiveTab = styled(Tab)`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.lightgreen};
  padding: 1.5rem 1rem;
border-left: 5px solid ${({ theme }) => theme.colors.primary};
  // border-radius: 8px;

  &:first-child {
    border-top-left-radius: 8px;
  }
`;

export const How = styled.div`
display:flex;
flex-direction:column;

`;

export const Content = styled.div`
  flex: 1;
  padding: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

export const HowItWorks = styled.div`
  margin-bottom: 1.5rem;
`;

export const Step = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const StepNumber = styled.div`
 
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: bold;
  border-radius: 50%;
  padding: 0.5rem 0.75rem;
   background-color: ${({ theme }) => theme.colors.lightgreen};
`;

export const StepText = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
   background-color: "#c7eaf4";
  margin: 0;
  font-size: 1rem;
`;

export const ButtonRow = styled.div`
  margin: 1.5rem 0;
`;

export const GetStartedButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  border-radius: 12px;
//   overflow: hidden;
  width: 100%;
  margin-right: 100px;
  
  width: 431px;
  // height: 285px;
`;

export const VideoImage = styled.img`
  width: 100%;
  display: block;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 35%;
  left: 40%;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 50%;
  padding: 1.5rem 1.3rem 1.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const WatchText = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  text-align: center;
  padding: 0.5rem 0;
    border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  
  font-weight: 500;
`;

export const SectionVideo = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction:row;
//   justify-content:space-between;
`;

export const Title2 = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const MainTitle = styled.h1`
  font-size: 30px;
//   font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
margin-bottom:50px;
  margin-left:130px;
  margin-right:130px;
`;