import React, { useState, useEffect } from "react";
import {
  Container,
  StatCard,
  StatLabel,
  StatValue,
  Divider,
  Stats,
} from "./SupportQueryStats.styles";
import { getSupportQueryStats } from "../../../../../api/supportQueryApi";
import { ShimmerText, ShimmerTitle } from "react-shimmer-effects";
const SupportQueryStats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getSupportQueryStats();
        setStats(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  if (loading) {
    return <div style={{ textAlign: "center" }}>
      <ShimmerTitle>Loading...</ShimmerTitle>
    </div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
       {loading ? (
                <div className="loading-cards">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="loading-card">
                      <ShimmerTitle width="80%" height="20px" style={{ margin: "10px 0" }} />
                      <ShimmerText width="90%" height="15px" style={{ margin: "5px 0" }} />
                      {/* <ShimmerText width="80%" height="15px" style={{ margin: "5px 0" }} /> */}
                      {/* /<ShimmerButton width="60%" height="40px" style={{ marginTop: "10px" }} /> */}
                    </div>
                  ))}
                </div>
              ) : (
      <Stats>
        <div className="stats-container">
          <StatCard>
            <StatLabel>Total Queries</StatLabel>
            <StatValue>{stats.data.totalQueries}</StatValue>
          </StatCard>

          <Divider />

          <StatCard>
            <StatLabel>Open Queries</StatLabel>
            <StatValue>{stats.data.openQueries}</StatValue>
          </StatCard>
          
          <Divider />
          <StatCard>
            <StatLabel>Solved Queries</StatLabel>
            <StatValue>{stats.data.solvedQueries}</StatValue>
          </StatCard>
          <Divider />
          <StatCard>
            <StatLabel>Avg. Resolution Time</StatLabel>
            <StatValue>{stats.data.avgTimeToSolve}</StatValue>
          </StatCard>
        </div>
      </Stats>
      )}
    </Container>
  );
};

export default SupportQueryStats;
