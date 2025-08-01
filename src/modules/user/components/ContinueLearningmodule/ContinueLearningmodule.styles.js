import styled from "styled-components";
 
 
 export const UserLearningWrapper = styled.div`
 margin-left: 60px;
 
 @media (max-width:768px){
 margin-left: 0px;
 margin-right: 0px;
  
  }
 /* General Page Styling */
 .courses-container {
   padding: 40px;
   font-family: Arial, sans-serif;

   @media (max-width: 768px) {
     padding: 20px;
   }
 }
 
 /* Header Styling */
 .header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 30px;
 }
 
 .header-title {
   font-family: "DM Sans";
 font-size: 24px;
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
 .search-icon {
     position: absolute;
     right: 10px;
     top: 50%;
     transform: translateY(-50%);
     font-size: 20px;
     color: #888;
 }
 
 .toggle-btn {
   padding: 10px 10px 10px 10px;
   background-color: #EBEBEB;
 //   color: white;
   border: none;
   border-radius: 50%;
   cursor: pointer;
   font-size: 25px;
   width: 45px;
   display: flex;
   align-items: center;
   justify-content: center;
 }
 
 
 .toggle-btn:hover {
   background-color::rgb(212, 212, 212);
 }
   @media (max-width: 768px) {
       .header {
           flex-direction: column;
       }
          //    .toggle-btn{
          //  display: none;
          //  }
         
   }
       @media (max-width: 480px) {
          //    .toggle-btn{
          //  display: none;
          //  }
       }
 
 /* Grid and List Layout for Course Cards */
 .course-cards {
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
 }
 
 /* Grid View Styling */
 .grid-view {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
   gap: 20px;
    @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
 }
 
 .list-view {
   display: block;
 }
 .course-card-main{
 padding: 24px;
 }
 
 .course-card {
   background-color: white;
   border-radius: 10px;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
   overflow: hidden;
  //  width: 100%;
  height:450px;
   margin-bottom: 10px;
   transition: transform 0.3s;
   cursor: pointer;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
//    padding: 24px;
 @media (max-width: 768px) {
   width: 80%;
   margin: 0 auto;  
 }
 }
 .course-card-list{
 background-color: white;
   border-radius: 10px;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
   overflow: hidden;
    width: 100%;
   margin-bottom: 20px;
   transition: transform 0.3s;
   cursor: pointer;
   display: flex;
   
   justify-content: flex-start;
   align-items: center;
 }
 .course-card:hover {
   transform: translateY(-10px);
 }
 
 .course-image {
  width: 100%;
 height: 200px;
   border-radius: 15px ;
   object-fit: cover;
   margin-bottom: 10px;
   
 }
   .course-image-list{
  width: 104.5px;
 height: 65.015px;
   border-radius: 15px ;
   object-fit: cover;
   margin:24px;

   @media (max-width: 480px) {
   margin: 10px;
}
   }
 
  .progress-section {
    padding: 15px;
    text-align: center;
    margin-bottom: 20px;
  }

  .progress-section h3 {
    font-size: 14px;
    color: #ddd;
  }

  .progress-bar-container {
    width: 100%;
    height: 10px;
    background-color: #444;
    border-radius: 5px;
    margin: 10px 0;
  }

  .progress-bar {
    height: 100%;
    background-color: #4caf50;
    border-radius: 5px;
  }
 /* Course Text Styling */
 
 .course-details{
 display: flex;
 flex-direction: column;
//  gap: 10px;
//  padding: 10px;
 }
 .course-details-list{
 display: flex;
 flex-direction: column;
 gap: 10px;
 
//  margin-bottom: 20px;
 }
 .course-title {
   padding-left: 5px;
   margin: 0 10px;
  font-family: "DM Sans";
 font-size: 18px;
 font-style: normal;
 font-weight: 600;
 line-height: normal;
   color:${({ theme }) => theme.colors.black};

   @media (max-width: 480px) {
   margin-top: 10px;
       font-size: 16px;
       word-wrap: break-word;
       overflow: hidden;
       text-overflow: ellipsis;
       display: -webkit-box;
       -webkit-line-clamp: 1;
       -webkit-box-orient: vertical;
              width: 60px;
   }
 }
 
 .course-description {
  padding-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-family: "DM Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.textgray};
  margin-bottom: 20px;
}

 .course-description-list{
 display:none;
 }
 
 /* Info and Button Styling */
 .course-info {
   display: flex;
   justify-content: flex-start;
   padding-left: 8px;
  //  background-color: #f8f8f8;
   gap: 10px;
   margin-left: 10px;
 }
 .course-info-list{
 background-color:${({ theme }) => theme.colors.white};
 gap: 10px;
 padding-left: 10px;
 margin-left: 7px;

 @media (max-width: 480px) {
       display: flex;
   flex-direction: column;
   gap: 5px;
 }
 }
 .course-info-list span{
      font-family: "DM Sans";
 font-size: 14px;
 font-style: normal;
 font-weight: 400;
 line-height: 10px; 
 color:${({ theme }) => theme.colors.textgray};
 margin-right: 40px;

 @media (max-width: 480px) {
   margin-right: 10px;
   word-wrap: break-word;
       overflow: hidden;
       text-overflow: ellipsis;
       display: -webkit-box;
       -webkit-line-clamp: 1;
       -webkit-box-orient: vertical;
       width: 60px;
}
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
    //  margin-top: 10px;
     margin-bottom: 0;
   }
     .coursecard-bt-container-list{
     display: flex;
     justify-content: space-between;
     padding: 10px;
     margin-top: 10px;
     margin-bottom: 0;
     right: 0;
     margin-left: auto;
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

      @meadia (max-width: 480px) {
   width: 60px;
   height: 20px;
   font-size: 12px;
}
 }
 
 
 `;

 export const ProgressBarContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  padding: 18px;
`;

export const ProgressMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
`;

export const ProgressTrack = styled.div`
  background-color: #dcefe5;
  height: 10px;
  border-radius: 6px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  background-color: #4caf72;
  height: 100%;
  width: ${({ width }) => width}%;
  transition: width 0.3s ease;
`;

export const ProgressDetails = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
`;


