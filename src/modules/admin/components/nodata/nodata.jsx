/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import nodata from "../../../../assets/Lottie/5nvMVE1u7L.json"; 

const Container = styled.div`
  text-align: center;
  padding: 1rem;
`;
const Message = styled.p`
  color: #4b5563;
`;

const NoData = ({ message }) => {
  return (
    <Container>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
             <Lottie
            className="Lottie"
            animationData={nodata}
            loop={true}
            style={{
              // width: "100%", height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "50vh",      // full viewport height
              margin: 0,            // ensure no default margins
              padding: 0,
            }}
          /></div>

      <Message>{message || "No data available"}</Message>
    </Container>
  );
};

export default NoData;
