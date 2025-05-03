import styled from "styled-components";

// Heading
export const Heading = styled.h2`
    font-size: 24px;
    margin-bottom: 30px;
    color: #333;

    @media (max-width: 768px) {
      font-size: 22px;
    }
    @media (max-width: 480px) {
      font-size: 20px;
    }
`;

// Form Container
export const FormContainer = styled.div`
  padding: 0px 30px;
  border-radius: 8px;
  width: 60%;
  box-sizing: border-box;
 
  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 0px 10px;
  }
`;

// Form and Fields
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Formitem = styled.div`
  display: grid;
grid-template-columns: 1fr 3fr;
  gap: 20px;`;

export const Label = styled.label`
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 18px;
  color: #555;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px;
  }
`;

// Button Group
export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
    justify-content: flex-end;
`;

export const Button = styled.button`
width: 100px;
padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: normal;
  font-size: 16px;



  background-color: ${({ variant }) =>
    variant === "submit" ? "#2290AC" : "#ccc"};
  color: ${({ variant }) =>
    variant === "submit" ? "#fff" : "#333"};

  &:hover {
    background-color: ${({ variant }) =>
      variant === "submit" ? "#1b748b" : "#bbb"};
  }
`;

