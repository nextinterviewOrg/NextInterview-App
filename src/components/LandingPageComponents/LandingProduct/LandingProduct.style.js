import styled from "styled-components";
export const UserLearningWrapper = styled.div`
// margin-left: 60px;

// @media (max-width:768px){
// margin-left: 0px;
 
//  }
/* General Page Styling */
.courses-container {
//   padding: 40px;
  margin-left:130px;
  margin-right:130px;
  gap:8px;
  font-family: Arial, sans-serif;

  @media ( max-width:768px){
  margin-left:0px;
  margin-right:0px;
  }
}

/* Header Styling */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
  flex-direction:row;
}

.header-title {
  font-family: "DM Sans";
font-size: 34px;
font-style: normal;
font-weight: 700;
line-height: 28px; 
color:${({ theme }) => theme.colors.black};
}

`;

export const Subheading = styled.p`
  font-size: 16px;
 color:"#262524";
  margin-top: 8px;
  margin-bottom: 50px;
`;