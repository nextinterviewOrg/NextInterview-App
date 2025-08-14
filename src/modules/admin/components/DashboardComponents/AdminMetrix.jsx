import React from "react";
import styled from "styled-components";

const MetricsContainer = styled.div`
width: 80%;
margin: 60px 40px 70px 120px;
height: 40px;
// margin-top: 70px;
position: absolute;
z-index: 12;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.light};
  padding: ${(props) => props.theme.spacing(3)};
  border-radius: ${(props) => props.theme.spacing(1)};
  box-shadow: 0 4px 6px ${(props) => props.theme.colors.borderblue};

  @media (max-width: 768px) {
display:none;
}
@media (max-width: 1024px) {
margin: 60px 40px 70px 80px;
}
`;

const MetricCard = styled.div`
  text-align: left;
  flex: 1;
  padding: ${(props) => props.theme.spacing(2)};
  &:not(:last-child) {
    border-right: 1px solid ${(props) => props.theme.colors.backgray};
  }

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing(1)};
  }
`;

const MetricTitle = styled.div`
  /* font-family: ${(props) => props.theme.fonts.body}; */
  color: ${(props) => props.theme.colors.textgray};
  font-size: 0.9rem;
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const MetricValue = styled.div`
  /* font-family: ${(props) => props.theme.fonts.heading}; */
  color: ${(props) => props.theme.colors.black};
  font-size: 1.5rem;
  font-weight: bold;
`;

const AdminMetrics = () => {
  const metrics = [
    { title: "Total Users", value: "0" },
    { title: "Subscribed Users", value: "0" },
    { title: "Total Topics", value: "0" },
    { title: "Average Quiz score", value: "0%" },
    { title: "Avg. Feedback Rating", value: "Neutral" },
  ];

  return (
    <MetricsContainer>
      {metrics.map((metric, index) => (
        <MetricCard key={index}>
          <MetricTitle>{metric.title}</MetricTitle>
          <MetricValue>{metric.value}</MetricValue>
        </MetricCard>
      ))}
    </MetricsContainer>
  );
};

export default AdminMetrics;
