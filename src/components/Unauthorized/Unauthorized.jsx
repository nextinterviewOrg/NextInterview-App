import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #ff4d4f;
  margin-bottom: 20px;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1em;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #40a9ff;
  }
`;

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <UnauthorizedContainer>
      <Title>Access Denied</Title>
      <Message>
        Sorry, you don't have permission to access this page.
      </Message>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Button onClick={handleGoBack}>Go Back</Button>
        <Button onClick={handleGoHome}>Go to Home</Button>
      </div>
    </UnauthorizedContainer>
  );
};

export default Unauthorized; 