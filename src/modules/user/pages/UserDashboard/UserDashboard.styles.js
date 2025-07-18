import styled from "styled-components";

export const UserDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 20px;

  @media (max-width: 1024px) {
    margin-left: 0;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }

  .UserDashboard-statsContainer {
    position: relative;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;

    @media (max-width: 1024px) {
      margin-left: 0;
    }

    @media (max-width: 768px) {
      margin-left: 0;
    }
  }
  
 .UserDashboard-statsContainer-row-one {
  position: absolute;
  width: 100%;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.secondary} -96.67%,
    ${({ theme }) => theme.colors.primary} 182.78%
  );
  height: 90px;


  @media (max-width: 1100px) {
    position: relative;
    height: auto;
    padding-bottom: 80px; /* Add space for the stats container */
    // margin-left:60px;
  }
    @media (max-width: 1024px) {
      margin-left: 20px;
    }

  @media (max-width: 768px) {
    padding-bottom: 60px;
  }
}
  .UserDashboard-statsContainer-img {
    position: absolute;
    right: 0;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
  .UserDashboard-stats {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  top: 25px;
  margin-left: 30px;
  margin-right: 60px;
  background: ${({ theme }) => theme.colors.light};
  border-radius: 8px;
  padding: 12px 24px;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 1100px) {
    position: absolute;
    top: 20px; /* Adjust this value as needed */
    // left: 10px;
    // right: 20px;
    // margin: 0;
  }

  @media (max-width: 76px) {
    position: relative;
    top: 30px;
    margin: 0 6px;
    // margin-left: 40px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    width: calc(100% - 40px);
    padding: 16px !important;
  }
}
  .UserDashboard-statsbox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.light};
    box-shadow: 0px 4px 12px rgba(112, 144, 176, 0.1);
    flex: 1;
    min-width: 150px;
    // cursor: pointer;
    // transition: all 0.3s ease;

    // &:hover {
    //   transform: translateY(-2px);
    //   box-shadow: 0px 6px 16px rgba(112, 144, 176, 0.15);
    // }

    @media (max-width: 768px) {
      // min-width: auto;
      padding: 5px;
      width: 100%;
    }

    @media (max-width: 1024px) {
      margin-left: 40px;

   
      
    }
       @media (max-width: 1024px) {
    &:nth-child(5) { // 5th child is the Challenges completed card
      display: none;
    }
  }

    &.more-button {
      display: flex;
      // align-items: center;
      // justify-content: center;
      // background: ${({ theme }) => theme.colors.primary}20;
      // border: 1px dashed ${({ theme }) => theme.colors.primary};

      &:hover {
        background: ${({ theme }) => theme.colors.primary}30;
      }

      @media (max-width:1024px)
      {
      display: none;}

      .UserDashboard-statsbox-value {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
  
  .UserDashboard-statsbox-title {
    font-family: "DM Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textgray};
    margin-bottom: 8px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  
  .UserDashboard-statsbox-value {
    font-family: "DM Sans";
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    margin: 0 !important;
    color: ${({ theme }) => theme.colors.black};

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }
  
  .UserDashboard-statsbox-value span {
    font-size: 20px;
  }
  
  /* Rest of your existing styles remain the same */
 .UserDashboard-statsContainer-row-two {
  width: 100%;
  margin-top: 100px;
  
  @media (max-width: 1100px) {
    margin-top: 70px; /* Increase this if there's still overlap */
  }
  
  @media (max-width: 768px) {
    margin-top: 60px;
  }
}
  
  .UserDashboard-Charts-container {
    padding: 24px;
    
    @media (max-width: 768px) {
      padding: 16px;

    }
      @media (max-width: 1024px) {
      margin-left: 20px;
    }
  }
  
  .UserDashboard-charts-title {
    font-family: "DM Sans";
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.black};
    
    @media (max-width: 768px) {
      font-size: 20px;
    }
      @media (max-width: 1024px) {
      margin-left: 20px;
    }
  }
  
  .UserDashboard-charts {
    position: relative;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    gap: 90px;
    
    @media (max-width: 1024px) {
      flex-direction: column;
      gap: 40px;
    }
  }

  /* ContinueLearning.css */
.container-dashboard {
  width: 100%;
  margin-top: 150px;
  
  @media (max-width: 1100px) {
    margin-top: 200px; /* Adjust this value as needed */
  }

  @media (max-width: 868px) {
  margin-top: 250px;
  }
  
  @media (max-width: 768px) {
    margin-top: 150px;
  }

  @media (max-width: 576px) {
    margin-top: 350px;
  }
}

  .header-dashboard {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
    padding: 0 20px;
    font-family: "DM Sans";
    display: flex;
    align-items: flex-start;
    text-align: left;

    @media (max-width: 860px) {
      margin-left: 40px;
    }
  }
    
    @media (max-width: 768px) {
      font-size: 20px;
      // padding: 0 16px;
    }
  }

  .carousel-wrapper {
    display: flex;
    align-items: center;
  }

  .card-container-dashboard {
    display: flex;
    justify-content: flex-start;
    gap: 30px;
    width: auto;
    padding: 0 20px;
    overflow-x: auto;
    scroll-behavior: smooth;
    
    @media (max-width: 768px) {
      gap: 16px;
      padding: 0 16px;
      // width: 100%;
    }
  }

  .continue-Learning-Header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-left: 60px;
    @media (max-width: 768px) {
      padding: 0 16px;
    }
      @media (max-width: 1024) {
      margin-left: 60px;
    }
  }

  .card-dashboard {
    background: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 320px;
    min-width: 280px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: translateY(-5px);
      background-color: #f0fff0;
    }
    
    @media (max-width: 768px) {
      width: 260px;
      min-width: 240px;
    }
  }

  .card-dashboard img {
    width: 100%;
    height: 150px;
    border-radius: 8px;
    margin-bottom: 10px;
    
    @media (max-width: 768px) {
      height: 120px;
    }
  }

  .progress {
    margin-top: 10px;
    text-align: center;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    margin: 5px 0;
  }

  .progress-fill {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.3s ease-in-out;
  }

  .arrow-button {
    background-color: white;
    border: 1px solid #f5f5f5;
    color: #68c184;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
    font-size: 16px;
    margin: 0 5px;
  }

  .arrow-button:disabled {
    color: #68c1844d;
    cursor: not-allowed;
  }
`;