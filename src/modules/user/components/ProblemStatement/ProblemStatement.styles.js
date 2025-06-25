import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  margin-left: 40px;

  @media (max-width: 768px) {
    padding: 1rem;
    margin-left: 0px;
  }
`;

export const MainHeading = styled.h1`
  font-size: 26px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 1rem;

  @media (max-width: 1360px) {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;  

export const Section = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #F5F5F5;
  border-radius: 8px;
    color: #262524;
`;

export const Heading = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 0.5rem;

  @media (max-width: 1360px) {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin: 0;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const Card = styled.div`
  flex: 1;
  padding: 1rem 1rem;
  border-radius: 10px;
  border: 1px solid #2290AC;

  @media (max-width: 768px) {
    padding: 0.6rem;
  }
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.bluetext};
  margin: 0;

  @media (max-width: 1360px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const CardSubtitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #1A1C1E99; 
  margin: 10px 0 0 0;

  @media (max-width: 1360px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const SummaryContainer = styled.div`
  border-radius: 10px;
`;

export const SummarySection = styled.div`
    margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
    color: #262524;
`;

export const SummaryHeading = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  margin-top: 0;
  color: ${({ theme }) => theme.colors.bluetext};

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const SummaryText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #262524;
  line-height: 25px;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 22px;
  }
`;

export const SubHeading = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.bluetext};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const List = styled.ul`
  padding-left: 1.2rem;
  font-size: 18px;
  margin: 0;

  @media (max-width: 1360px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

export const Practisequsns = styled.h3`
  margin-bottom: 0.5rem;
`;

export const PSHeading = styled.h3`
  font-size: 20px;  
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.bluetext};

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 0;
  }

`;

export const PSQuestionsList = styled.ul`
  margin-top: 1rem;
  list-style-type: none;
  padding: 0;

  @media (max-width: 768px) {
    margin-top: 0;
  } 
`;

export const PSQuestionItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #1A1C1E99;
  font-size: 18px;
  font-weight: 600;
  color: #262524;
  line-height: 25px;
  display: flex;
  justify-content: space-between;

    .questions{
      margin: 0;
      margin-left: 1.6rem;
      padding: 5px;
    }

    .openicon{
    display: flex;
    align-items: center;
    justify-content: center;
      margin: 0;
      margin-right: 1.6rem;
      padding: 5px;
      color: #262524;
      font-size: 24px;

      @media (max-width: 1360px) {
        font-size: 20px;
      }

      @media (max-width: 768px) {
        font-size: 18px;
      }
    }

    @media (max-width: 1360px) {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }
`;
