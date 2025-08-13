import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import styled, { useTheme } from "styled-components";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// Styled components
const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
  margin-top: ${(props) => props.theme.spacing(4)};
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1px;
    margin-top: 0px;
  }
`;

const Title = styled.h2`
  /* font-family: ${(props) => props.theme.fonts.heading}; */
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing(3)};
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
    margin: 0;
  }
`;

const CardContainer = styled.div`
  background-color: ${(props) => props.theme.colors.light};
  border-radius: ${(props) => props.theme.spacing(1)};
  box-shadow: 0 4px 4px ${(props) => props.theme.colors.borderblue};
  width: 100%;
  padding: ${(props) => props.theme.spacing(2)};
  box-sizing: border-box;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  box-sizing: border-box;
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const UserActivity = () => {
  const theme = useTheme();
 const [legendPosition, setLegendPosition] = useState(
   window.innerWidth <= 480 ? "bottom" : "right"
 );

  // Update legend position on window resize
  useEffect(() => {
    const handleResize = () => {
      setLegendPosition(window.innerWidth <= 480 ? "bottom" : "right");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Users Growth",
        data: [1000, 5000, 10000, 30000, 80000, 70000, 90000, 85000, 60000, 70000, 80000, 90000],
        borderColor: theme.colors.primary,
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: theme.colors.primary,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: legendPosition,
        labels: {
          font: {
            family: theme.fonts.body,
          },
          color: theme.colors.textgray,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: theme.colors.primary,
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme.colors.textgray,
          font: {
            family: theme.fonts.body,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: theme.colors.textgray,
          font: {
            family: theme.fonts.body,
          },
        },
      },
    },
  };

  return (
    <Wrapper>
      <Title>User Activity Trends</Title>
      <CardContainer>
        <ChartWrapper>
          <Line data={data} options={options} />
        </ChartWrapper>
      </CardContainer>
    </Wrapper>
  );
};

export default UserActivity;
