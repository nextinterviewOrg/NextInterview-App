// FeatureSection.style.js
import styled from "styled-components";
import theme from "../../../../src/theme/Theme"

export const ContainerWrapper = styled.div`
    // background-color: ${({ theme }) => theme.colors.background};
padding-top: 50px;
padding-bottom:130px;
background: rgba(237, 241, 243, 0.5);

@media (max-width: 768px) {
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 0px;
  }

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

  @media (max-width: 768px) {
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 0px;
  }
`;

export const Sidebar = styled.div`
  width: 250px;
  border-right: 1px solid #EDF1F3;

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 480px) {
    width: 100%;
    flex-direction: row;
    display: flex;
    overflow-x: auto;
        scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }
`;

export const Tab = styled.div`
  padding: 1.5rem 1rem;
  color: #1A1C1E99;
  cursor: pointer;
  
  font-size:16px;
  color: ${({ theme }) => theme.colors.sidebarTextColor};

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 1rem;
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

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-left: none;
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const How = styled.div`
display:flex;
flex-direction:column;

`;

export const Content = styled.div`
  flex: 1;
  padding: 2rem;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.4;
    // width: 550px;
  }

  @media (max-width: 480px) {
    // width: 280px;
  }
`;

export const HowItWorks = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    // width: 500px;
    margin-bottom: 0.5rem;
  }
`;

export const Step = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

export const StepNumber = styled.div`
 
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: bold;
  border-radius: 50%;
  padding: 0.5rem 0.75rem;
   background-color: ${({ theme }) => theme.colors.lightgreen};

   @media (max-width: 768px) {
    font-size: 12px;
    padding: 0.3rem 0.3rem;
  }
`;

export const StepText = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
   background-color: "#c7eaf4";
  margin: 0;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 14px;
    justify-content: center;
    align-items: center;
  }
`;

export const ButtonRow = styled.div`
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
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

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  border-radius: 12px;
  // overflow: hidden;
  width: 100%;
  margin-right: 100px;
  
  width: 431px;
  // height: 285px;

  @media (max-width: 1024px) {
    width: 350px;
    height: 250px;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    width: 230px;
    height: 200px;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    // height: 250px;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
    margin-right: 0
  }
`;

export const VideoImage = styled.img`
  width: 100%;
  display: block;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 40%;
  left: 40%;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 50%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #2290ac;
  font-size: 24px;

  @media (max-width: 1024px) {
  top: 40%;
    padding: 1rem;
    font-size: 22px;
  }

  @media (max-width: 768px) {
    top: 35%;
    padding: 0.8rem;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    top: 30%;
    padding: 0.5rem;
    font-size: 18px;
  }
`;

export const WatchText = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  text-align: center;
  padding: 0.5rem 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  font-weight: 500;

  @media (max-width: 768px) {
    padding: 0.3rem 0;
    font-size: 14px;
  }
`;

export const SectionVideo = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction:row;
//   justify-content:space-between;

@media (max-width: 1024px) {
    flex-direction:column;
  }

@media (max-width: 768px) {
    flex-direction:column;
  }

  @media (max-width: 480px) {
    // width: 200px;
  }
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