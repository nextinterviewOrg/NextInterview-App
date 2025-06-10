import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  TabsWrapper,
  TabButton,
  ContentWrapper
} from './AllQuestionBank.styles';

const AllQuestionBank = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isQuestionsActive = location.pathname.includes('/question');
  const isCodingActive = location.pathname.includes('/mainQuestionBank/qb')|| (location.pathname.includes('/mainQuestionBank')&&(!location.pathname.includes('/question')));

  return (
    <Container>
      <TabsWrapper>
        {/* <TabButton
          active={isQuestionsActive}
          onClick={() => navigate('questionbank')}
        >
          Questions
        </TabButton>
        <TabButton
          active={isCodingActive}
          onClick={() => navigate('qbcodinglist')}
        >
          Coding
        </TabButton> */}
      </TabsWrapper>

      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </Container>
  );
};

export default AllQuestionBank;
