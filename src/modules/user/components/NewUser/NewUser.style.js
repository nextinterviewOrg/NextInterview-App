// style.js
import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 40px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

export const Illustration = styled.img`
  width: 100%;
  margin: 0 auto 20px auto;
  display: block;
`;

export const Message = styled.p`
  color: #999;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
`;

export const StartButton = styled.button`
  background-color: #007b8f;
  color: #fff;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #005f6b;
  }
`;
