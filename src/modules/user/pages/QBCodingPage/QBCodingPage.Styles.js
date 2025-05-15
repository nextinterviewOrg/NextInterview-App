import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  margin-left: 40px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    width: 100%;
}
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1000;
  }
 
  .modal-input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    resize: none;
    box-sizing: border-box;
  }
 
  .modal-button {
    padding: 10px 20px;
    background-color: #2290ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
 
  .modal-cancel-button {
    padding: 10px 20px;
    background: none;
    color: #2290ac;
    border: 1px solid #2290ac;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
 
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 28px;
    cursor: pointer;
  }
 
  .button-group{
    display: flex;
    gap: 10px;
    margin-top: 10px;
    justify-content: flex-end;
    width: 100%;
  }
 
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
`;

export const QuestionBox = styled.div`
  background-color: ${({ theme }) => theme.colors.lightgreen};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 16px;
  line-height: 1.6;
  color: #444;
  width: 40%!important;
`;

export const BackIcon = styled.div`
  top: 20px;
  left: 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  font-size: 16px;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;
