// // File: DataInterviewTopics.styles.js
// import styled from 'styled-components';

// export const Wrapper = styled.div`
//   padding: 40px;
//   background-color: ${({ theme }) => theme.colors.light};
//   font-family: ${({ theme }) => theme.fonts.body};
//   margin-left: 80px;
//   margin-right: 80px;
// `;

// export const Heading = styled.h2`
//   font-family: ${({ theme }) => theme.fonts.heading};
//   font-size: 28px;
//   color: ${({ theme }) => theme.colors.text};
// `;

// export const Subheading = styled.p`
//   font-size: 16px;
//   color: ${({ theme }) => theme.colors.textgray};
//   margin-top: 8px;
// `;

// export const CategoryFilters = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 12px;
//   margin: 24px 0;
// `;

// export const FilterButton = styled.button`
//   background-color: ${({ active, theme }) =>
//     active ? theme.colors.sidebarActiveBgColor : theme.colors.lightblue};
//   color: ${({ active, theme }) =>
//     active ? theme.colors.sidebarActiveTextColor : theme.colors.sidebarTextColor};
//   border: 1px solid ${({ theme }) => theme.colors.borderblue};
//   border-radius: 20px;
//   padding: 8px 16px;
//   font-size: 14px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.sidebarHoverBgColor};
//   }
// `;

// export const CardGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
//   gap: 30px;
// `;

// export const TopicCard = styled.div`
//   background: ${({ theme }) => theme.colors.white};
//   border-radius: 12px;
//   overflow: hidden;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
//   transition: transform 0.2s;

//   &:hover {
//     transform: translateY(-4px);
//   }
// `;

// export const CardImage = styled.img`
//   width: 100%;
//   height: 160px;
//   object-fit: cover;
// `;

// export const CardContent = styled.div`
//   padding: 16px;
// `;

// export const Tag = styled.div`
//   background: ${({ theme }) => theme.colors.lightgreen};
//   color: ${({ theme }) => theme.colors.success};
//   padding: 4px 10px;
//   font-size: 12px;
//   border-radius: 6px;
//   display: inline-block;
//   margin-bottom: 8px;
// `;

// export const CardTitle = styled.h3`
//   font-size: 18px;
//   color: ${({ theme }) => theme.colors.text};
//   margin: 8px 0;
// `;

// export const CardDescription = styled.p`
//   font-size: 14px;
//   color: ${({ theme }) => theme.colors.textgray};
//   margin-bottom: 12px;
// `;

// export const CardFooter = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-size: 12px;
//   color: ${({ theme }) => theme.colors.textgray};
//   margin-bottom: 12px;
// `;

// export const StartButton = styled.button`
//   background: ${({ theme }) => theme.colors.primary};
//   color: white;
//   border: none;
//   padding: 8px 16px;
//   font-weight: 600;
//   font-size: 14px;
//   border-radius: 8px;
//   cursor: pointer;

//   &:hover {
//     background: ${({ theme }) => theme.colors.secondary};
//   }
// `;

import styled from "styled-components";

export const UserLearningWrapper = styled.div`
// margin-left: 60px;

// @media (max-width:768px){
// margin-left: 0px;
 
//  }
/* General Page Styling */


.head-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  flex-direction:row;
}

.search-container {
  display: flex;
  align-items: center;
 justify-content: space-between;
  gap: 10px;
}

.search-button {
  background-color: #2290ac; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

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
  margin-bottom: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const Heading = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
  flex: 1 0 100%;
`;

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  button {
    border: 1px solid #ddd;
    background-color: #fff;
    padding: 0.4rem 0.9rem;
    border-radius: 20px;
    font-size: 14px;
    color: #444;
    cursor: pointer;
    transition: all 0.2s ease;

    &.active {
      background-color: #444;
      color: #fff;
    }

    &:hover {
      border-color: #aaa;
    }
  }
`;

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #eef7f1;
  padding: 0.4rem 0.6rem;
  border-radius: 10px;
  gap: 0.5rem;

  input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    width: 140px;
  }

  svg {
    font-size: 16px;
    color: #333;
  }
`;

export const ToggleButtons = styled.div`
  display: flex;
  gap: 0.3rem;

  button {
    background-color: #f0f0f0;
    border: none;
    padding: 0.4rem 0.6rem;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.active {
      background-color: #444;
      color: #fff;
    }

    &:hover {
      background-color: #ccc;
    }
  }
`;