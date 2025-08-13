import styled from "styled-components";

export const QuizPerformanceWrapper = styled.div`
  .quizPerformanceContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #F5F5F5;
    padding: 1rem;
    max-width: 100%;
    /* font-family: "Helvetica", sans-serif; */

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }

  .radarChartArea {
    width: 200px;
    height: 200px;
    position: relative;
    padding: 0 1rem;

    @media (max-width: 480px) {
      margin-bottom: 1rem;
    }
  }

  .legendArea {
    margin-left: 1rem;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;

    @media (max-width: 480px) {
      margin-left: 0;
    }
  }

  .legendDot-one {
    color: ${(props) => props.theme.colors.black};
  }

  .legendDot-two {
    color: ${(props) => props.theme.colors.textgray};
  }

  .legendArea ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 480px) {
      align-items: center;
    }
  }

  .legendArea li {
    margin-bottom: 0.3rem;
  }
`;
