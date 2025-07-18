// StartModule.jsx
import React from 'react';
import {
  Container,
  Illustration,
  Title,
  StartButton
} from '../../components/NewUser/NewUser.style';
import newuser from "../../../../assets/newuser.jpg";
import { Link } from 'react-router-dom';
const NewUser = () => {
  return (
    <Container>
      <Illustration src={newuser} alt="Start Learning Illustration" 
    
      />
      <Title>Start your first Module</Title>
  <Link to="/user/learning">
      <StartButton>Start Module</StartButton>
      </Link>
    </Container>
  );
};

export default NewUser;
