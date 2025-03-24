import { Container } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageContainer = styled(Container)`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: auto;
// margin-top: 50px;
height: 100vh;
width: 100%;
`;
const HeadingText = styled.h1`
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    `;

const Text = styled.p`
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    margin-top: 20px;
    `;

    const Button = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #68c184;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    `;
 
const NotFound = () => {
    return (
      <PageContainer>
        <HeadingText>
            404 Not Found
        </HeadingText>
        <Text>Page you are looking for does not exist.</Text>
        <Button>
            <Link to="/login" 
            style={{ textDecoration: "none", color: "white",  }}
            >Go to Home</Link>
        </Button>
       </PageContainer>
    );
}

export default NotFound;