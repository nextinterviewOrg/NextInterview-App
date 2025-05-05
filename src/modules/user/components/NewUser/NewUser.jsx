// StartModule.jsx
import React from 'react';
import {
  Container,
  Illustration,
  Message,
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
      <Message>You haven’t started learning yet</Message>
      <Title>Start your first Module</Title>
  <Link to="/user/learning">
      <StartButton>Start Module</StartButton>
      </Link>
    </Container>
  );
};

export default NewUser;
