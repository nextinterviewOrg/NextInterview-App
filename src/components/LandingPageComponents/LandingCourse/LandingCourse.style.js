

import styled from "styled-components";

export const UserLearningWrapper = styled.div`
// margin-left: 60px;

// @media (max-width:768px){
// margin-left: 0px;
 
//  }
/* General Page Styling */
.courses-container {
  padding: 40px;
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

.header-actions {
  display: flex;
  align-items: center;
 justify-content: space-between;
  gap: 10px;

}
.searchContainer {
    
    width: 230px;
height: 46px;

}
.search-input {
  padding: 10px 10px 10px 20px;
  margin-right: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 14px;
 width: 100%;
background: #F0F8F1;
}

@media (max-width: 768px) {
    .header {
        flex-direction: column;
    }
}

/* Grid Layout for Course Cards */
.course-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

/* Grid View Styling */
.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

.course-card {
  background-color: white;
  border-radius: 10px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
//   width: 378px;
  height: 395px;
  margin-bottom: 10px;
  transition: transform 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

@media (max-width: 768px) {
  width: 80%;
}
}

.course-card:hover {
  transform: translateY(-10px);
}

.course-image {
 width: 100%;
height: 205px;
  border-radius: 15px ;
  object-fit: cover;
}

/* Course Text Styling */
.course-details{
display: flex;
flex-direction: column;
}

.course-title {
  padding: 5px;
  margin: 0 10px;
 font-family: "DM Sans";
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: normal;
  color:${({ theme }) => theme.colors.black};
}

.course-description{
  padding: 0 10px;
 overflow: hidden;
text-overflow: ellipsis;
font-family: "DM Sans";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px;
color:${({ theme }) => theme.colors.textgray};
margin-bottom: 20px;
}

/* Info and Button Styling */
.course-info {
  display: flex;
  justify-content: flex-start;
//   padding: 10px;
  gap: 10px;
  margin-left: 10px;
}

.course-info span {
 font-family: "DM Sans";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; 
color:${({ theme }) => theme.colors.textgray};
}
  .coursecard-bt-container{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 0;
  }

.start-btn {
  width: 96px;
height: 34px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
 font-family: "DM Sans";
font-size: 14px;
font-style: normal;
font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-btn:hover {
  background-color: ${({ theme }) => theme.colors.info};
}
`;


export const Subheading = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textgray};
  margin-top: 8px;
  margin-bottom: 50px;
`;